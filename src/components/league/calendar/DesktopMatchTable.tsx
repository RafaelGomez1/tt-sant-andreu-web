import React from 'react';
import type { Match } from '../../../services/api/types';
import { TeamName } from './TeamName';
import { MatchScore } from './MatchScore';
import { getMatchRowColor } from '../../../utils/matchUtils';

interface DesktopMatchTableProps {
  matches: Match[];
  clubName: string;
}

export function DesktopMatchTable({ matches, clubName }: DesktopMatchTableProps) {
  return (
    <table className="hidden sm:table min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">
            Fecha
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">
            Local
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">
            Resultado
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">
            Visitante
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        {matches.map((match, index) => (
          <tr 
            key={`${match.id}-${index}`}
            className={getMatchRowColor(match)}
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-center">
              {match.dateTime}
            </td>
            <td className="px-6 py-4">
              <TeamName name={match.homeGame ? clubName : match.visitorClub} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <MatchScore match={match} />
            </td>
            <td className="px-6 py-4">
              <TeamName name={match.homeGame ? match.visitorClub : clubName} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}