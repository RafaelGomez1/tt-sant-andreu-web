import React from 'react';
import { LoginForm } from './LoginForm';
import { AdminDashboard } from './AdminDashboard';
import { useAuth } from '../../hooks/useAuth';

export function AdminView() {
  const { accessKey, login, logout, loading, error } = useAuth();

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

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <button
          onClick={logout}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cerrar sesión
        </button>
      </div>
      <AdminDashboard accessKey={accessKey} />
    </div>
  );
}