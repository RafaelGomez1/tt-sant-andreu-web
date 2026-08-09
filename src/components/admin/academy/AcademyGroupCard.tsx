import React from 'react';
import { Member, AcademyGroup } from '../../../services/api/members';
import { getMaxCapacity, getSlotDisplayName } from '../../../utils/academyUtils';

interface AcademyGroupCardProps {
  group: AcademyGroup | 'INTERMEDIATE_FRIDAY_6_8';
  members: Member[];
  academyType: 'ACADEMY_BEGINNER' | 'ACADEMY_INTERMEDIATE';
}

export function AcademyGroupCard({ group, members, academyType }: AcademyGroupCardProps) {
  const maxCapacity = getMaxCapacity(group, academyType);
  const currentCount = members.length;
  const isFull = currentCount >= maxCapacity;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {getSlotDisplayName(group)}
          </h3>
          <div className={`text-sm font-medium px-3 py-1 rounded-full ${
            isFull 
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          }`}>
            {currentCount} / {maxCapacity}
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        {members.length > 0 ? (
          <ul className="space-y-2">
            {members.map((member) => (
              <li 
                key={member.id}
                className="text-gray-700 dark:text-gray-300 py-1 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                {member.name} {member.surname}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">No members in this slot</p>
        )}
      </div>
    </div>
  );
}
