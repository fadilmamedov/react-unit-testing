import { useRecoilValue } from 'recoil';
import { searchStringState } from 'state/todos';

export const useTodosQuery = () => {
  const todosSearchString = useRecoilValue(searchStringState);

  const baseQuery = 'todos';
  const searchQuery = ['todos', todosSearchString];

  return { baseQuery, searchQuery };
};
