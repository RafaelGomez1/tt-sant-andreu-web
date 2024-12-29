import { useState, useEffect } from 'react';
import { getClubCalendar } from '../services/api/competition';
import type { ClubCalendar } from '../services/api/types';
import type { LeagueId } from '../data/leagues';

export function useClubCalendar(leagueId: LeagueId | null, club: string | null) {
  const [calendar, setCalendar] = useState<ClubCalendar | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendar = async () => {
      if (!leagueId || !club) {
        setCalendar(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getClubCalendar(leagueId, club);
        setCalendar(data);
      } catch (err) {
        console.error('Error fetching club calendar:', err);
        setError('Error al cargar el calendario del club.');
        setCalendar(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, [leagueId, club]);

  return { calendar, loading, error };
}