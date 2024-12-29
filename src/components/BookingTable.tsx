import React from 'react';
import { UserPlus, UserMinus } from 'lucide-react';
import type { Agenda } from '../services/api/types';
import { isSlotFull } from '../utils/bookingUtils';
import { isPastAgenda } from '../utils/dateUtils';
import { PlayerBadge } from './ui/PlayerBadge';
import { StatusBadge } from './ui/StatusBadge';
import { translateDayOfWeek, translateMonth } from '../utils/translations';

interface BookingTableProps {
  agenda: Agenda;
  onAddBooking: (agendaId: string, hourId: string) => void;
  onDeleteBooking: (agendaId: string, hourId: string) => void;
}

export function BookingTable({ agenda, onAddBooking, onDeleteBooking }: BookingTableProps) {
  if (!agenda?.availableHours) {
    return null;
  }

  const formatTime = (hour: number) => hour.toString();
  const isDisabled = agenda.availableHours.length === 0;
  const isPast = isPastAgenda(agenda.day.number, agenda.month, agenda.year);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b dark:border-gray-700 text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {translateDayOfWeek(agenda.day.dayOfWeek)} {agenda.day.number} {translateMonth(agenda.month)}
        </h2>
      </div>
      
      {isDisabled ? (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          No hay horarios disponibles para este día
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Horas
                </th>
                <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Jugadores
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {agenda.availableHours.map((hour) => {
                const startTime = formatTime(hour.from);
                const endTime = formatTime(hour.to);
                const isFull = isSlotFull(hour);
                const playersCount = hour.registeredPlayers?.length || 0;

                return (
                  <tr key={hour.id}>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {startTime} - {endTime}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                        {hour.registeredPlayers?.map((player, index) => (
                          <PlayerBadge key={`${player.name}-${index}`} name={player.name} />
                        ))}
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={isFull ? 'full' : 'available'} />
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onAddBooking(agenda.id, hour.id)}
                          disabled={isFull || isPast}
                          className="p-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <UserPlus className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => onDeleteBooking(agenda.id, hour.id)}
                          disabled={playersCount === 0 || isPast}
                          className="p-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <UserMinus className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}