import { API_BASE_URL, API_CONFIG } from './config';
import { ApiError } from './errors';

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let details;
    try {
      details = await response.json();
    } catch {
      // Ignore JSON parsing errors for error responses
    }
    throw ApiError.fromResponse(response, details);
  }

  return response.json();
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...API_CONFIG.defaultOptions,
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors
    throw new ApiError(
      'No se ha podido conectar con el servidor. Comprueba tu conexión a internet.',
      undefined,
      error
    );
  }
}