export function translateDayOfWeek(day: string): string {
  const translations: Record<string, string> = {
    'MONDAY': 'Lunes',
    'TUESDAY': 'Martes',
    'WEDNESDAY': 'Miércoles',
    'THURSDAY': 'Jueves',
    'FRIDAY': 'Viernes',
    'SATURDAY': 'Sábado',
    'SUNDAY': 'Domingo'
  };
  return translations[day] || day;
}

export function translateMonth(month: string): string {
  const translations: Record<string, string> = {
    'JANUARY': 'Enero',
    'FEBRUARY': 'Febrero',
    'MARCH': 'Marzo',
    'APRIL': 'Abril',
    'MAY': 'Mayo',
    'JUNE': 'Junio',
    'JULY': 'Julio',
    'AUGUST': 'Agosto',
    'SEPTEMBER': 'Septiembre',
    'OCTOBER': 'Octubre',
    'NOVEMBER': 'Noviembre',
    'DECEMBER': 'Diciembre'
  };
  return translations[month] || month;
}