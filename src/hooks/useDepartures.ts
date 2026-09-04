import { useEffect, useState } from 'react';
import { Departure, getDepartures } from '../services/api/members';

export function useDepartures(enabled: boolean) {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let cancelled = false;

    const fetchDepartures = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getDepartures();

        if (!cancelled) {
          setDepartures(result);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Error fetching departures:', err);
          setError('Error al cargar las bajas. Por favor, inténtalo de nuevo.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchDepartures();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return {
    departures,
    loading,
    error,
  };
}
