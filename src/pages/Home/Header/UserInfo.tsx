import cls from 'classnames';
import React from 'react';
import { getNameInitials } from 'utils/getNameInitials';

interface UserInfoProps {
  fullName?: string;
  avatarURL?: string;
  className?: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ fullName, avatarURL, className }) => {
  return (
    <div className={cls('flex items-center gap-3', className)}>
      <div
        className={cls(
          'flex justify-center items-center w-8 h-8 rounded-full text-xs text-white font-medium overflow-hidden shadow-sm',
          {
            'bg-blue-500': !avatarURL,
          }
        )}
      >
        {avatarURL ? (
          <img src={avatarURL} alt={fullName} className="w-full h-full" />
        ) : (
          getNameInitials(fullName ?? 'Anonymous')
        )}
      </div>

      <span className="text-sm text-gray-700 font-medium select-none">
        {fullName ?? 'Anonymous'}
      </span>
    </div>
  );
};
