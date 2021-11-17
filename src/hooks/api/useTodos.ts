import { fetchTodos } from 'api/todos';
import { useQuery } from 'react-query';

export const useTodos = (query?: string) => {
  const { isLoading, data: todos } = useQuery(['todos', query], () => fetchTodos(query));
  return { isLoading, todos };
};
