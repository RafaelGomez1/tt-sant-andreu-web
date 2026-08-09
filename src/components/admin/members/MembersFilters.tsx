import React from 'react';
import { Search } from 'lucide-react';
import { MemberType, AcademyGroup, Team } from '../../../services/api/members';

interface MembersFiltersProps {
  selectedType: MemberType | undefined;
  onTypeChange: (type: MemberType | undefined) => void;
  selectedGroup: AcademyGroup | undefined;
  onGroupChange: (group: AcademyGroup | undefined) => void;
  selectedTeam: Team | undefined;
  onTeamChange: (team: Team | undefined) => void;
  searchText: string;
  onSearchChange: (text: string) => void;
}

const MEMBER_TYPE_LABELS: Record<MemberType, string> = {
  CASUAL: 'Casual',
  ACADEMY_BEGINNER: 'Iniciación',
  ACADEMY_INTERMEDIATE: 'Tecnificación',
  COMPETITION: 'Federado',
};

const ACADEMY_GROUP_LABELS: Record<AcademyGroup, string> = {
  MONDAY_6_7: 'Lunes 18-19h',
  MONDAY_7_8: 'Lunes 19-20h',
  WEDNESDAY_6_7: 'Miércoles 18-19h',
  WEDNESDAY_7_8: 'Miércoles 19-20h',
  FRIDAY_6_7: 'Viernes 18-19h',
  FRIDAY_7_8: 'Viernes 19-20h'
};

const TEAM_LABELS: Record<Team, string> = {
  TWO_A: '2a A',
  THREE_B: '3a B',
};

export function MembersFilters({
  selectedType,
  onTypeChange,
  selectedGroup,
  onGroupChange,
  selectedTeam,
  onTeamChange,
  searchText,
  onSearchChange,
}: MembersFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 flex-wrap">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre o apellido..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <select
        value={selectedType ?? ''}
        onChange={(e) =>
          onTypeChange(e.target.value ? (e.target.value as MemberType) : undefined)
        }
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">Todos los tipos</option>
        {Object.entries(MEMBER_TYPE_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <select
        value={selectedGroup ?? ''}
        onChange={(e) =>
          onGroupChange(e.target.value ? (e.target.value as AcademyGroup) : undefined)
        }
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">Todos los grupos</option>
        {Object.entries(ACADEMY_GROUP_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <select
        value={selectedTeam ?? ''}
        onChange={(e) =>
          onTeamChange(e.target.value ? (e.target.value as Team) : undefined)
        }
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">Todos los equipos</option>
        {Object.entries(TEAM_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
