// Authentication utility functions

export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

export const setUserId = (userId) => {
  localStorage.setItem('userId', userId);
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};

export const setUserType = (userType) => {
  localStorage.setItem('userType', userType);
};

export const getUserType = () => {
  return localStorage.getItem('userType');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const logout = () => {
  removeAuthToken();
  localStorage.removeItem('userId');
  localStorage.removeItem('userType');
};
