import React from 'react';
import { Listbox } from '../ui/Listbox';
import { LEAGUES, type LeagueId } from '../../data/leagues';

interface LeagueSelectorProps {
  selectedLeague: LeagueId | null;
  onLeagueSelect: (leagueId: LeagueId) => void;
}

export function LeagueSelector({ selectedLeague, onLeagueSelect }: LeagueSelectorProps) {
  const options = [
    { value: '', label: 'Selecciona una liga...' },
    ...LEAGUES.map(league => ({
      value: league.id,
      label: league.name
    }))
  ];

  return (
    <Listbox
      label="Selecciona una Liga"
      value={selectedLeague || ''}
      onChange={(value) => onLeagueSelect(value as LeagueId)}
      options={options}
    />
  );
}