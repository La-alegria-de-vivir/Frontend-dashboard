

// Función para guardar el token JWT en el almacenamiento local
export const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('jwtToken', token);
  };
  
  // Función para obtener el token JWT del almacenamiento local
  export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('jwtToken');
  };
  
  // Función para realizar una solicitud con el token JWT en el encabezado de autorización
  export const fetchWithAuthorization = async (url, options = {}) => {
    const token = getTokenFromLocalStorage();
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
    return fetch(url, { ...options, headers });
  };
  