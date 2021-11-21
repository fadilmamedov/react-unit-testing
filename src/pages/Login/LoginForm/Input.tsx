import React from 'react';

interface InputProps {
  id: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>

    <div className="mt-1">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
      />
    </div>
  </div>
);
