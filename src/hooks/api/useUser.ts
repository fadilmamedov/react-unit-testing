import { fetchUser } from 'api/user';
import { useQuery } from 'react-query';

export const useUser = () => {
  const { isLoading, data: user } = useQuery('user', fetchUser);
  return { isLoading, user };
};
