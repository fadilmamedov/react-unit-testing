import { TrashIcon } from '@heroicons/react/solid';
import cls from 'classnames';
import React from 'react';

interface TodoItemProps {
  text: string;
  completed?: boolean;
  onComplete: () => void;
  onUncomplete: () => void;
  onRemove: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  text,
  completed = false,
  onComplete,
  onUncomplete,
  onRemove,
}) => {
  const handleCheckboxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onComplete();
    } else {
      onUncomplete();
    }
  };

  return (
    <div
      className={cls(
        'group flex items-center gap-3 py-3 px-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100',
        {
          'line-through': completed,
        }
      )}
    >
      <input
        checked={completed}
        onChange={handleCheckboxValueChange}
        type="checkbox"
        className="w-5 h-5 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />

      {text}

      <button
        className="opacity-0 ml-auto p-2 bg-transparent rounded-md text-gray-500 hover:bg-gray-200 active:text-gray-800 active:bg-gray-200 focus:bg-gray-200 focus:outline-none group-hover:opacity-100"
        onClick={onRemove}
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
