import { startOfWeek, getWeek, getYear, addWeeks, isSaturday, isSunday, isBefore, startOfDay } from 'date-fns';

export const isTimeSlotCompleted = (timeSlot: string): boolean => {
  const now = new Date();
  const [hours, minutes] = timeSlot.split(':').map(Number);
  const slotDate = new Date();
  slotDate.setHours(hours, minutes);

  return now > slotDate;
};

export const getCurrentBookingWeek = (): { week: number; year: number } => {
  const today = new Date();
  let targetDate = today;
  
  // If it's Saturday or Sunday, show next week's schedule
  if (isSaturday(today) || isSunday(today)) {
    targetDate = addWeeks(today, 1);
  }

  // Get the first day of the week
  const firstDayOfWeek = startOfWeek(targetDate, { weekStartsOn: 1 }); // Start week on Monday

  // Calculate week and year
  const year = getYear(firstDayOfWeek);
  const week = getWeek(firstDayOfWeek, { 
    weekStartsOn: 1, // Start week on Monday
    firstWeekContainsDate: 4 // This follows ISO week numbering
  });

  // Handle year transition
  if (week === 1 && firstDayOfWeek.getMonth() === 11) { // 11 is December (0-based)
    return {
      week: 1,
      year: year + 1
    };
  }

  // Handle week 53 to week 1 transition
  if (week === 53 && (isSaturday(today) || isSunday(today))) {
    return {
      week: 1,
      year: year + 1
    };
  }

  return { week, year };
};

export const isPastAgenda = (day: number, month: string, year?: number): boolean => {
  const today = startOfDay(new Date());
  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];
  
  // If no year is provided, use the current year from getCurrentBookingWeek
  const { year: currentBookingYear } = getCurrentBookingWeek();
  const agendaYear = year ?? currentBookingYear;
  
  const agendaDate = new Date(agendaYear, months.indexOf(month), day);
  return isBefore(agendaDate, today);
};