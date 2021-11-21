import { removeTodo } from 'api/todos';
import { useMutation, useQueryClient } from 'react-query';
import { TodoItem } from 'types/todo';

import { useTodosQuery } from './useTodosQuery';

type Context = {
  previousTodoItems: TodoItem[];
};

export const useRemoveTodoItem = () => {
  const { baseQuery, searchQuery } = useTodosQuery();
  const queryClient = useQueryClient();

  return useMutation(removeTodo, {
    onMutate: async (todoItem) => {
      await queryClient.cancelQueries(baseQuery);

      const previousTodoItems = queryClient.getQueryData(searchQuery);

      queryClient.setQueryData(searchQuery, (currentTodoItems: TodoItem[] = []) => {
        return currentTodoItems.filter((t) => t.id !== todoItem.id);
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
