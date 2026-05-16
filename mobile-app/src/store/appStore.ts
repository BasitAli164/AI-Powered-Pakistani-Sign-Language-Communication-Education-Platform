/**
 * App Store
 * Zustand store for managing global app state
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/utils/constants';
import { AppState } from '@/types';

interface AppStoreState extends AppState {
  // Actions
  setOnlineStatus: (isOnline: boolean) => void;
  toggleOfflineMode: () => void;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setLanguage: (language: 'en' | 'ur') => void;
  initializeApp: () => Promise<void>;
}

export const useAppStore = create<AppStoreState>((set, get) => ({
  // Initial State
  isOnline: true,
  isOfflineMode: false,
  theme: 'auto',
  language: 'en',

  // Actions
  setOnlineStatus: (isOnline: boolean) => {
    set({ isOnline });
  },

  toggleOfflineMode: () => {
    const currentMode = get().isOfflineMode;
    set({ isOfflineMode: !currentMode });
    AsyncStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify({ isOfflineMode: !currentMode }));
  },

  setTheme: (theme: 'light' | 'dark' | 'auto') => {
    set({ theme });
    AsyncStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  setLanguage: (language: 'en' | 'ur') => {
    set({ language });
    AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  },

  initializeApp: async () => {
    try {
      const [theme, language] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.THEME),
        AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE),
      ]);

      if (theme) set({ theme: theme as 'light' | 'dark' | 'auto' });
      if (language) set({ language: language as 'en' | 'ur' });
    } catch (error) {
      console.error('Initialize app error:', error);
    }
  },
}));

// Made with Bob
