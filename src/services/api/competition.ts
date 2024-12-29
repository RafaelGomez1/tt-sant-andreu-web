import { apiRequest } from './client';
import { LEAGUE_DISPLAY_TO_API } from '../../data/leagues';
import type { LeagueId } from '../../data/leagues';
import type { ClubCalendar } from './types';

export async function getClubsByLeague(leagueId: LeagueId): Promise<string[]> {
  try {
    const apiLeagueName = LEAGUE_DISPLAY_TO_API[leagueId];
    const response = await apiRequest<{ clubs: string[] }>(`/clubs?league=${apiLeagueName}`);
    return response.clubs;
  } catch (error) {
    console.error('Error fetching clubs:', error);
    throw error;
  }
}

export async function getLeagueRankings(leagueId: LeagueId, club: string): Promise<any> {
  try {
    const apiLeagueName = LEAGUE_DISPLAY_TO_API[leagueId];
    return await apiRequest(`/rankings?league=${apiLeagueName}&club=${encodeURIComponent(club)}`);
  } catch (error) {
    console.error('Error fetching rankings:', error);
    throw error;
  }
}

export async function getClubCalendar(leagueId: LeagueId, club: string): Promise<ClubCalendar> {
  try {
    const apiLeagueName = LEAGUE_DISPLAY_TO_API[leagueId];
    return await apiRequest<ClubCalendar>(`/club-calendar?league=${apiLeagueName}&club=${encodeURIComponent(club)}`);
  } catch (error) {
    console.error('Error fetching club calendar:', error);
    throw error;
  }
}