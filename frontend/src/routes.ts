const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  APPLICATIONS: '/applications',
  APPLICATION_DETAIL: (id: string) => `/applications/${id}`,
  UPLOAD_FILE: (applicationId: string) => `/applications/${applicationId}/upload`,
  SETTINGS: '/settings',
  NOT_FOUND: '*'
};

export default ROUTES;