import { LogoutIcon } from '@heroicons/react/solid';
import cls from 'classnames';
import React from 'react';

interface LogoutButtonProps {
  className?: string;
  onClick?: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ className, onClick }) => {
  return (
    <button
      data-testid="logoutButton"
      className={cls(
        'p-2 bg-white rounded-md text-gray-500 hover:bg-gray-100 active:text-gray-800 active:bg-gray-200 focus:bg-gray-200 focus:outline-none',
        className
      )}
      onClick={onClick}
    >
      <LogoutIcon className="w-5 h-5" />
    </button>
  );
};
