import React from 'react';
import { Power } from 'lucide-react';
import { translateDayOfWeek, translateMonth } from '../../utils/translations';
import type { Agenda } from '../../services/api/types';

interface AgendaItemProps {
  agenda: Agenda;
  onToggleAgenda: (agendaId: string, isEnabled: boolean) => Promise<void>;
  isLoading: boolean;
}

export function AgendaItem({ agenda, onToggleAgenda, isLoading }: AgendaItemProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {translateDayOfWeek(agenda.day.dayOfWeek)} {agenda.day.number} {translateMonth(agenda.month)}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Estado: {agenda.enabled ? 'Activa' : 'Desactivada'}
          </p>
        </div>
        <button
          onClick={() => onToggleAgenda(agenda.id, agenda.enabled)}
          disabled={isLoading}
          className={`p-2 rounded-lg ${
            agenda.enabled
              ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
              : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
          } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <Power className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}