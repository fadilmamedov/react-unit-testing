import { removeTodo } from 'api/todos';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { searchStringState } from 'state/todos';
import { TodoItem } from 'types/todo';

type Context = {
  previousTodoItems: TodoItem[];
};

export const useRemoveTodoItem = () => {
  const todosSearchString = useRecoilValue(searchStringState);
  const queryClient = useQueryClient();

  return useMutation(removeTodo, {
    onMutate: async (todoItem) => {
      await queryClient.cancelQueries('todos');

      const previousTodoItems = queryClient.getQueryData('todos');

      queryClient.setQueryData(
        ['todos', todosSearchString],
        (currentTodoItems: TodoItem[] = []) => {
          return currentTodoItems.filter((t) => t.id !== todoItem.id);
        }
      );

      return { previousTodoItems } as Context;
    },
    onError: (_, __, context) => {
      queryClient.setQueryData('todos', (context as Context).previousTodoItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries('todos');
    },
  });
};
