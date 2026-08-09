import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { AdminDashboard } from './AdminDashboard';
import { AdminMenu, AdminSection } from './AdminMenu';
import { MembersManagement } from './members/MembersManagement';
import { AcademyManagement } from './academy/AcademyManagement';
import { useAuth } from '../../hooks/useAuth';

export function AdminView() {
  const { accessKey, login, logout, loading, error } = useAuth();
  const [section, setSection] = useState<AdminSection>('menu');

  // Force logout when component mounts
  React.useEffect(() => {
    logout();
  }, []);

  if (!accessKey) {
    return (
      <div className="max-w-2xl mx-auto">
        <LoginForm onSubmit={login} error={error} loading={loading} />
      </div>
    );
  }

  const handleBack = () => setSection('menu');

  return (
    <div>
      <div className="mb-6 flex justify-start">
        {section !== 'menu' && (
          <button
            onClick={handleBack}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver
          </button>
        )}
      </div>

      {section === 'menu' && <AdminMenu onNavigate={setSection} />}
      {section === 'bookings' && <AdminDashboard accessKey={accessKey} />}
      {section === 'members' && <MembersManagement />}
      {section === 'academy' && <AcademyManagement />}
    </div>
  );
}