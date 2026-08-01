import React from 'react';
import { Search } from 'lucide-react';
import { MemberType } from '../../../services/api/members';

interface MembersFiltersProps {
  selectedType: MemberType | undefined;
  onTypeChange: (type: MemberType | undefined) => void;
  searchText: string;
  onSearchChange: (text: string) => void;
}

const MEMBER_TYPE_LABELS: Record<MemberType, string> = {
  CASUAL: 'Casual',
  ACADEMY_BEGINNER: 'Academia - Iniciación',
  ACADEMY_INTERMEDIATE: 'Academia - Intermedio',
  COMPETITION: 'Competición',
};

export function MembersFilters({
  selectedType,
  onTypeChange,
  searchText,
  onSearchChange,
}: MembersFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
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
    </div>
  );
}
