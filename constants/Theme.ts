import { Platform, StyleSheet } from 'react-native';

export const Colors = {
  background: '#050505', // Deep Void
  surface: '#121212',    // Dark Slate
  surfaceLight: '#1E1E1E',
  primary: '#00F0FF',    // Neon Cyan
  secondary: '#FF003C',  // Hot Pink
  text: '#FFFFFF',
  textDim: '#E0E0E0',
  textMuted: '#888888',
  border: '#333333',
  
  // Ranks
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
  
  // Status
  success: '#00FF9D',
  error: '#FF003C',
};

export const Shadows = {
  glow: Platform.select({
    web: {
      boxShadow: '0 0 10px rgba(0, 240, 255, 0.5), 0 0 20px rgba(0, 240, 255, 0.3)',
    },
    default: {
      shadowColor: '#00F0FF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 5,
    },
  }),
  card: Platform.select({
    web: {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  }),
};

export const Layout = {
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  maxWidth: 800, // Max width for web content
};
