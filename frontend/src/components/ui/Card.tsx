import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hover = false }) => {
  return (
    <div
      className={cn(
        'bg-gray-800 rounded-lg p-4 border border-gray-700',
        hover && 'hover:bg-gray-750 transition-colors duration-200 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};