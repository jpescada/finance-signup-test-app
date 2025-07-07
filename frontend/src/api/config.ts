const BASE = 'http://localhost:8000';
const API_BASE = `${BASE}/api`;

const API_ENDPOINTS = {
  CSRF: `${API_BASE}/csrf/`,
  SIGNUP: `${API_BASE}/signup/`,
  LOGIN: `${API_BASE}/login/`,
  LOGOUT: `${API_BASE}/logout/`,
  STATUS: `${API_BASE}/status/`,
  UPLOAD: `${API_BASE}/upload/`,
};

function getCsrfToken() {
  const cookie = document.cookie.split(';').find(c => c.trim().startsWith('csrftoken'));
  return cookie ? cookie.split('=')[1] : null;
}

const fetchCsrfToken = async () => {
  await fetch(API_ENDPOINTS.CSRF, {
    method: 'GET', 
    credentials: 'include'
  });
  
  return getCsrfToken();
};

export {
  BASE, 
  API_BASE, 
  API_ENDPOINTS, 
  getCsrfToken, 
  fetchCsrfToken 
};