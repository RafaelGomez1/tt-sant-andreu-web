import { useState, useEffect } from 'react';
import { getAgendas } from '../services/api/bookings';
import type { Agenda } from '../services/api/types';
import { getCurrentBookingWeek } from '../utils/dateUtils';
import { ApiError } from '../services/api/errors';
import { mergeAgendasWithSchedule } from '../utils/scheduleUtils';

export function useAgendas(week?: number, year?: number) {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgendas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { week: currentWeek, year: currentYear } = getCurrentBookingWeek();
      const targetWeek = week ?? currentWeek;
      const targetYear = year ?? currentYear;
      
      console.log('Fetching agendas for week:', targetWeek, 'year:', targetYear);
      
      const data = await getAgendas(targetWeek, targetYear);
      console.log('API Response:', data);
      
      const mergedAgendas = mergeAgendasWithSchedule(data, targetWeek, targetYear);
      console.log('Merged Agendas:', mergedAgendas);
      
      setAgendas(mergedAgendas);
    } catch (err) {
      console.error('Error fetching agendas:', err);
      
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('No se ha podido conectar con el servidor. Comprueba tu conexión a internet.');
      }
      
      const { week: currentWeek, year: currentYear } = getCurrentBookingWeek();
      const emptyAgendas = mergeAgendasWithSchedule([], week ?? currentWeek, year ?? currentYear);
      setAgendas(emptyAgendas);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgendas();
  }, [week, year]);

  return {
    agendas,
    loading,
    error,
    refreshAgendas: fetchAgendas,
  };
}