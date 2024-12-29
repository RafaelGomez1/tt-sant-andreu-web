import React from 'react';
import type { Match } from '../../../services/api/types';

interface MatchScoreProps {
  match: Match;
}

export function MatchScore({ match }: MatchScoreProps) {
  const getScore = () => {
    if (match.result.name === 'NOT_PLAYED') return '-';
    return match.homeGame 
      ? `${match.result.gamesWon} - ${match.result.gamesLost}`
      : `${match.result.gamesLost} - ${match.result.gamesWon}`;
  };

  return (
    <div className="text-sm font-bold text-gray-900 dark:text-gray-100 text-center">
      {getScore()}
    </div>
  );
}