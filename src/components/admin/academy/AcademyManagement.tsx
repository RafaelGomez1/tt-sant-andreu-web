import React, { useState, useEffect } from 'react';
import { searchMembers, Member, AcademyGroup } from '../../../services/api/members';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorAlert } from '../../ui/ErrorAlert';
import { AcademyGroupCard } from './AcademyGroupCard';
import { getAcademySlots } from '../../../utils/academyUtils';

type AcademyType = 'ACADEMY_BEGINNER' | 'ACADEMY_INTERMEDIATE';
type GroupKey = AcademyGroup | 'INTERMEDIATE_FRIDAY_6_8';

export function AcademyManagement() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AcademyType>('ACADEMY_BEGINNER');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null);

        const beginnerResponse = await searchMembers({ type: 'ACADEMY_BEGINNER', size: 1000 });
        const intermediateResponse = await searchMembers({ type: 'ACADEMY_INTERMEDIATE', size: 1000 });

        const allMembers = [...beginnerResponse.content, ...intermediateResponse.content];
        setMembers(allMembers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load academy members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  // Filter members by active tab
  const filteredMembers = members.filter(m => m.type === activeTab);

  // Get slots for the active academy type
  const slots = getAcademySlots(activeTab);

  // Group members by academy slot
  const groupedBySlot = new Map<GroupKey, Member[]>();
  slots.forEach(slot => {
    groupedBySlot.set(slot.group as GroupKey, []);
  });

  if (activeTab === 'ACADEMY_INTERMEDIATE') {
    // For intermediate, all members go to Friday 6-8 regardless of academyGroups
    groupedBySlot.set('INTERMEDIATE_FRIDAY_6_8', filteredMembers);
  } else {
    // For beginners, group by academyGroups
    filteredMembers.forEach(member => {
      if (member.academyGroups && Array.isArray(member.academyGroups)) {
        member.academyGroups.forEach(group => {
          if (groupedBySlot.has(group)) {
            groupedBySlot.get(group)!.push(member);
          }
        });
      }
    });
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Academia Infantil
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 justify-center">
        <button
          onClick={() => setActiveTab('ACADEMY_BEGINNER')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'ACADEMY_BEGINNER'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Iniciación ({members.filter(m => m.type === 'ACADEMY_BEGINNER').length})
        </button>
        <button
          onClick={() => setActiveTab('ACADEMY_INTERMEDIATE')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'ACADEMY_INTERMEDIATE'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Tecnificación ({members.filter(m => m.type === 'ACADEMY_INTERMEDIATE').length})
        </button>
      </div>

      {/* Academy slots grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slots.map(slot => (
          <AcademyGroupCard
            key={slot.group}
            group={slot.group as GroupKey}
            members={groupedBySlot.get(slot.group as GroupKey) || []}
            academyType={activeTab}
          />
        ))}
      </div>
    </div>
  );
}
