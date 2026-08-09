import { AcademyGroup } from '../services/api/members';

export interface AcademySlot {
  group: AcademyGroup | 'INTERMEDIATE_FRIDAY_6_8';
  displayName: string;
}

const BEGINNER_SLOTS: AcademySlot[] = [
  { group: 'MONDAY_6_7', displayName: 'Monday 6:00 - 7:00 PM' },
  { group: 'MONDAY_7_8', displayName: 'Monday 7:00 - 8:00 PM' },
  { group: 'WEDNESDAY_6_7', displayName: 'Wednesday 6:00 - 7:00 PM' },
  { group: 'WEDNESDAY_7_8', displayName: 'Wednesday 7:00 - 8:00 PM' },
  { group: 'FRIDAY_6_7', displayName: 'Friday 6:00 - 7:00 PM' },
];

const INTERMEDIATE_SLOTS: AcademySlot[] = [
  { group: 'INTERMEDIATE_FRIDAY_6_8', displayName: 'Friday 6:00 - 8:00 PM' },
];

export function getAcademySlots(academyType: 'ACADEMY_BEGINNER' | 'ACADEMY_INTERMEDIATE'): AcademySlot[] {
  return academyType === 'ACADEMY_BEGINNER' ? BEGINNER_SLOTS : INTERMEDIATE_SLOTS;
}

export function getMaxCapacity(group: AcademyGroup | 'INTERMEDIATE_FRIDAY_6_8', academyType: 'ACADEMY_BEGINNER' | 'ACADEMY_INTERMEDIATE'): number {
  // Friday 6-7 beginner has max 5, all others have max 12
  if (group === 'FRIDAY_6_7' && academyType === 'ACADEMY_BEGINNER') {
    return 5;
  }
  return 12;
}

export function getSlotDisplayName(group: AcademyGroup | 'INTERMEDIATE_FRIDAY_6_8'): string {
  if (group === 'INTERMEDIATE_FRIDAY_6_8') {
    return 'Friday 6:00 - 8:00 PM';
  }
  const allSlots = [...BEGINNER_SLOTS, ...INTERMEDIATE_SLOTS];
  const slot = allSlots.find(s => s.group === group);
  return slot?.displayName || group;
}
