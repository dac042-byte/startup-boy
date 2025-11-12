import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);

// Profile
export const getProfile = (userId) => api.get(`/profile/${userId}`);
export const updateProfile = (userId, profileData) => api.put(`/profile/${userId}`, profileData);
export const uploadImage = (imageData) => api.post('/profile/upload-image', imageData);

// Discover/Swipe
export const getDiscoverCandidates = () => api.get('/discover');
export const recordSwipe = (swipeData) => api.post('/swipe', swipeData);

// Matches
export const getMatches = () => api.get('/matches');

// Messages
export const getMessages = (matchId) => api.get(`/messages/${matchId}`);
export const sendMessage = (matchId, messageData) => api.post(`/messages/${matchId}`, messageData);

// Ratings
export const rateUser = (userId, ratingData) => api.post(`/rate/${userId}`, ratingData);

// Settings
export const getSettings = () => api.get('/settings');
export const updateSettings = (settingsData) => api.put('/settings', settingsData);
export const deleteAccount = () => api.delete('/settings/delete-account');

// Premium
export const upgradeToPremium = () => api.post('/premium/upgrade');

export default api;
