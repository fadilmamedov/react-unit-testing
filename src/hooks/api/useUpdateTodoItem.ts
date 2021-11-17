import { updateTodo } from 'api/todos';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { searchStringState } from 'state/todos';
import { TodoItem } from 'types/todo';

type Context = {
  previousTodoItems: TodoItem[];
};

export const useUpdateTodoItem = () => {
  const todosSearchString = useRecoilValue(searchStringState);
  const queryClient = useQueryClient();

  return useMutation(updateTodo, {
    onMutate: async (todoItem) => {
      await queryClient.cancelQueries('todos');

      const previousTodoItems = queryClient.getQueryData('todos');

      // TODO: Check result on failure
      queryClient.setQueryData(
        ['todos', todosSearchString],
        (currentTodoItems: TodoItem[] = []) => {
          const index = currentTodoItems.findIndex((f) => f.id === todoItem.id);

          currentTodoItems.splice(index, 1, todoItem);
          return currentTodoItems;
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
