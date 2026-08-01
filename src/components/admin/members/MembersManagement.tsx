import React, { useState, useCallback } from 'react';
import { UserPlus } from 'lucide-react';
import { MembersFilters } from './MembersFilters';
import { MembersTable } from './MembersTable';
import { CreateMemberModal } from './CreateMemberModal';
import { useMembers } from '../../../hooks/useMembers';
import { MemberType } from '../../../services/api/members';
import { ErrorAlert } from '../../ui/ErrorAlert';

const PAGE_SIZE = 10;

export function MembersManagement() {
  const [selectedType, setSelectedType] = useState<MemberType | undefined>(undefined);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const { members, totalPages, totalElements, currentPage, loading, error } = useMembers({
    type: selectedType,
    page,
    size: PAGE_SIZE,
    searchText,
    refreshKey,
  });

  const handleTypeChange = (type: MemberType | undefined) => {
    setSelectedType(type);
    setPage(0);
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const handleMemberCreated = useCallback(() => {
    setShowCreateModal(false);
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Gestión de Socios
        </h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Nuevo Socio
        </button>
      </div>

      {error && <ErrorAlert message={error} />}

      <MembersFilters
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        searchText={searchText}
        onSearchChange={handleSearchChange}
      />

      <MembersTable
        members={members}
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={setPage}
        loading={loading}
      />

      {showCreateModal && (
        <CreateMemberModal
          onClose={() => setShowCreateModal(false)}
          onCreated={handleMemberCreated}
        />
      )}
    </div>
  );
}
