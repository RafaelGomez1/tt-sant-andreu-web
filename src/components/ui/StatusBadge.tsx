import React from 'react';

interface StatusBadgeProps {
  status: 'completed' | 'full' | 'available';
}

const statusConfig = {
  completed: {
    text: 'Lleno',
    className: 'bg-red-100 text-red-800',
  },
  full: {
    text: 'Lleno',
    className: 'bg-red-100 text-red-800',
  },
  available: {
    text: 'Disponible',
    className: 'bg-green-100 text-green-800',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.text}
    </span>
  );
}