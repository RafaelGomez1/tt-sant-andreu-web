import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Member, MemberType, AcademyGroup, Team, MemberRequest, updateMember } from '../../../services/api/members';

interface UpdateMemberModalProps {
  member: Member;
  onClose: () => void;
  onUpdated: () => void;
}

const MEMBER_TYPE_LABELS: Record<MemberType, string> = {
  CASUAL: 'Casual',
  ACADEMY_BEGINNER: 'Iniciación',
  ACADEMY_INTERMEDIATE: 'Tecnificación',
  COMPETITION: 'Federado',
};

const ACADEMY_GROUP_LABELS: Record<AcademyGroup, string> = {
  MONDAY_6_7: 'Lunes 18-19h',
  MONDAY_7_8: 'Lunes 19-20h',
  WEDNESDAY_6_7: 'Miércoles 18-19h',
  WEDNESDAY_7_8: 'Miércoles 19-20h',
};

const TEAM_LABELS: Record<Team, string> = {
  TWO_A: '2a A',
  THREE_B: '3a B',
};

export function UpdateMemberModal({ member, onClose, onUpdated }: UpdateMemberModalProps) {
  const [name, setName] = useState(member.name);
  const [surname, setSurname] = useState(member.surname);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(
    Array.isArray(member.phoneNumbers) && member.phoneNumbers.length > 0
      ? member.phoneNumbers.map((p) => {
          const digits = p.replace(/\D/g, '').slice(0, 9);
          const parts = [digits.slice(0, 3), digits.slice(3, 5), digits.slice(5, 7), digits.slice(7, 9)];
          return parts.filter(Boolean).join(' ');
        })
      : ['']
  );
  const [type, setType] = useState<MemberType>(member.type);
  const [academyGroup, setAcademyGroup] = useState<AcademyGroup | ''>(member.academyGroup ?? '');
  const [team, setTeam] = useState<Team | ''>(member.team ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAcademyBeginnerType = type === 'ACADEMY_BEGINNER';
  const isCompetitionType = type === 'COMPETITION';

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 9);
    const parts = [digits.slice(0, 3), digits.slice(3, 5), digits.slice(5, 7), digits.slice(7, 9)];
    return parts.filter(Boolean).join(' ');
  };

  const handleAddPhone = () => {
    setPhoneNumbers([...phoneNumbers, '']);
  };

  const handleRemovePhone = (index: number) => {
    setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
  };

  const handlePhoneChange = (index: number, value: string) => {
    const updated = [...phoneNumbers];
    updated[index] = formatPhone(value);
    setPhoneNumbers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const filteredPhones = phoneNumbers
      .filter((p) => p.trim() !== '');

    const body: MemberRequest = {
      name: name.trim(),
      surname: surname.trim(),
      phoneNumbers: filteredPhones,
      type,
      ...(isAcademyBeginnerType && academyGroup ? { academyGroup: academyGroup as AcademyGroup } : {}),
      ...(isCompetitionType && team ? { team: team as Team } : {}),
    };

    try {
      setLoading(true);
      await updateMember(member.id, body);
      onUpdated();
    } catch (err) {
      console.error('Error updating member:', err);
      setError('Error al actualizar el socio. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Editar Socio
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-3">
              <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Apellido *
            </label>
            <input
              type="text"
              required
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Teléfono(s)
            </label>
            <div className="space-y-2">
              {phoneNumbers.map((phone, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                    placeholder="Número de teléfono"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  />
                  {phoneNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePhone(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddPhone}
                className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                + Añadir teléfono
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tipo de socio *
            </label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value as MemberType);
                setAcademyGroup('');
                setTeam('');
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            >
              {Object.entries(MEMBER_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {isAcademyBeginnerType && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Grupo de academia
              </label>
              <select
                value={academyGroup}
                onChange={(e) => setAcademyGroup(e.target.value as AcademyGroup | '')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Seleccionar grupo</option>
                {Object.entries(ACADEMY_GROUP_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {isCompetitionType && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Equipo
              </label>
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value as Team | '')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Seleccionar equipo</option>
                {Object.entries(TEAM_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
