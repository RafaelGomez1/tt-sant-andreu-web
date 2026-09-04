import React, { useState, useCallback } from 'react';
import { UserPlus } from 'lucide-react';
import { MembersFilters } from './MembersFilters';
import { MembersTable } from './MembersTable';
import { DeparturesTable } from './DeparturesTable';
import { CreateMemberModal } from './CreateMemberModal';
import { UpdateMemberModal } from './UpdateMemberModal';
import { DeleteMemberModal } from './DeleteMemberModal';
import { useMembers } from '../../../hooks/useMembers';
import { useDepartures } from '../../../hooks/useDepartures';
import { Member, MemberType, AcademyGroup, Team } from '../../../services/api/members';
import { ErrorAlert } from '../../ui/ErrorAlert';

const DEFAULT_PAGE_SIZE = 100;
type MembersViewTab = 'members' | 'departures';

export function MembersManagement() {
  const [activeTab, setActiveTab] = useState<MembersViewTab>('members');
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
  const { departures, loading: departuresLoading, error: departuresError } = useDepartures(activeTab === 'departures');

  const activeError = activeTab === 'members' ? error : departuresError;

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
        {activeTab === 'members' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Nuevo Socio
          </button>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'members'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Socios
        </button>
        <button
          onClick={() => setActiveTab('departures')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'departures'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Bajas
        </button>
      </div>

      {activeError && <ErrorAlert message={activeError} />}

      {activeTab === 'members' ? (
        <>
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
        </>
      ) : (
        <DeparturesTable
          departures={departures}
          loading={departuresLoading}
        />
      )}

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
