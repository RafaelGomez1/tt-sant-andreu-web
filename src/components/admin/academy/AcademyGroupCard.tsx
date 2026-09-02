import React, { useState } from 'react';
import { Member, AcademyGroup } from '../../../services/api/members';
import { getMaxCapacity, getSlotDisplayName } from '../../../utils/academyUtils';
import { downloadAcademyAssistanceDocument } from '../../../utils/academyAssistanceDocument';

interface AcademyGroupCardProps {
  group: AcademyGroup | 'INTERMEDIATE_FRIDAY_6_8';
  members: Member[];
  academyType: 'ACADEMY_BEGINNER' | 'ACADEMY_INTERMEDIATE';
}

export function AcademyGroupCard({ group, members, academyType }: AcademyGroupCardProps) {
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const maxCapacity = getMaxCapacity(group, academyType);
  const currentCount = members.length;
  const isFull = currentCount >= maxCapacity;

  // Split members into 2 columns
  const columnSize = Math.ceil(maxCapacity / 2);
  const column1 = members.slice(0, columnSize);
  const column2 = members.slice(columnSize);

  const handleDownloadAssistanceDocument = () => {
    try {
      setDownloadError(null);
      downloadAcademyAssistanceDocument({ academyType, group, members });
    } catch (error) {
      console.error('Error generating academy assistance document:', error);
      setDownloadError('No se pudo generar el documento de asistencia.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {getSlotDisplayName(group)}
          </h3>
          <div className="flex flex-col items-end gap-2">
            <div className={`text-sm font-medium px-3 py-1 rounded-full ${
              isFull
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}>
              {currentCount} / {maxCapacity}
            </div>
            <button
              onClick={handleDownloadAssistanceDocument}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Generar asistencia
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        {members.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {/* Column 1 */}
            <ul className="space-y-2">
              {column1.map((member) => (
                <li 
                  key={member.id}
                  className="text-sm text-gray-700 dark:text-gray-300 text-justify"
                >
                  {member.name} {member.surname}
                </li>
              ))}
            </ul>
            {/* Column 2 */}
            <ul className="space-y-2">
              {column2.map((member) => (
                <li 
                  key={member.id}
                  className="text-sm text-gray-700 dark:text-gray-300 text-justify"
                >
                  {member.name} {member.surname}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">No members in this slot</p>
        )}
        {downloadError && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">{downloadError}</p>
        )}
      </div>
    </div>
  );
}
