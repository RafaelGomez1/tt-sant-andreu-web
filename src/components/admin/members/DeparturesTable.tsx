import { useMemo } from 'react';
import { Download } from 'lucide-react';
import { Departure, MemberType, Team, AgeGroup } from '../../../services/api/members';
import { formatAcademyGroups } from '../../../utils/groupFormatter';

interface DeparturesTableProps {
  departures: Departure[];
  loading: boolean;
  onExport: () => void;
  exporting: boolean;
}

const TYPE_LABELS: Record<MemberType, string> = {
  CASUAL: 'Casual',
  ACADEMY_BEGINNER: 'Iniciación',
  ACADEMY_INTERMEDIATE: 'Tecnificación',
  COMPETITION: 'Federado',
  COACH: 'Entrenador',
};

const TYPE_COLORS: Record<MemberType, string> = {
  CASUAL: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  ACADEMY_BEGINNER: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  ACADEMY_INTERMEDIATE: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  COMPETITION: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  COACH: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
};

const TEAM_LABELS: Record<Team, string> = {
  TWO_A: '2a A',
  THREE_B: '3a B',
};

const TEAM_COLORS: Record<Team, string> = {
  TWO_A: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  THREE_B: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400',
};

const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  KIDS: 'Infantil',
  SENIORS: 'Adulto',
  RETIRED: 'Veterano',
};

const AGE_GROUP_COLORS: Record<AgeGroup, string> = {
  KIDS: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  SENIORS: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  RETIRED: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
};

const formatDate = (value: string | null): string => {
  if (!value) {
    return '—';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('es-ES').format(date);
};

const getDateSortValue = (value: string): number => {
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

export function DeparturesTable({ departures, loading, onExport, exporting }: DeparturesTableProps) {
  const sortedDepartures = useMemo(
    () => [...departures].sort((left, right) => getDateSortValue(right.departureDate) - getDateSortValue(left.departureDate)),
    [departures]
  );

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (sortedDepartures.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No se encontraron bajas.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {sortedDepartures.length} baja{sortedDepartures.length !== 1 ? 's' : ''} registrada{sortedDepartures.length !== 1 ? 's' : ''}
        </span>
        <button
          type="button"
          onClick={onExport}
          disabled={exporting || loading}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4 mr-2" />
          {exporting ? 'Exportando...' : 'Exportar CSV'}
        </button>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Apellido
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Baja
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                Teléfono
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                Grupo
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                Equipo
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Socio desde
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell">
                Email
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell">
                Edad
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedDepartures.map((departure) => (
              <tr key={departure.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                  {departure.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                  {departure.surname}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                  {formatDate(departure.departureDate)}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${TYPE_COLORS[departure.type]}`}>
                    {TYPE_LABELS[departure.type]}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap hidden sm:table-cell">
                  {Array.isArray(departure.phoneNumbers) ? departure.phoneNumbers.join(', ') : '—'}
                </td>
                <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap hidden md:table-cell">
                  {formatAcademyGroups(departure.academyGroups || [])}
                </td>
                <td className="px-3 py-3 text-sm whitespace-nowrap hidden md:table-cell">
                  {departure.team ? (
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${TEAM_COLORS[departure.team]}`}>
                      {TEAM_LABELS[departure.team]}
                    </span>
                  ) : '—'}
                </td>
                <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap hidden lg:table-cell">
                  {formatDate(departure.memberSince)}
                </td>
                <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap hidden xl:table-cell">
                  {departure.email ?? '—'}
                </td>
                <td className="px-3 py-3 text-sm whitespace-nowrap hidden xl:table-cell">
                  {departure.ageGroup ? (
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${AGE_GROUP_COLORS[departure.ageGroup]}`}>
                      {AGE_GROUP_LABELS[departure.ageGroup]}
                    </span>
                  ) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
