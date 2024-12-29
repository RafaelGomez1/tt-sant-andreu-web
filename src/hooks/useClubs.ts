import { useState, useEffect } from 'react';
import { getClubsByLeague } from '../services/api/competition';
import type { LeagueId } from '../data/leagues';

export function useClubs(leagueId: LeagueId | null) {
  const [clubs, setClubs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubs = async () => {
      if (!leagueId) {
        setClubs([]);
        return;
      }

      try {
        setError(null);
        const data = await getClubsByLeague(leagueId);
        setClubs(data);
      } catch (err) {
        console.error('Error fetching clubs:', err);
        setError('Failed to load clubs. Please try again later.');
        setClubs([]);
      }
    };

    fetchClubs();
  }, [leagueId]);

  return { clubs, error };
}