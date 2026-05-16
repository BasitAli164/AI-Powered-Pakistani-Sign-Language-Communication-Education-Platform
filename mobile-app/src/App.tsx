/**
 * Main App Component
 * Root component of the application
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, BackHandler, Alert } from 'react-native';
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

    // Handle Android back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Exit', onPress: () => BackHandler.exitApp() },
        ]
      );
      return true; // Prevent default behavior
    });

    return () => backHandler.remove();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
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
