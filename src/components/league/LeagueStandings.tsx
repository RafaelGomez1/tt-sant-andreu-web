import React from 'react';
import type { LeagueStanding } from '../../services/api/types';
import type { LeagueId } from '../../data/leagues';

interface LeagueStandingsProps {
  standings: LeagueStanding[];
  selectedLeague: LeagueId;
}

export function LeagueStandings({ standings, selectedLeague }: LeagueStandingsProps) {
  if (!standings.length) return null;

  const getRowColor = (position: number): string => {
    if (selectedLeague === '4a') {
      return position <= 2 ? 'bg-green-100 dark:bg-green-900/30' : '';
    }

    if (position <= 2) return 'bg-green-100 dark:bg-green-900/30';
    if (position <= 6) return 'bg-blue-100 dark:bg-blue-900/30';
    if (position <= 10) return 'bg-orange-100 dark:bg-orange-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  const renderLegend = () => {
    if (selectedLeague === '4a') {
      return (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded mr-2"></div>
              <span className="text-gray-600 dark:text-gray-300">Promoción</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600">
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded mr-2"></div>
            <span className="text-gray-600 dark:text-gray-300">Promoción</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded mr-2"></div>
            <span className="text-gray-600 dark:text-gray-300">Playoff Promoción</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded mr-2"></div>
            <span className="text-gray-600 dark:text-gray-300">Playoff Descenso</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded mr-2"></div>
            <span className="text-gray-600 dark:text-gray-300">Descenso</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Clasificación</h3>
      </div>
      <div className="overflow-x-auto">
        {/* Mobile view */}
        <table className="sm:hidden min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pos</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Equipo</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">EJ</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">PTS</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {standings.map((standing) => (
              <tr key={standing.id} className={getRowColor(standing.standing)}>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-center">{standing.standing}</td>
                <td className="px-3 py-4 whitespace-normal text-sm font-medium text-gray-900 dark:text-gray-100 text-center">{standing.club}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">{standing.gamesPlayed}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 text-center">{standing.points}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Desktop view */}
        <table className="hidden sm:table min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pos</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Equipo</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">EJ</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">EG</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">EP</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">PG</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">PP</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">PTS</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {standings.map((standing) => (
              <tr key={standing.id} className={getRowColor(standing.standing)}>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-center">{standing.standing}</td>
                <td className="px-3 py-4 whitespace-normal text-sm font-medium text-gray-900 dark:text-gray-100 text-center">{standing.club}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">{standing.gamesPlayed}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">{standing.gamesWon}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">{standing.gamesLost}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">{standing.setsWon}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">{standing.setsLost}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 text-center">{standing.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {renderLegend()}
    </div>
  );
}