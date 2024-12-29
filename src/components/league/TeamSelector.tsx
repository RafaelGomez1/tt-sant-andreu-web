import React from 'react';
import { Listbox } from '../ui/Listbox';
import { useClubs } from '../../hooks/useClubs';
import { ErrorAlert } from '../ui/ErrorAlert';
import type { LeagueId } from '../../data/leagues';

interface TeamSelectorProps {
  selectedTeam: string | null;
  onTeamSelect: (teamId: string) => void;
  leagueId: LeagueId | null;
}

export function TeamSelector({ selectedTeam, onTeamSelect, leagueId }: TeamSelectorProps) {
  const { clubs, error } = useClubs(leagueId);

  const options = [
    { value: '', label: 'Selecciona un equipo...' },
    ...clubs.map(club => ({
      value: club,
      label: club
    }))
  ];

  return (
    <div>
      {error && <ErrorAlert message={error} />}
      <Listbox
        label="Selecciona un equipo"
        value={selectedTeam || ''}
        onChange={onTeamSelect}
        options={options}
        disabled={!leagueId}
      />
    </div>
  );
}