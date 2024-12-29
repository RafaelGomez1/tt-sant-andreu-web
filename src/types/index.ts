export interface Booking {
  id: string;
  playerId: string;
  playerName: string;
  day: string;
  timeSlot: string;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}