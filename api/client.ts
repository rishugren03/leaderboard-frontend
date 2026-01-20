import axios from 'axios';
import { Platform } from 'react-native';
import { LeaderboardEntry, SearchResult } from '../types';

import Constants from 'expo-constants';

const getBaseUrl = () => {
  if (Platform.OS === 'web') return 'http://localhost:8080/api';
  
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(':')[0];
    return `http://${ip}:8080/api`;
  }
  
  return 'http://10.0.2.2:8080/api';
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
});

export const getLeaderboard = async (limit = 50, offset = 0): Promise<{ data: LeaderboardEntry[]; hasMore: boolean; total: number }> => {
  const response = await api.get(`/leaderboard?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const searchUsers = async (query: string): Promise<{ data: SearchResult[]; count: number }> => {
  const response = await api.get(`/search?q=${query}`);
  return response.data;
};
