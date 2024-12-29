import React from 'react';
import { AgendaItem } from './AgendaItem';
import type { Agenda } from '../../services/api/types';

interface AgendaListProps {
  agendas: Agenda[];
  onToggleAgenda: (agendaId: string, isEnabled: boolean) => Promise<void>;
  actionLoading: string | null;
}

export function AgendaList({ agendas, onToggleAgenda, actionLoading }: AgendaListProps) {
  return (
    <div className="space-y-4">
      {agendas.map((agenda) => (
        <AgendaItem
          key={agenda.id}
          agenda={agenda}
          onToggleAgenda={onToggleAgenda}
          isLoading={actionLoading === agenda.id}
        />
      ))}
    </div>
  );
}