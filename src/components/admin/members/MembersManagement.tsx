import React, { useState, useCallback } from 'react';
import { UserPlus } from 'lucide-react';
import { MembersFilters } from './MembersFilters';
import { MembersTable } from './MembersTable';
import { CreateMemberModal } from './CreateMemberModal';
import { UpdateMemberModal } from './UpdateMemberModal';
import { DeleteMemberModal } from './DeleteMemberModal';
import { useMembers } from '../../../hooks/useMembers';
import { Member, MemberType, AcademyGroup, Team } from '../../../services/api/members';
import { ErrorAlert } from '../../ui/ErrorAlert';

const DEFAULT_PAGE_SIZE = 20;

export function MembersManagement() {
  const [selectedType, setSelectedType] = useState<MemberType | undefined>(undefined);
  const [selectedGroup, setSelectedGroup] = useState<AcademyGroup | undefined>(undefined);
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(undefined);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const { members, totalPages, totalElements, currentPage, loading, error } = useMembers({
    type: selectedType,
    page,
    size: pageSize,
    searchText,
    academyGroup: selectedGroup,
    team: selectedTeam,
    refreshKey,
  });

  const handleTypeChange = (type: MemberType | undefined) => {
    setSelectedType(type);
    setPage(0);
  };

  const handleGroupChange = (group: AcademyGroup | undefined) => {
    setSelectedGroup(group);
  };

  const handleTeamChange = (team: Team | undefined) => {
    setSelectedTeam(team);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(0);
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const refresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const handleMemberCreated = useCallback(() => {
    setShowCreateModal(false);
    refresh();
  }, [refresh]);

  const handleMemberUpdated = useCallback(() => {
    setEditingMember(null);
    refresh();
  }, [refresh]);

  const handleMemberDeleted = useCallback(() => {
    setDeletingMember(null);
    refresh();
  }, [refresh]);

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
        selectedGroup={selectedGroup}
        onGroupChange={handleGroupChange}
        selectedTeam={selectedTeam}
        onTeamChange={handleTeamChange}
        searchText={searchText}
        onSearchChange={handleSearchChange}
      />

      <MembersTable
        members={members}
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        onPageChange={setPage}
        loading={loading}
        onEdit={setEditingMember}
        onDelete={setDeletingMember}
      />

      {showCreateModal && (
        <CreateMemberModal
          onClose={() => setShowCreateModal(false)}
          onCreated={handleMemberCreated}
        />
      )}

      {editingMember && (
        <UpdateMemberModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onUpdated={handleMemberUpdated}
        />
      )}

      {deletingMember && (
        <DeleteMemberModal
          member={deletingMember}
          onClose={() => setDeletingMember(null)}
          onDeleted={handleMemberDeleted}
        />
      )}
    </div>
  );
}
