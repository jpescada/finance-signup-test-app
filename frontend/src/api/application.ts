import { API_ENDPOINTS, fetchCsrfToken, getCsrfToken } from './config';

const APPLICATION_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PUSHBACK: 'PUSHBACK',
};

const getStatus = async () => {
  const response = await fetch(API_ENDPOINTS.STATUS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCsrfToken() || '',
    },
    credentials: 'include',
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson?.error || 'Failed to fetch status');
  }
  return responseJson;
};

const uploadDocument = async (data: FormData) => {
  await fetchCsrfToken();
  const response = await fetch(API_ENDPOINTS.UPLOAD, {
    method: 'POST',
    body: data,
    headers: {
      'X-CSRFToken': getCsrfToken() || '',
    },
    credentials: 'include',
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson?.error || 'Upload failed');
  }
  return responseJson;
};

export { APPLICATION_STATUS, getStatus, uploadDocument };