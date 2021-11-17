import { login } from 'api/auth';
import { useMutation } from 'react-query';

interface LoginOptions {
  onSuccess: (result: boolean) => void;
}
export const useLogin = (options: LoginOptions) => {
  return useMutation(login, {
    onSuccess: options.onSuccess,
  });
};
