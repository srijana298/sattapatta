import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  color?: 'orange' | 'pink' | 'blue' | 'green' | 'light';
};

export const Button: React.FC<ButtonProps> = ({ label, onClick, color = 'orange' }) => {
  const baseColor: Record<string, string> = {
    orange: 'bg-orange-400 hover:bg-orange-500',
    pink: 'bg-pink-400 hover:bg-pink-500',
    blue: 'bg-blue-400 hover:bg-blue-500',
    green: 'bg-green-400 hover:bg-green-500',
    light: 'bg-gray-50 hover:bg-gray-100'
  };

  return (
    <button
      className={clsx(
        baseColor[color],
        'text-black font-semibold py-2 px-3 rounded-lg border border-black transition-colors w-full'
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
