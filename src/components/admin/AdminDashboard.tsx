import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAgendas } from '../../hooks/useAgendas';
import { useWeekNavigation } from '../../hooks/useWeekNavigation';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorAlert } from '../ui/ErrorAlert';
import { disableAgenda, enableAgenda } from '../../services/api/admin';
import { translateDayOfWeek, translateMonth } from '../../utils/translations';

interface AdminDashboardProps {
  accessKey: string;
}

export function AdminDashboard({ accessKey }: AdminDashboardProps) {
  const { currentWeek, goToNextWeek, goToPreviousWeek } = useWeekNavigation();
  const { agendas, loading, error, refreshAgendas } = useAgendas(currentWeek.week, currentWeek.year);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleToggleAgenda = async (agendaId: string, isEnabled: boolean) => {
    try {
      setActionError(null);
      setActionLoading(agendaId);
      
      if (isEnabled) {
        await disableAgenda(accessKey, agendaId);
      } else {
        await enableAgenda(accessKey, agendaId);
      }
      
      await refreshAgendas();
    } catch (err) {
      console.error('Error toggling agenda:', err);
      setActionError('Error al modificar la agenda. Por favor, inténtalo de nuevo.');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando agendas..." />;
  }

  return (
    <div className="space-y-6">
      {(error || actionError) && (
        <ErrorAlert message={error || actionError || ''} />
      )}

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousWeek}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-lg font-medium text-gray-900 dark:text-white">
          Semana {currentWeek.week}, {currentWeek.year}
        </span>
        <button
          onClick={goToNextWeek}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {agendas.map((agenda) => (
            <li key={agenda.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {translateDayOfWeek(agenda.day.dayOfWeek)} {agenda.day.number} {translateMonth(agenda.month)}
                    </p>
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      agenda.enabled 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {agenda.enabled ? 'Activa' : 'Desactivada'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleToggleAgenda(agenda.id, agenda.enabled)}
                      disabled={actionLoading === agenda.id}
                      className={`inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md ${
                        agenda.enabled
                          ? 'text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
                          : 'text-green-700 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
                      } focus:outline-none transition ease-in-out duration-150 disabled:opacity-50`}
                    >
                      {actionLoading === agenda.id ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      ) : null}
                      {agenda.enabled ? 'Desactivar' : 'Activar'}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}