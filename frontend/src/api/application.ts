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
  if (!response.ok) {
    throw new Error('Failed to fetch status');
  }
  return response.json();
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
  if (!response.ok) {
    throw new Error('Upload failed');
  }
  return response.json();
};

export { APPLICATION_STATUS, getStatus, uploadDocument };