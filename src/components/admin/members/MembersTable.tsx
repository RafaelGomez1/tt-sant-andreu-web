import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Member, MemberType, AcademyGroup, Team, AgeGroup } from '../../../services/api/members';

interface MembersTableProps {
  members: Member[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  loading: boolean;
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
}

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const TYPE_LABELS: Record<MemberType, string> = {
  CASUAL: 'Casual',
  ACADEMY_BEGINNER: 'Iniciación',
  ACADEMY_INTERMEDIATE: 'Tecnificación',
  COMPETITION: 'Federado',
};

const TYPE_COLORS: Record<MemberType, string> = {
  CASUAL: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  ACADEMY_BEGINNER: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  ACADEMY_INTERMEDIATE: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  COMPETITION: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
};

const GROUP_LABELS: Record<AcademyGroup, string> = {
  MONDAY_6_7: 'Lunes 18-19h',
  MONDAY_7_8: 'Lunes 19-20h',
  WEDNESDAY_6_7: 'Miércoles 18-19h',
  WEDNESDAY_7_8: 'Miércoles 19-20h',
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

export function MembersTable({
  members,
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  onPageSizeChange,
  onPageChange,
  loading,
  onEdit,
  onDelete,
}: MembersTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Edad
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">
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
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${TYPE_COLORS[member.type]}`}>
                    {TYPE_LABELS[member.type]}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap hidden sm:table-cell">
                  {Array.isArray(member.phoneNumbers) ? member.phoneNumbers.join(', ') : '—'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap hidden md:table-cell">
                  {member.academyGroup ? GROUP_LABELS[member.academyGroup] : '—'}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap hidden md:table-cell">
                  {member.team ? (
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${TEAM_COLORS[member.team]}`}>
                      {TEAM_LABELS[member.team]}
                    </span>
                  ) : '—'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap hidden lg:table-cell">
                  {member.email ?? '—'}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap hidden lg:table-cell">
                  {member.ageGroup ? (
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${AGE_GROUP_COLORS[member.ageGroup]}`}>
                      {AGE_GROUP_LABELS[member.ageGroup]}
                    </span>
                  ) : '—'}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap text-right relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
                    className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {openMenuId === member.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-8 top-2 z-10 w-44 bg-white dark:bg-gray-700 rounded-md shadow-lg ring-1 ring-black/5 dark:ring-white/10"
                    >
                      <button
                        onClick={() => {
                          setOpenMenuId(null);
                          onEdit(member);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-t-md"
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Editar info
                      </button>
                      <button
                        onClick={() => {
                          setOpenMenuId(null);
                          onDelete(member);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-b-md"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar socio
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {totalElements} socio{totalElements !== 1 ? 's' : ''} en total
          </span>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Mostrar:</label>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
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
