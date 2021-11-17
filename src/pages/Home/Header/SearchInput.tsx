import { SearchIcon, XIcon } from '@heroicons/react/solid';
import cls from 'classnames';
import React, { useRef } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, className }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearButtonClick = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div
      className={cls('flex items-center h-10 text-gray-400 focus-within:text-gray-800', className)}
    >
      <SearchIcon className="flex-shrink-0 w-5 h-5" />

      <input
        ref={inputRef}
        value={value}
        placeholder="Search todos"
        className="w-full ml-3 text-sm text-gray-900 focus:outline-none"
        onChange={(event) => onChange(event.target.value)}
      />

      {value.length > 0 && (
        <button
          className="p-1 rounded-md hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200 focus:outline-none"
          onClick={handleClearButtonClick}
        >
          <XIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
