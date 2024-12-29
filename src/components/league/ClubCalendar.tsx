import React from 'react';
import type { Match } from '../../services/api/types';
import { MobileMatchList } from './calendar/MobileMatchList';
import { DesktopMatchTable } from './calendar/DesktopMatchTable';

interface ClubCalendarProps {
  matches: Match[];
  clubName: string;
}

export function ClubCalendar({ matches, clubName }: ClubCalendarProps) {
  if (!matches.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mt-6">
      <div className="px-4 py-5 sm:px-6 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Calendario y resultados
        </h3>
      </div>
      <div className="overflow-x-auto">
        <MobileMatchList matches={matches} clubName={clubName} />
        <DesktopMatchTable matches={matches} clubName={clubName} />
      </div>
    </div>
  );
}