import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Member, MemberType, AcademyGroup, Team } from '../../../services/api/members';

interface MembersTableProps {
  members: Member[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

const TYPE_LABELS: Record<MemberType, string> = {
  CASUAL: 'Casual',
  ACADEMY_BEGINNER: 'Academia - Iniciación',
  ACADEMY_INTERMEDIATE: 'Academia - Intermedio',
  COMPETITION: 'Competición',
};

const GROUP_LABELS: Record<AcademyGroup, string> = {
  MONDAY_6_7: 'Lunes 18-19h',
  MONDAY_7_8: 'Lunes 19-20h',
  WEDNESDAY_6_7: 'Miércoles 18-19h',
  WEDNESDAY_7_8: 'Miércoles 19-20h',
};

const TEAM_LABELS: Record<Team, string> = {
  TWO_A: '2a División',
  THREE_B: '3a División B',
};

export function MembersTable({
  members,
  currentPage,
  totalPages,
  totalElements,
  onPageChange,
  loading,
}: MembersTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No se encontraron socios.
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
                Tipo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                Teléfono
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                Grupo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                Equipo
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                  {member.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                  {member.surname}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                  {TYPE_LABELS[member.type]}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap hidden sm:table-cell">
                  {Array.isArray(member.phoneNumbers) ? member.phoneNumbers.join(', ') : '—'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap hidden md:table-cell">
                  {member.academyGroup ? GROUP_LABELS[member.academyGroup] : '—'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap hidden md:table-cell">
                  {member.team ? TEAM_LABELS[member.team] : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {totalElements} socio{totalElements !== 1 ? 's' : ''} en total
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {currentPage + 1} / {Math.max(totalPages, 1)}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
