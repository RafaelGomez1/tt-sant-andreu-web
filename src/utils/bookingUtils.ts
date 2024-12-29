import { AvailableHour } from '../services/api/types';

export const isSlotFull = (hour: AvailableHour): boolean => {
  return (hour.registeredPlayers?.length || 0) >= hour.capacity.value;
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};