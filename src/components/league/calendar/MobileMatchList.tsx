import React from 'react';
import type { Match } from '../../../services/api/types';
import { TeamName } from './TeamName';
import { MatchScore } from './MatchScore';
import { getMatchRowColor } from '../../../utils/matchUtils';

interface MobileMatchListProps {
  matches: Match[];
  clubName: string;
}

export function MobileMatchList({ matches, clubName }: MobileMatchListProps) {
  return (
    <div className="block sm:hidden divide-y divide-gray-200 dark:divide-gray-700">
      {matches.map((match, index) => (
        <div 
          key={`${match.id}-${index}`}
          className={`p-4 ${getMatchRowColor(match)}`}
        >
          <div className="text-sm font-medium text-gray-900 dark:text-white text-center mb-2">
            {match.dateTime}
          </div>
          <div className="grid grid-cols-3 items-center gap-2">
            <TeamName name={match.homeGame ? clubName : match.visitorClub} />
            <MatchScore match={match} />
            <TeamName name={match.homeGame ? match.visitorClub : clubName} />
          </div>
        </div>
      ))}
    </div>
  );
}