import React from 'react';
import type { IndividualMatch } from '../../../types/league';

interface MatchDetailsProps {
  matches: IndividualMatch[];
}

export function MatchDetails({ matches }: MatchDetailsProps) {
  return (
    <tr>
      <td colSpan={4} className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4">
        <div className="space-y-3">
          {matches.map((match, index) => (
            <div 
              key={match.id} 
              className="grid grid-cols-[1fr,auto,1fr] gap-4 text-sm items-center"
            >
              <div className="flex items-center justify-end space-x-2">
                <span className="text-gray-500 dark:text-gray-400 mr-2">{index + 1}.</span>
                <span className="text-gray-900 dark:text-gray-100">{match.homePlayer.name}</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs">({match.homePlayer.id})</span>
              </div>
              <div className="font-medium text-gray-900 dark:text-gray-100 text-center min-w-[60px]">
                {match.gamesWon} - {match.gamesLost}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 dark:text-gray-100">{match.awayPlayer.name}</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs">({match.awayPlayer.id})</span>
              </div>
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
}