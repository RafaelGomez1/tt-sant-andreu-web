import { apiRequest } from './client';

interface SignInResponse {
  accessKey: string;
}

export async function signIn(username: string, password: string): Promise<string> {
  const credentials = btoa(`${username}:${password}`);
  
  const response = await apiRequest<SignInResponse>('/admins/sign-in', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    }
  });

  return response.accessKey;
}

export function getAuthHeader(accessKey: string): Record<string, string> {
  return {
    'Authorization': `Bearer ${accessKey}`
  };
}