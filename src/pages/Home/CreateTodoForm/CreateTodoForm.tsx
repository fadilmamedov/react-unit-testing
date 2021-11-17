import { PlusIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';

interface CreateTodoFormProps {
  onCreate: (text: string) => void;
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onCreate }) => {
  const [text, setText] = useState('');

  const handleAddTaskFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate(text);
    setText('');
  };

  return (
    <form onSubmit={handleAddTaskFormSubmit} className="flex relative">
      <PlusIcon className="absolute w-5 h-5 top-1/2 left-2 -translate-y-1/2 text-gray-600" />

      <input
        autoFocus
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a Task"
        className="appearance-none block w-full pr-3 pl-8 py-2 border border-gray-300 rounded-md shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </form>
  );
};
