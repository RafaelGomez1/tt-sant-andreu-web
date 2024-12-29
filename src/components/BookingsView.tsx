import React, { useState } from 'react';
import { BookingTable } from './BookingTable';
import { DeleteBookingModal } from './DeleteBookingModal';
import { AddBookingModal } from './AddBookingModal';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { ErrorAlert } from './ui/ErrorAlert';
import { useAgendas } from '../hooks/useAgendas';
import { addBooking, deleteBooking } from '../services/api/bookings';

export function BookingsView() {
  const { agendas, loading, error, refreshAgendas } = useAgendas();
  const [selectedSlot, setSelectedSlot] = useState<{ agendaId: string; hourId: string } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddBooking = async (playerName: string) => {
    if (!selectedSlot) return;

    try {
      await addBooking(selectedSlot.agendaId, selectedSlot.hourId, playerName);
      await refreshAgendas();
      setErrorMessage(null);
    } catch (err) {
      console.error('Error adding booking:', err);
      setErrorMessage('No se ha podido añadir la reserva. Por favor, inténtalo de nuevo.');
    }
  };

  const handleDeleteBooking = async (playerName: string) => {
    if (!selectedSlot) return;

    try {
      await deleteBooking(selectedSlot.agendaId, selectedSlot.hourId, playerName);
      await refreshAgendas();
      setErrorMessage(null);
    } catch (err) {
      console.error('Error deleting booking:', err);
      setErrorMessage('No se ha podido eliminar la reserva. Por favor, inténtalo de nuevo.');
    }
  };

  const openAddModal = (agendaId: string, hourId: string) => {
    setSelectedSlot({ agendaId, hourId });
    setIsAddModalOpen(true);
  };

  const openDeleteModal = (agendaId: string, hourId: string) => {
    setSelectedSlot({ agendaId, hourId });
    setIsDeleteModalOpen(true);
  };

  if (loading) {
    return <LoadingSpinner message="Cargando reservas..." />;
  }

  return (
    <div className="space-y-8">
      {(error || errorMessage) && <ErrorAlert message={error || errorMessage || ''} />}

      {Array.isArray(agendas) && agendas.map((agenda) => (
        <BookingTable
          key={agenda.id}
          agenda={agenda}
          onAddBooking={openAddModal}
          onDeleteBooking={openDeleteModal}
        />
      ))}

      <AddBookingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBooking={handleAddBooking}
      />

      <DeleteBookingModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        players={selectedSlot ? agendas
          .find(a => a.id === selectedSlot.agendaId)
          ?.availableHours.find(h => h.id === selectedSlot.hourId)
          ?.registeredPlayers || [] : []}
        onDeleteBooking={handleDeleteBooking}
      />
    </div>
  );
}