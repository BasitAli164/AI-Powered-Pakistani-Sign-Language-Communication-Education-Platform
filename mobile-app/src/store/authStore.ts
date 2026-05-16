/**
 * Authentication Store
 * Zustand store for managing authentication state
 */

import { create } from 'zustand';
import { User, AuthState } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/utils/constants';

interface AuthStore extends AuthState {
  // Actions
  setUser: (user: User) => void;
  setTokens: (token: string, refreshToken: string) => void;
  login: (user: User, token: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial State
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },

  setTokens: (token: string, refreshToken: string) => {
    set({ token, refreshToken });
  },

  login: async (user: User, token: string, refreshToken: string) => {
    try {
      // Save to AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

      // Update state
      set({
        user,
        token,
        refreshToken,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      console.error('Login error:', error);
      set({ error: 'Failed to save authentication data' });
    }
  },

  logout: async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);

      // Reset state
      set({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        error: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
      set({ error: 'Failed to logout' });
    }
  },

  updateUser: (userData: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      set({ user: updatedUser });
      
      // Save to AsyncStorage
      AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
    }
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  initializeAuth: async () => {
    try {
      set({ isLoading: true });

      // Load from AsyncStorage
      const [userData, token, refreshToken] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER_DATA),
        AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
      ]);

      if (userData && token && refreshToken) {
        const user = JSON.parse(userData);
        set({
          user,
          token,
          refreshToken,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error('Initialize auth error:', error);
      set({ error: 'Failed to initialize authentication' });
    } finally {
      set({ isLoading: false });
    }
  },
}));

// Made with Bob
