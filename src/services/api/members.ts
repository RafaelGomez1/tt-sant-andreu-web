import { API_BASE_URL, API_CONFIG } from './config';
import { ApiError } from './errors';

// Types

export type MemberType = 'CASUAL' | 'ACADEMY_BEGINNER' | 'ACADEMY_INTERMEDIATE' | 'COMPETITION';

export type AcademyGroup = 'MONDAY_6_7' | 'MONDAY_7_8' | 'WEDNESDAY_6_7' | 'WEDNESDAY_7_8';

export type Team = 'TWO_A' | 'THREE_B';

export interface Member {
  id: string;
  name: string;
  surname: string;
  phoneNumbers: string[];
  type: MemberType;
  academyGroup: AcademyGroup | null;
  team: Team | null;
}

export interface MemberRequest {
  name: string;
  surname: string;
  phoneNumbers: string[];
  type: MemberType;
  academyGroup?: AcademyGroup;
  team?: Team;
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
