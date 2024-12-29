import React from 'react';

interface PlayerBadgeProps {
  name: string;
}

export function PlayerBadge({ name }: PlayerBadgeProps) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 sm:w-auto w-fit mx-auto">
      {name}
    </span>
  );
}