import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface ListboxProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
  error?: string;
}

export function Listbox({ label, value, onChange, options, disabled, error }: ListboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`relative w-full bg-white dark:bg-gray-800 border rounded-md pl-3 pr-10 py-2 text-left cursor-default
            ${disabled 
              ? 'bg-gray-100 dark:bg-gray-900 cursor-not-allowed' 
              : 'hover:border-gray-400 dark:hover:border-gray-500'
            }
            ${error 
              ? 'border-red-300 dark:border-red-700' 
              : 'border-gray-300 dark:border-gray-600'
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          disabled={disabled}
        >
          <span className={`block truncate ${
            !selectedOption?.label ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'
          }`}>
            {selectedOption?.label || 'Select an option...'}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className={`h-4 w-4 ${disabled ? 'text-gray-400' : 'text-gray-500'}`} />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-base">
            {options.map((option) => (
              <div
                key={option.value}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 
                  ${option.value === value 
                    ? 'text-blue-900 dark:text-blue-200 bg-blue-100 dark:bg-blue-900/30' 
                    : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <span className="block truncate">
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}