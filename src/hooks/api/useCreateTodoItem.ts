import { createTodo } from 'api/todos';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { searchStringState } from 'state/todos';
import { TodoItem } from 'types/todo';

type Context = {
  previousTodoItems: TodoItem[];
};

export const useCreateTodoItem = () => {
  const todosSearchString = useRecoilValue(searchStringState);
  const queryClient = useQueryClient();

  return useMutation(createTodo, {
    onMutate: async (todoItem) => {
      await queryClient.cancelQueries('todos');

      const previousTodoItems = queryClient.getQueryData('todos');

      queryClient.setQueryData(
        ['todos', todosSearchString],
        (currentTodoItems: TodoItem[] = []) => {
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

          currentTodoItems.splice(index, 0, todoItemWithID);

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
