import { User } from 'types/user';

import { API_HOST } from './constants';

export const fetchUser = async () => {
  const response = await fetch(`${API_HOST}/user`);
  const data = await response.json();
  return data as User;
};
