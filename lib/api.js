import axios from 'axios';

const BASE_URL = 'https://mock-backend-hintro.vercel.app';

const headers = (userId) => ({ 'x-user-id': userId });

export const fetchProfile = (userId) =>
  axios.get(`${BASE_URL}/api/auth/profile`, { headers: headers(userId) });

export const fetchDashboard = (userId) =>
  axios.get(`${BASE_URL}/api/auth/dashboard`, { headers: headers(userId) });

export const fetchCallStats = (userId) =>
  axios.get(`${BASE_URL}/api/call-sessions/stats`, { headers: headers(userId) });

export const fetchCallHistory = (userId, limit = 10) =>
  axios.get(`${BASE_URL}/api/call-sessions?limit=${limit}`, {
    headers: headers(userId),
  });
