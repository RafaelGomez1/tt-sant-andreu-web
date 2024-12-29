import React from 'react';
import { LeagueStats } from './league/LeagueStats';

export function CompetitionView() {
  return (
    <div className="space-y-8">
      <LeagueStats />
    </div>
  );
}