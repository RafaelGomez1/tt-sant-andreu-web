import { apiRequest } from './client';
import type { Agenda } from './types';

export async function getAgendas(week: number, year: number): Promise<Agenda[]> {
  try {
    return await apiRequest<Agenda[]>(`/agendas?week=${week}&year=${year}`);
  } catch (error) {
    console.error('Error fetching agendas:', error);
    throw error;
  }
}

export async function addBooking(
  agendaId: string,
  hourId: string,
  playerName: string
): Promise<void> {
  try {
    await apiRequest(`/agendas/${agendaId}/hours/${hourId}`, {
      method: 'POST',
      body: { playerName },
    });
  } catch (error) {
    console.error('Error adding booking:', error);
    throw error;
  }
}

export async function deleteBooking(
  agendaId: string,
  hourId: string,
  playerName: string
): Promise<void> {
  try {
    await apiRequest(`/agendas/${agendaId}/hours/${hourId}`, {
      method: 'PATCH',
      body: { playerName },
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
}