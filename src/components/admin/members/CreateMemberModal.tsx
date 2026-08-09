import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { MemberType, AcademyGroup, Team, MemberRequest, registerMember } from '../../../services/api/members';

interface CreateMemberModalProps {
  onClose: () => void;
  onCreated: () => void;
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
  FRIDAY_6_7: 'Viernes 18-19h',
  FRIDAY_7_8: 'Viernes 19-20h'
};

const TEAM_LABELS: Record<Team, string> = {
  TWO_A: '2a A',
  THREE_B: '3a B',
};

function generateId(): string {
  return crypto.randomUUID();
}

export function CreateMemberModal({ onClose, onCreated }: CreateMemberModalProps) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(['']);
  const [type, setType] = useState<MemberType>('CASUAL');
  const [academyGroups, setAcademyGroups] = useState<AcademyGroup[]>([]);
  const [team, setTeam] = useState<Team | ''>('');
  const [idNumber, setIdNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [memberSince, setMemberSince] = useState('');
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
      ...(isAcademyBeginnerType && academyGroups.length > 0 ? { academyGroups } : {}),
      ...(isCompetitionType && team ? { team: team as Team } : {}),
      ...(idNumber.trim() ? { idNumber: idNumber.trim() } : {}),
      ...(address.trim() ? { address: address.trim() } : {}),
      ...(city.trim() ? { city: city.trim() } : {}),
      ...(postalCode.trim() ? { postalCode: postalCode.trim() } : {}),
      ...(dateOfBirth ? { dateOfBirth } : {}),
      ...(email.trim() ? { email: email.trim() } : {}),
      ...(memberSince ? { memberSince } : {}),
    };

    try {
      setLoading(true);
      await registerMember(generateId(), body);
      onCreated();
    } catch (err) {
      console.error('Error creating member:', err);
      setError('Error al crear el socio. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md md:max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Nuevo Socio
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Left column — Personal info */}
            <div className="space-y-4">
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
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddPhone}
                    className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Añadir teléfono
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
                    setAcademyGroups([]);
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grupo(s) de academia
                  </label>
                  <div className="space-y-2">
                    {(Object.entries(ACADEMY_GROUP_LABELS) as [AcademyGroup, string][]).map(([value, label]) => (
                      <label key={value} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={academyGroups.includes(value)}
                          onChange={(e) => {
                            setAcademyGroups(
                              e.target.checked
                                ? [...academyGroups, value]
                                : academyGroups.filter((g) => g !== value)
                            );
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
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
            </div>

            {/* Right column — Extended info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  DNI / Documento
                </label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="12345678A"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle Mayor 10"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Madrid"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Código postal
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="28001"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Socio desde
                  </label>
                  <input
                    type="date"
                    value={memberSince}
                    onChange={(e) => setMemberSince(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

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
              {loading ? 'Creando...' : 'Crear socio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
