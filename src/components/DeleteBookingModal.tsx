import React from 'react';
import { X } from 'lucide-react';
import { RegisteredPlayer } from '../services/api/types';

interface DeleteBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: RegisteredPlayer[];
  onDeleteBooking: (playerName: string) => void;
}

export function DeleteBookingModal({
  isOpen,
  onClose,
  players,
  onDeleteBooking,
}: DeleteBookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75" 
          onClick={onClose} 
        />

        <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white dark:bg-gray-800 rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                Selecciona jugador a eliminar
              </h3>
              <div className="mt-4">
                <div className="space-y-2">
                  {players.map((player, index) => (
                    <button
                      key={`${player.name}-${index}`}
                      onClick={() => {
                        onDeleteBooking(player.name);
                        onClose();
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      {player.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}