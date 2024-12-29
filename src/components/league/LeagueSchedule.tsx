import React from 'react';
import { Match } from '../../types/league';

interface LeagueScheduleProps {
  matches: Match[];
}

export function LeagueSchedule({ matches }: LeagueScheduleProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">League Schedule</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Home</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Away</th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Match #</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {matches.map((match) => (
              <tr key={match.id}>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{match.date}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{match.time}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{match.homeTeam}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {match.score ? `${match.score.home} - ${match.score.away}` : '-'}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{match.awayTeam}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{match.matchNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}