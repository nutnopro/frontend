// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

SplashScreen.preventAutoHideAsync();

function WithNavigationTheme({ children }) {
  const { isDark, colors } = useTheme();
  const navTheme = {
    dark: isDark,
    colors: {
      primary: colors.primary,
      background: colors.bg,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };
  return <NavigationContainer theme={navTheme}>{children}</NavigationContainer>;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
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

  if (!appIsReady) return null;

  return (
    <PaperProvider>
      <ThemeProvider>
        <WithNavigationTheme>
          {isLoggedIn ? (
            <AppNavigator onLogout={() => setIsLoggedIn(false)} />
          ) : (
            <LoginScreen onLogin={() => setIsLoggedIn(true)} />
          )}
        </WithNavigationTheme>
      </ThemeProvider>
    </PaperProvider>
  );
}
