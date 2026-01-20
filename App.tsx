import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import LeaderboardScreen from './screens/LeaderboardScreen';
import SearchScreen from './screens/SearchScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, Platform, View } from 'react-native';
import { Colors } from './constants/Theme';

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    card: Colors.surface,
    text: Colors.text,
    border: Colors.border,
  },
};

import { Trophy, Search } from 'lucide-react-native';

function Icon({ name, color, focused }: { name: string; color: string; focused: boolean }) {
  const IconComponent = name === 'Leaderboard' ? Trophy : Search;
  const glowStyle = focused 
    ? { 
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.8,
        elevation: 5
      } 
    : {};
    
  return (
    <View style={glowStyle}>
      <IconComponent color={color} size={24} strokeWidth={focused ? 3 : 2} />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, focused }) => (
              <Icon name={route.name} color={color} focused={focused} />
            ),
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.textMuted,
            tabBarStyle: {
              backgroundColor: Colors.surface,
              borderTopColor: Colors.primary,
              borderTopWidth: 1,
              paddingBottom: 5,
              height: 60,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
