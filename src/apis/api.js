import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const TOKEN_STORAGE_KEY = '@google_meet_cost_token';

const API = axios.create({
  baseURL: 'https://google-meet-cost-server.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

API.setAuthToken = async token => {
  if (token) {
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
    API.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  delete API.defaults.headers.common.Authorization;
};

API.clearAuthToken = () => API.setAuthToken(null);

export default API;
