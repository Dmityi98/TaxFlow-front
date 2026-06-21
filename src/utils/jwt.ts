export function getUserIdFromToken(): string | null {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid JWT format');
      return null;
    }

    const payload = parts[1];
    
    // Безопасное декодирование base64 (работает с UTF-8)
    const decoded = JSON.parse(
      decodeURIComponent(
        atob(payload)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
    );

    // Проверка истечения токена
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      console.warn('Token expired');
      return null;
    }

    // Стандартные имена claims в .NET JWT
    return (
      decoded.sub || // Subject (стандартный claim для userId)
      decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || // .NET NameIdentifier
      decoded['http://schemas.microsoft.com/identity/claims/objectidentifier'] || // Azure AD
      decoded.userId || // Кастомный claim
      null
    );
  } catch (error) {
    console.error('Failed to parse JWT:', error);
    return null;
  }
}