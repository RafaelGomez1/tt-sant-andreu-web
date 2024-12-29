import React from 'react';

interface TeamNameProps {
  name: string;
}

export function TeamName({ name }: TeamNameProps) {
  return (
    <div className="text-sm text-gray-900 dark:text-gray-100 text-center leading-tight">
      {name.split(' ').map((word, i, arr) => (
        <React.Fragment key={i}>
          {word}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
}