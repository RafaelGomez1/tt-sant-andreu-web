export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromResponse(response: Response, details?: unknown): ApiError {
    const message = this.getErrorMessage(response.status);
    return new ApiError(message, response.status, details);
  }

  private static getErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Petición inválida. Por favor, revisa los datos introducidos.';
      case 401:
        return 'No autorizado. Por favor, inicia sesión.';
      case 403:
        return 'Acceso denegado.';
      case 404:
        return 'Recurso no encontrado.';
      case 429:
        return 'Demasiadas peticiones. Por favor, inténtalo más tarde.';
      case 500:
        return 'Error del servidor. Por favor, inténtalo más tarde.';
      default:
        return 'No se ha podido conectar con el servidor. Comprueba tu conexión a internet.';
    }
  }
}