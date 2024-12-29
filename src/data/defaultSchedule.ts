import { DaySchedule } from '../types';

export const DEFAULT_SCHEDULE: DaySchedule[] = [
  {
    day: 'Monday',
    slots: [
      { startTime: '16:00', endTime: '17:00' },
      { startTime: '17:00', endTime: '18:00' },
    ],
  },
  {
    day: 'Tuesday',
    slots: [
      { startTime: '16:00', endTime: '17:00' },
      { startTime: '17:00', endTime: '18:00' },
      { startTime: '18:00', endTime: '19:00' },
    ],
  },
  {
    day: 'Wednesday',
    slots: [
      { startTime: '16:00', endTime: '17:00' },
      { startTime: '17:00', endTime: '18:00' },
    ],
  },
  {
    day: 'Thursday',
    slots: [
      { startTime: '16:00', endTime: '17:00' },
      { startTime: '17:00', endTime: '18:00' },
    ],
  },
  {
    day: 'Friday',
    slots: [
      { startTime: '16:00', endTime: '17:00' },
      { startTime: '17:00', endTime: '18:00' },
    ],
  },
];