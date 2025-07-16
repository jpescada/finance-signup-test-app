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

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson?.detail || responseJson?.error || 'Sign-up failed');
  }

  return responseJson;
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

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson?.detail || responseJson?.error || 'Login failed');
  }

  return responseJson;
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

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson?.detail || responseJson?.error || 'Logout failed');
  }

  return responseJson;
};

export { login, logout, signup };