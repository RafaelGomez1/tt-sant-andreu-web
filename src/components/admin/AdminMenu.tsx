import React from 'react';
import { CalendarDays, Users, Briefcase } from 'lucide-react';

export type AdminSection = 'menu' | 'bookings' | 'members' | 'academy';

interface AdminMenuProps {
  onNavigate: (section: AdminSection) => void;
}

export function AdminMenu({ onNavigate }: AdminMenuProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Panel de Directiva
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button
          onClick={() => onNavigate('bookings')}
          className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
        >
          <CalendarDays className="w-12 h-12 text-blue-500 mb-4" />
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Gestión de Reservas
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Activar y desactivar días de la semana
          </span>
        </button>

        <button
          onClick={() => onNavigate('members')}
          className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
        >
          <Users className="w-12 h-12 text-green-500 mb-4" />
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Gestión de Socios
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Consultar y gestionar los socios del club
          </span>
        </button>

        <button
          onClick={() => onNavigate('academy')}
          className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
        >
          <Briefcase className="w-12 h-12 text-purple-500 mb-4" />
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Academia
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Consultar miembros de los grupos de academia
          </span>
        </button>
      </div>
    </div>
  );
}
