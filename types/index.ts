export interface User {
  id: number;
  username: string;
  rating: number;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  rating: number;
  id: number;
}

export interface SearchResult {
  globalRank: number;
  username: string;
  rating: number;
  id: number;
}
