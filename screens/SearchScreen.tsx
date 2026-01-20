import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchUsers } from '../api/client';
import { SearchResult } from '../types';
import { UserCard } from '../components/UserCard';
import { Colors, Layout } from '../constants/Theme';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length > 0) {
        setLoading(true);
        try {
          const response = await searchUsers(query);
          setResults(response.data);
        } catch (error) {
          console.error('Search failed:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.centerContent}>
        <View style={styles.header}>
          <Text style={styles.title}>SEARCH AGENT</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter codename..."
              placeholderTextColor={Colors.textMuted}
              value={query}
              onChangeText={setQuery}
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor={Colors.primary}
            />
            {loading && <ActivityIndicator color={Colors.primary} style={styles.loader} />}
          </View>
        </View>
        
        <FlatList
          data={results}
          renderItem={({ item }) => <UserCard user={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled" 
          ListEmptyComponent={
            query.length > 0 ? (
              !loading ? <Text style={styles.emptyText}>NO TARGETS FOUND</Text> : null
            ) : (
              <View style={styles.placeholderContainer}>
                {/* Removed Emoji */}
                <Text style={styles.emptyText}>INITIATE SEARCH SEQUENCE...</Text>
              </View>
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
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
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: 16,
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputFocused: {
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    flex: 1,
    color: Colors.text,
    padding: 16,
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  loader: {
    marginRight: 16,
  },
  list: {
    padding: 16,
  },
  emptyText: {
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  placeholderContainer: {
    alignItems: 'center',
    marginTop: 60,
    opacity: 0.5,
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 10,
    color: Colors.textMuted, // Emoji removed
  }
});
