import { useState, useEffect, useMemo } from 'react';
import { searchMembers, MembersPage, MemberType, AcademyGroup, Team, Member } from '../services/api/members';

interface UseMembersParams {
  type?: MemberType;
  page: number;
  size: number;
  searchText: string;
  academyGroup?: AcademyGroup;
  team?: Team;
  refreshKey?: number;
}

export function useMembers({ type, page, size, searchText, academyGroup, team, refreshKey }: UseMembersParams) {
  const [data, setData] = useState<MembersPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await searchMembers({ type, page, size });
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Error fetching members:', err);
          setError('Error al cargar los socios. Por favor, inténtalo de nuevo.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchMembers();

    return () => {
      cancelled = true;
    };
  }, [type, page, size, refreshKey]);

  const filteredContent: Member[] = useMemo(() => {
    if (!data) return [];
    let results = data.content;

    if (searchText.trim()) {
      const lowerSearch = searchText.toLowerCase().trim();
      results = results.filter(
        (member) =>
          member.name.toLowerCase().includes(lowerSearch) ||
          member.surname.toLowerCase().includes(lowerSearch)
      );
    }

    if (academyGroup) {
      results = results.filter((member) => member.academyGroups.includes(academyGroup));
    }

    if (team) {
      results = results.filter((member) => member.team === team);
    }

    return results;
  }, [data, searchText, academyGroup, team]);

  return {
    members: filteredContent,
    totalPages: data?.totalPages ?? 0,
    totalElements: data?.totalElements ?? 0,
    currentPage: data?.page ?? 0,
    loading,
    error,
  };
}
