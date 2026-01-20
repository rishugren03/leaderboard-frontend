import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { LeaderboardEntry } from '../types';
import { Colors, Shadows } from '../constants/Theme';
import { Crown, Swords, Shield } from 'lucide-react-native';

interface Props {
  item: LeaderboardEntry;
}

export const LeaderboardItem = ({ item }: Props) => {
  const isTop3 = item.rank <= 3;
  
  let rankColor = Colors.textMuted;
  let glowStyle = {};
  let RankIcon = null;

  if (item.rank === 1) {
    rankColor = Colors.gold;
    glowStyle = { textShadowColor: Colors.gold, textShadowRadius: 10, textShadowOffset: { width: 0, height: 0 } };
    RankIcon = Crown;
  } else if (item.rank === 2) {
    rankColor = Colors.silver;
    glowStyle = { textShadowColor: Colors.silver, textShadowRadius: 8, textShadowOffset: { width: 0, height: 0 } };
    RankIcon = Swords;
  } else if (item.rank === 3) {
    rankColor = Colors.bronze;
    glowStyle = { textShadowColor: Colors.bronze, textShadowRadius: 8, textShadowOffset: { width: 0, height: 0 } };
    RankIcon = Shield;
  }

  return (
    <View style={[styles.container, isTop3 && styles.top3Container]}>
      <View style={[styles.rankBadge, { borderColor: rankColor }]}>
        <Text style={[styles.rank, { color: rankColor }, glowStyle]}>#{item.rank}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.username} numberOfLines={1}>{item.username}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Text style={styles.pointsValue}>{item.rating} pts</Text>
        </View>
      </View>
      <View style={styles.scoreContainer}>
        {isTop3 && RankIcon && (
          <View style={{ shadowColor: rankColor, shadowRadius: 10, shadowOpacity: 0.8, elevation: 5 }}>
            <RankIcon color={rankColor} size={24} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: Colors.surface,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    marginHorizontal: Platform.OS === 'web' ? 0 : 10,
  },
  top3Container: {
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceLight,
    ...Shadows.card,
  },
  rankBadge: {
    minWidth: 40,
    height: 40,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderRadius: 20,
    borderWidth: 0,
  },
  rank: {
    fontSize: 18,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  info: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  pointsValue: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: 'bold',
    marginLeft: 0,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    textShadowColor: Colors.primary,
    textShadowRadius: 5,
    textShadowOffset: { width: 0, height: 0 },
  },
});
