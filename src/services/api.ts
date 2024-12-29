import { API_BASE_URL } from './config';

export interface Agenda {
  id: string;
  week: number;
  year: number;
  hours: Hour[];
}

export interface Hour {
  id: string;
  startTime: string;
  endTime: string;
  players: string[];
}

export const getAgendas = async (week: number, year: number): Promise<Agenda[]> => {
  const response = await fetch(`${API_BASE_URL}/agendas?week=${week}&year=${year}`);
  if (!response.ok) {
    throw new Error('Failed to fetch agendas');
  }
  return response.json();
};

export const addBooking = async (agendaId: string, hourId: string, playerName: string): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/agendas/${agendaId}/hours/${hourId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerName }),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to add booking');
  }
};

export const deleteBooking = async (agendaId: string, hourId: string, playerName: string): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/agendas/${agendaId}/hours/${hourId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerName }),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to delete booking');
  }
};