import React from 'react';
import { isSlotFull } from '../utils/bookingUtils';
import { isTimeSlotCompleted } from '../utils/dateUtils';
import { Booking } from '../types';

interface StatusChipProps {
  bookings: Booking[];
  day: string;
  timeSlot: string;
}

export function StatusChip({ bookings, day, timeSlot }: StatusChipProps) {
  const isFull = isSlotFull(bookings, day, timeSlot);
  const isCompleted = isTimeSlotCompleted(timeSlot);

  let status: string;
  let colorClasses: string;

  if (isCompleted) {
    status = 'Completed';
    colorClasses = 'bg-gray-100 text-gray-800';
  } else if (isFull) {
    status = 'Full';
    colorClasses = 'bg-red-100 text-red-800';
  } else {
    status = 'Available';
    colorClasses = 'bg-green-100 text-green-800';
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}
    >
      {status}
    </span>
  );
}