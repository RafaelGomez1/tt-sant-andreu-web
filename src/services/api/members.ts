import { API_BASE_URL, API_CONFIG } from './config';
import { ApiError } from './errors';

// Types

export type MemberType = 'CASUAL' | 'ACADEMY_BEGINNER' | 'ACADEMY_INTERMEDIATE' | 'COMPETITION' | 'COACH';

export type AcademyGroup = 'MONDAY_6_7' | 'MONDAY_7_8' | 'WEDNESDAY_6_7' | 'WEDNESDAY_7_8' | 'FRIDAY_6_7' | 'FRIDAY_7_8';

export type Team = 'TWO_A' | 'THREE_B';

export type AgeGroup = 'KIDS' | 'SENIORS' | 'RETIRED';

export interface Member {
  id: string;
  name: string;
  surname: string;
  phoneNumbers: string[];
  type: MemberType;
  academyGroups: AcademyGroup[];
  team: Team | null;
  idNumber: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  dateOfBirth: string | null;
  email: string | null;
  memberSince: string | null;
  age: number | null;
  ageGroup: AgeGroup | null;
}

export interface Departure {
  id: string;
  memberId: string;
  name: string;
  surname: string;
  phoneNumbers: string[];
  type: MemberType;
  departureDate: string;
  academyGroups: AcademyGroup[];
  team: Team | null;
  idNumber: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  dateOfBirth: string | null;
  email: string | null;
  memberSince: string | null;
  age: number | null;
  ageGroup: AgeGroup | null;
}

export interface MemberRequest {
  name: string;
  surname: string;
  phoneNumbers: string[];
  type: MemberType;
  academyGroups?: AcademyGroup[];
  team?: Team;
  idNumber?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  dateOfBirth?: string;
  email?: string;
  memberSince?: string;
}

export interface MembersPage {
  content: Member[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface MemberSearchParams {
  type?: MemberType;
  page?: number;
  size?: number;
}

export interface MemberFilters {
  searchText?: string;
  academyGroup?: AcademyGroup;
  team?: Team;
}

export interface MemberError {
  code: string;
  description: string;
}

// API functions

export async function registerMember(memberId: string, body: MemberRequest): Promise<void> {
  const url = `${API_BASE_URL}/members/${memberId}`;

  const response = await fetch(url, {
    ...API_CONFIG.defaultOptions,
    method: 'POST',
    headers: API_CONFIG.headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let details;
    try {
      details = await response.json();
    } catch {
      // Ignore JSON parsing errors
    }
    throw ApiError.fromResponse(response, details);
  }
}

export async function updateMember(memberId: string, body: MemberRequest): Promise<void> {
  const url = `${API_BASE_URL}/members/${memberId}`;

  const response = await fetch(url, {
    ...API_CONFIG.defaultOptions,
    method: 'PUT',
    headers: API_CONFIG.headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let details;
    try {
      details = await response.json();
    } catch {
      // Ignore JSON parsing errors
    }
    throw ApiError.fromResponse(response, details);
  }
}

export async function deleteMember(memberId: string): Promise<void> {
  const url = `${API_BASE_URL}/members/${memberId}`;

  const response = await fetch(url, {
    ...API_CONFIG.defaultOptions,
    method: 'DELETE',
    headers: API_CONFIG.headers,
  });

  if (!response.ok) {
    let details;
    try {
      details = await response.json();
    } catch {
      // Ignore JSON parsing errors
    }
    throw ApiError.fromResponse(response, details);
  }
}

export async function searchMembers(params: MemberSearchParams = {}): Promise<MembersPage> {
  const searchParams = new URLSearchParams();

  if (params.type) searchParams.set('type', params.type);
  if (params.page !== undefined) searchParams.set('page', String(params.page));
  if (params.size !== undefined) searchParams.set('size', String(params.size));

  const query = searchParams.toString();
  const url = `${API_BASE_URL}/members${query ? `?${query}` : ''}`;

  const response = await fetch(url, {
    ...API_CONFIG.defaultOptions,
    method: 'GET',
    headers: API_CONFIG.headers,
  });

  if (!response.ok) {
    let details;
    try {
      details = await response.json();
    } catch {
      // Ignore JSON parsing errors
    }
    throw ApiError.fromResponse(response, details);
  }

  return response.json();
}

export function filterMembers(members: Member[], filters: MemberFilters = {}): Member[] {
  let results = members;

  if (filters.searchText?.trim()) {
    const lowerSearch = filters.searchText.toLowerCase().trim();
    results = results.filter(
      (member) =>
        member.name.toLowerCase().includes(lowerSearch) ||
        member.surname.toLowerCase().includes(lowerSearch)
    );
  }

  if (filters.academyGroup) {
    const academyGroup = filters.academyGroup;
    results = results.filter((member) => member.academyGroups.includes(academyGroup));
  }

  if (filters.team) {
    results = results.filter((member) => member.team === filters.team);
  }

  return results;
}

export async function getAllMembers(type?: MemberType): Promise<Member[]> {
  const firstPage = await searchMembers({ type, page: 0, size: 100 });

  if (firstPage.totalPages <= 1) {
    return firstPage.content;
  }

  const remainingPages = await Promise.all(
    Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
      searchMembers({ type, page: index + 1, size: 100 })
    )
  );

  return [firstPage, ...remainingPages].flatMap((page) => page.content);
}

export async function getDepartures(): Promise<Departure[]> {
  const url = `${API_BASE_URL}/departures`;

  const response = await fetch(url, {
    ...API_CONFIG.defaultOptions,
    method: 'GET',
    headers: API_CONFIG.headers,
  });

  if (!response.ok) {
    let details;
    try {
      details = await response.json();
    } catch {
      // Ignore JSON parsing errors
    }
    throw ApiError.fromResponse(response, details);
  }

  return response.json();
}
