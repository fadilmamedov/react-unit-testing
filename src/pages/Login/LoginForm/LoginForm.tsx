import React, { useState } from 'react';

import { Input } from './Input';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) return;

    onSubmit(email, password);
  };

  return (
    <form className="space-y-6" onSubmit={handleFormSubmit}>
      <Input
        id="email"
        name="email"
        type="email"
        label="Email address"
        value={email}
        onChange={setEmail}
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        value={password}
        onChange={setPassword}
      />

      <button
        type="submit"
        className="w-full py-3 border-transparent rounded-md bg-blue-600 shadow-sm text-white text-sm font-medium hover:bg-blue-700 focus:outline-none"
      >
        Sign in
      </button>
    </form>
  );
};
