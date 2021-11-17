import { API_HOST } from './constants';

interface LoginQuery {
  email: string;
  password: string;
}
export const login = async ({ email, password }: LoginQuery) => {
  const response = await fetch(`${API_HOST}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return response.status === 200;
};
