import { AcademyGroup } from '../services/api/members';

interface GroupInfo {
  day: string;
  dayAbbr: string;
  time: string;
}

const GROUP_INFO: Record<AcademyGroup, GroupInfo> = {
  MONDAY_6_7: { day: 'Lunes', dayAbbr: 'L', time: '18-19h' },
  MONDAY_7_8: { day: 'Lunes', dayAbbr: 'L', time: '19-20h' },
  WEDNESDAY_6_7: { day: 'Miércoles', dayAbbr: 'M', time: '18-19h' },
  WEDNESDAY_7_8: { day: 'Miércoles', dayAbbr: 'M', time: '19-20h' },
  FRIDAY_6_7: { day: 'Viernes', dayAbbr: 'V', time: '18-19h' },
  FRIDAY_7_8: { day: 'Viernes', dayAbbr: 'V', time: '19-20h' },
};

export function formatAcademyGroups(groups: AcademyGroup[]): string {
  if (!groups || groups.length === 0) {
    return '—';
  }

  // Parse groups into day/time pairs
  const parsed = groups.map((group) => ({
    ...GROUP_INFO[group],
    group,
  }));

  // Group by day
  const groupsByDay = new Map<string, string[]>();
  parsed.forEach(({ dayAbbr, time }) => {
    if (!groupsByDay.has(dayAbbr)) {
      groupsByDay.set(dayAbbr, []);
    }
    groupsByDay.get(dayAbbr)!.push(time);
  });

  // Format each day's groups
  const formattedDays: string[] = [];
  
  // Sort by day order (L, M, V)
  const dayOrder = ['L', 'M', 'V'];
  const sortedDays = Array.from(groupsByDay.keys()).sort(
    (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
  );

  sortedDays.forEach((dayAbbr) => {
    const times = groupsByDay.get(dayAbbr)!;
    // Remove duplicates and sort
    const uniqueTimes = Array.from(new Set(times)).sort();
    
    if (uniqueTimes.length === 1) {
      formattedDays.push(`${dayAbbr} ${uniqueTimes[0]}`);
    } else {
      // Multiple times on same day, join with /
      formattedDays.push(`${dayAbbr} ${uniqueTimes.join('/')}`);
    }
  });

  // Join different days with comma and space
  return formattedDays.join(', ');
}
