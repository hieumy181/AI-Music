import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-gray-900',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        (variant === 'primary' && 'bg-green-500 hover:bg-green-600 text-black'),
        (variant === 'secondary' && 'bg-gray-700 hover:bg-gray-600 text-white'),
        (variant === 'ghost' && 'hover:bg-gray-800 text-gray-300'),
        (variant === 'danger' && 'bg-red-500 hover:bg-red-600 text-white'),
        (size === 'sm' && 'px-3 py-1.5 text-sm'),
        (size === 'md' && 'px-4 py-2 text-base'),
        (size === 'lg' && 'px-6 py-3 text-lg'),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};