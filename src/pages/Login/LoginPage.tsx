import { useLogin } from 'hooks/api/useLogin';
import { useHistory } from 'react-router-dom';

import { LoginForm } from './LoginForm';

export const LoginPage = () => {
  const history = useHistory();

  const { mutate: login } = useLogin({
    onSuccess: (isSuccess) => {
      if (isSuccess) {
        history.push('/');
      }
    },
  });

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div>
        <h2 className="mb-5 text-center text-3xl font-bold text-gray-900">
          Sign-in to your account
        </h2>

        <div className="w-[500px] p-8 rounded-lg bg-white shadow">
          <LoginForm
            onSubmit={(email, password) => {
              login({ email, password });
            }}
          />
        </div>
      </div>
    </div>
  );
};
