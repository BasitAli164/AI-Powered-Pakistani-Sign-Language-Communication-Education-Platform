/**
 * Main App Component
 * Root component of the application
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import AppNavigator from '@/navigation/AppNavigator';

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const initializeApp = useAppStore((state) => state.initializeApp);

  useEffect(() => {
    // Initialize app on mount
    const initialize = async () => {
      await Promise.all([
        initializeAuth(),
        initializeApp(),
      ]);
    };

    initialize();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Made with Bob
