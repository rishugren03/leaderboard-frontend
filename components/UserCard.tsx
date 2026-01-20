import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SearchResult } from '../types';
import { Colors, Shadows } from '../constants/Theme';
import { Crown, Swords, Shield } from 'lucide-react-native';

export const UserCard = ({ user }: { user: SearchResult }) => {
  const isTop3 = user.globalRank <= 3;
  let rankColor = Colors.primary; // Default highlight
  let RankIcon = null;
  let glowStyle = {};
  
  // "Normal" users shouldn't have glowing rank unless top 3 special logic is desired,
  // but user said "highlighted too", so we check ranks.
  if (user.globalRank === 1) {
    rankColor = Colors.gold;
    RankIcon = Crown;
    glowStyle = { shadowColor: Colors.gold, shadowRadius: 10, shadowOpacity: 0.5, elevation: 5 };
  } else if (user.globalRank === 2) {
    rankColor = Colors.silver;
    RankIcon = Swords;
    glowStyle = { shadowColor: Colors.silver, shadowRadius: 8, shadowOpacity: 0.5, elevation: 5 };
  } else if (user.globalRank === 3) {
    rankColor = Colors.bronze;
    RankIcon = Shield;
    glowStyle = { shadowColor: Colors.bronze, shadowRadius: 8, shadowOpacity: 0.5, elevation: 5 };
  }

  const containerStyle = isTop3 
    ? { borderColor: rankColor, backgroundColor: Colors.surfaceLight, ...glowStyle }
    : { borderColor: Colors.border };

  const rankTextStyle = isTop3 ? { color: rankColor } : { color: Colors.primary };

  return (
  <View style={[styles.card, containerStyle]}>
    <View style={styles.rankContainer}>
      <Text style={styles.rankLabel}>RANK</Text>
      <Text style={[styles.rank, rankTextStyle]}>#{user.globalRank}</Text>
    </View>
    <View style={styles.info}>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.rating}>{user.rating} <Text style={styles.pts}>PTS</Text></Text>
    </View>
    <View style={styles.iconContainer}>
      {isTop3 && RankIcon ? (
         <RankIcon color={rankColor} size={24} />
      ) : (
         <View style={styles.circle} />
      )}
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  rankContainer: {
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 60,
  },
  rankLabel: { 
    color: Colors.textMuted, 
    fontSize: 10, 
    fontWeight: 'bold', 
    letterSpacing: 1,
    marginBottom: 4,
  },
  rank: { 
    color: Colors.primary, 
    fontSize: 20, 
    fontWeight: '900',
    fontStyle: 'italic',
    textShadowColor: Colors.primary,
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 0 },
  },
  info: { flex: 1 },
  username: { 
    color: Colors.text, 
    fontSize: 18, 
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rating: { 
    color: Colors.secondary, 
    fontSize: 16, 
    fontWeight: 'bold', 
  },
  pts: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  }
});
