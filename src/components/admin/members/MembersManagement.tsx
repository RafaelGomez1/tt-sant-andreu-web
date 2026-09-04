import React, { useState, useCallback, useEffect } from 'react';
import { Download, UserPlus } from 'lucide-react';
import { MembersFilters } from './MembersFilters';
import { MembersTable } from './MembersTable';
import { DeparturesTable } from './DeparturesTable';
import { CreateMemberModal } from './CreateMemberModal';
import { UpdateMemberModal } from './UpdateMemberModal';
import { DeleteMemberModal } from './DeleteMemberModal';
import { useMembers } from '../../../hooks/useMembers';
import { useDepartures } from '../../../hooks/useDepartures';
import {
  Member,
  MemberType,
  AcademyGroup,
  Team,
  AgeGroup,
  Departure,
  filterMembers,
  getAllMembers,
  getDepartures,
} from '../../../services/api/members';
import { ErrorAlert } from '../../ui/ErrorAlert';
import { downloadCsv } from '../../../utils/csv';
import { formatAcademyGroups } from '../../../utils/groupFormatter';

const DEFAULT_PAGE_SIZE = 100;
type MembersViewTab = 'members' | 'departures';

const MEMBER_TYPE_LABELS: Record<MemberType, string> = {
  CASUAL: 'Casual',
  ACADEMY_BEGINNER: 'Iniciación',
  ACADEMY_INTERMEDIATE: 'Tecnificación',
  COMPETITION: 'Federado',
  COACH: 'Entrenador',
};

const TEAM_LABELS: Record<Team, string> = {
  TWO_A: '2a A',
  THREE_B: '3a B',
};

const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  KIDS: 'Infantil',
  SENIORS: 'Adulto',
  RETIRED: 'Veterano',
};

const MEMBERS_EXPORT_HEADERS = [
  'ID',
  'Nombre',
  'Apellido',
  'Teléfonos',
  'Tipo',
  'Grupos de academia',
  'Equipo',
  'DNI',
  'Dirección',
  'Ciudad',
  'Código postal',
  'Fecha de nacimiento',
  'Email',
  'Socio desde',
  'Edad',
  'Grupo de edad',
];

const DEPARTURES_EXPORT_HEADERS = [
  'ID',
  'ID socio',
  'Nombre',
  'Apellido',
  'Teléfonos',
  'Tipo',
  'Fecha de baja',
  'Grupos de academia',
  'Equipo',
  'DNI',
  'Dirección',
  'Ciudad',
  'Código postal',
  'Fecha de nacimiento',
  'Email',
  'Socio desde',
  'Edad',
  'Grupo de edad',
];

const getDateSortValue = (value: string): number => {
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const formatPhoneNumbers = (phoneNumbers: string[]): string =>
  Array.isArray(phoneNumbers) && phoneNumbers.length > 0 ? phoneNumbers.join(', ') : '';

const formatAgeGroup = (ageGroup: AgeGroup | null): string =>
  ageGroup ? AGE_GROUP_LABELS[ageGroup] : '';

const formatTeam = (team: Team | null): string => (team ? TEAM_LABELS[team] : '');

const formatCsvDate = (value: string | null): string => value ?? '';

const formatCsvAcademyGroups = (groups: AcademyGroup[]): string =>
  groups.length > 0 ? formatAcademyGroups(groups) : '';

const formatMemberRows = (members: Member[]) =>
  members.map((member) => [
    member.id,
    member.name,
    member.surname,
    formatPhoneNumbers(member.phoneNumbers),
    MEMBER_TYPE_LABELS[member.type],
    formatCsvAcademyGroups(member.academyGroups),
    formatTeam(member.team),
    member.idNumber ?? '',
    member.address ?? '',
    member.city ?? '',
    member.postalCode ?? '',
    formatCsvDate(member.dateOfBirth),
    member.email ?? '',
    formatCsvDate(member.memberSince),
    member.age ?? '',
    formatAgeGroup(member.ageGroup),
  ]);

const formatDepartureRows = (departures: Departure[]) =>
  [...departures]
    .sort((left, right) => getDateSortValue(right.departureDate) - getDateSortValue(left.departureDate))
    .map((departure) => [
      departure.id,
      departure.memberId,
      departure.name,
      departure.surname,
      formatPhoneNumbers(departure.phoneNumbers),
      MEMBER_TYPE_LABELS[departure.type],
      formatCsvDate(departure.departureDate),
      formatCsvAcademyGroups(departure.academyGroups),
      formatTeam(departure.team),
      departure.idNumber ?? '',
      departure.address ?? '',
      departure.city ?? '',
      departure.postalCode ?? '',
      formatCsvDate(departure.dateOfBirth),
      departure.email ?? '',
      formatCsvDate(departure.memberSince),
      departure.age ?? '',
      formatAgeGroup(departure.ageGroup),
    ]);

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
  const [exportingMembers, setExportingMembers] = useState(false);
  const [exportingDepartures, setExportingDepartures] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

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

  useEffect(() => {
    setExportError(null);
  }, [activeTab]);

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

  const handleMembersExport = useCallback(async () => {
    setExportError(null);
    setExportingMembers(true);

    try {
      const allMembers = await getAllMembers(selectedType);
      const filteredMembers = filterMembers(allMembers, {
        searchText,
        academyGroup: selectedGroup,
        team: selectedTeam,
      });

      downloadCsv('socios.csv', MEMBERS_EXPORT_HEADERS, formatMemberRows(filteredMembers));
    } catch (err) {
      console.error('Error exporting members:', err);
      setExportError('No se ha podido exportar el listado de socios. Inténtalo de nuevo.');
    } finally {
      setExportingMembers(false);
    }
  }, [selectedType, searchText, selectedGroup, selectedTeam]);

  const handleDeparturesExport = useCallback(async () => {
    setExportError(null);
    setExportingDepartures(true);

    try {
      const currentDepartures = await getDepartures();
      downloadCsv('bajas.csv', DEPARTURES_EXPORT_HEADERS, formatDepartureRows(currentDepartures));
    } catch (err) {
      console.error('Error exporting departures:', err);
      setExportError('No se ha podido exportar el listado de bajas. Inténtalo de nuevo.');
    } finally {
      setExportingDepartures(false);
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Gestión de Socios
        </h2>
        {activeTab === 'members' && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleMembersExport}
              disabled={exportingMembers || loading}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4 mr-2" />
              {exportingMembers ? 'Exportando...' : 'Exportar CSV'}
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Nuevo Socio
            </button>
          </div>
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
      {exportError && <ErrorAlert message={exportError} />}

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
          onExport={handleDeparturesExport}
          exporting={exportingDepartures}
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
