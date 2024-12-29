import { useState, useEffect } from 'react';
import { getLeagueRankings } from '../services/api/competition';
import type { LeagueRanking } from '../services/api/types';
import type { LeagueId } from '../data/leagues';

export function useLeagueRankings(leagueId: LeagueId | null, club: string | null) {
  const [rankings, setRankings] = useState<LeagueRanking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      if (!leagueId || !club) {
        setRankings(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getLeagueRankings(leagueId, club);
        setRankings(data);
      } catch (err) {
        console.error('Error fetching rankings:', err);
        setError('Failed to load rankings. Please try again later.');
        setRankings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [leagueId, club]);

  return { rankings, loading, error };
}