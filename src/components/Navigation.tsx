import React from 'react';

export type View = 'bookings' | 'competition' | 'admin';

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-start">
          <div className="flex">
            <button
              onClick={() => onViewChange('bookings')}
              className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                currentView === 'bookings'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Reservar
            </button>
            <button
              onClick={() => onViewChange('competition')}
              className={`ml-8 inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                currentView === 'competition'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Competición
            </button>
            <button
              onClick={() => onViewChange('admin')}
              className={`ml-8 inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                currentView === 'admin'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Directiva
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}