import { apiRequest } from './client';

interface AgendaResponse {
  enabled: boolean;
}

export async function disableAgenda(accessKey: string, agendaId: string): Promise<AgendaResponse> {
  return await apiRequest<AgendaResponse>(`/agendas/${agendaId}/disable?accessKey=${accessKey}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export async function enableAgenda(accessKey: string, agendaId: string): Promise<AgendaResponse> {
  return await apiRequest<AgendaResponse>(`/agendas/${agendaId}/reenable?accessKey=${accessKey}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}