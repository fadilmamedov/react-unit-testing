import { createTodo } from 'api/todos';
import { useMutation, useQueryClient } from 'react-query';
import { TodoItem } from 'types/todo';

import { useTodosQuery } from './useTodosQuery';

type Context = {
  previousTodoItems: TodoItem[];
};

export const useCreateTodoItem = () => {
  const { baseQuery, searchQuery } = useTodosQuery();
  const queryClient = useQueryClient();

  return useMutation(createTodo, {
    onMutate: async (todoItem) => {
      await queryClient.cancelQueries(baseQuery);

      const previousTodoItems = queryClient.getQueryData(searchQuery);

      queryClient.setQueryData(searchQuery, (currentTodoItems: TodoItem[] = []) => {
        const minID = Math.min(...currentTodoItems.map((todoItem) => todoItem.id));
        const todoItemWithID: TodoItem = {
          ...todoItem,
          id: minID - 1,
        };

        let index = 0;
        const lastIndexForDate = currentTodoItems
          .map(({ date }) => date)
          .lastIndexOf(todoItem.date);

        if (lastIndexForDate >= 0) {
          index = lastIndexForDate + 1;
        }

        const newTodoItems = [...currentTodoItems];
        newTodoItems.splice(index, 0, todoItemWithID);
        return newTodoItems;
      });

      return { previousTodoItems } as Context;
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(searchQuery, (context as Context).previousTodoItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries(baseQuery);
    },
  });
};
