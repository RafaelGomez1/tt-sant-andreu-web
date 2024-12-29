import { useState } from 'react';
import { signIn } from '../services/api/auth';

export function useAuth() {
  const [accessKey, setAccessKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const key = await signIn(username, password);
      setAccessKey(key);
    } catch (err) {
      console.error('Login error:', err);
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAccessKey(null);
  };

  return {
    accessKey,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!accessKey
  };
}