import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <AppNavigator onLogout={() => setIsLoggedIn(false)} />
        ) : (
          <LoginScreen onLogin={() => setIsLoggedIn(true)} />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}