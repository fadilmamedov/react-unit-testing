import { updateTodo } from 'api/todos';
import { useMutation, useQueryClient } from 'react-query';
import { TodoItem } from 'types/todo';

import { useTodosQuery } from './useTodosQuery';

type Context = {
  previousTodoItems: TodoItem[];
};

export const useUpdateTodoItem = () => {
  const { baseQuery, searchQuery } = useTodosQuery();
  const queryClient = useQueryClient();

  return useMutation(updateTodo, {
    onMutate: async (todoItem) => {
      await queryClient.cancelQueries(baseQuery);

      const previousTodoItems = queryClient.getQueryData(searchQuery);

      // TODO: don't mutate query data (use immer)
      queryClient.setQueryData(searchQuery, (currentTodoItems: TodoItem[] = []) => {
        const index = currentTodoItems.findIndex((f) => f.id === todoItem.id);

        currentTodoItems.splice(index, 1, todoItem);
        return currentTodoItems;
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
