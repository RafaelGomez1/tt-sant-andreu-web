import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export function Select({ label, options, error, className = '', ...props }: SelectProps) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          className={`block w-full pl-3 pr-10 py-2 text-base border rounded-md appearance-none 
            bg-white dark:bg-gray-800 
            border-gray-300 dark:border-gray-600 
            text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            disabled:bg-gray-100 dark:disabled:bg-gray-900 
            disabled:cursor-not-allowed
            ${error ? 'border-red-300 dark:border-red-700' : ''}
            ${className}`}
          {...props}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value} className="py-1">
              {label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}