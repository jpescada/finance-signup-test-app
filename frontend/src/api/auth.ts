import { API_ENDPOINTS, fetchCsrfToken, getCsrfToken } from './config';

const signup = async (data: FormData) => {
  await fetchCsrfToken();
  const response = await fetch(API_ENDPOINTS.SIGNUP, {
    method: 'POST',
    body: data,
    headers: {
      'X-CSRFToken': getCsrfToken() || '',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Sign-up failed');
  }
  return response.json();
};

const login = async (name: string, password: string) => {
  await fetchCsrfToken();
  const response = await fetch(API_ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCsrfToken() || '',
    },
    body: JSON.stringify({ name, password }),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};

const logout = async () => {
  await fetchCsrfToken();
  const response = await fetch(API_ENDPOINTS.LOGOUT, {
    method: 'POST',
    headers: {
      'X-CSRFToken': getCsrfToken() || '',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Logout failed');
  }
  return response.json();
};

export { login, logout, signup };