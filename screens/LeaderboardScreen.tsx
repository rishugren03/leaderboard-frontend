import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getLeaderboard } from '../api/client';
import { LeaderboardEntry } from '../types';
import { LeaderboardItem } from '../components/LeaderboardItem';
import { Colors, Layout } from '../constants/Theme';

export default function LeaderboardScreen() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    
    // Only show loading indicator if not refreshing
    if (!reset) setLoading(true);

    try {
      const currentOffset = reset ? 0 : offset;
      const response = await getLeaderboard(50, currentOffset);
      
      if (reset) {
        setData(response.data);
        setOffset(response.data.length);
      } else {
        setData(prev => {
          const existingIds = new Set(prev.map(u => u.id));
          const newUniqueUsers = response.data.filter(u => !existingIds.has(u.id));
          return [...prev, ...newUniqueUsers];
        });
        setOffset(prev => prev + response.data.length);
      }
      setHasMore(response.hasMore);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers(true);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUsers(true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchUsers();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.centerContent}>
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>GLOBAL RANKING</Text>
          <Text style={styles.title}>LEADERBOARD</Text>
        </View>
        <FlatList
          ListHeaderComponent={
            <View style={styles.columnHeader}>
              <Text style={styles.columnRank}>RANK</Text>
              <Text style={styles.columnUser}>USERNAME</Text>
            </View>
          }
          data={data}
          renderItem={({ item }) => <LeaderboardItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={loading ? <ActivityIndicator color={Colors.primary} style={{ margin: 20 }} /> : null}
          contentContainerStyle={styles.list}
          style={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center', // Center for web
  },
  centerContent: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? Layout.maxWidth : '100%',
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 10,
  },
  headerSubtitle: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.text,
    fontStyle: 'italic',
    textShadowColor: Colors.primary,
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 0 },
  },
  columnHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  columnRank: {
    width: 60,
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  columnUser: {
    flex: 1,
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  columnPoints: {
    width: 80,
    textAlign: 'right',
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  listContainer: {
    width: '100%',
  },
  list: {
    paddingBottom: 20,
    paddingHorizontal: Platform.OS === 'web' ? 0 : 0,
  }
});
