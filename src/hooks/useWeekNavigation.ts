import { useState } from 'react';
import { getCurrentBookingWeek } from '../utils/dateUtils';

export function useWeekNavigation() {
  const [currentWeek, setCurrentWeek] = useState(() => getCurrentBookingWeek());

  const goToNextWeek = () => {
    setCurrentWeek(prev => ({
      week: prev.week === 52 ? 1 : prev.week + 1,
      year: prev.week === 52 ? prev.year + 1 : prev.year
    }));
  };

  const goToPreviousWeek = () => {
    setCurrentWeek(prev => ({
      week: prev.week === 1 ? 52 : prev.week - 1,
      year: prev.week === 1 ? prev.year - 1 : prev.year
    }));
  };

  return {
    currentWeek,
    goToNextWeek,
    goToPreviousWeek
  };
}