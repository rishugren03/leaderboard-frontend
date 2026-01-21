import axios from 'axios';
import { LeaderboardEntry, SearchResult } from '../types';

const getBaseUrl = () => {
  return process.env.EXPO_BASE_URL || "https://leaderboard-backend-845642926246.asia-south1.run.app/api";
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
