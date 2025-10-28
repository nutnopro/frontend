// App.js
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { FavoritesProvider } from './src/context/FavoritesContext';

// ให้ Splash อยู่จนกว่าพร้อม
SplashScreen.preventAutoHideAsync().catch(() => {});

const AuthStack = createStackNavigator();

/** ทำให้ธีมของ React Navigation ตรงกับ ThemeContext */
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
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // mock โหลดทรัพยากร
        await new Promise((r) => setTimeout(r, 1200));
      } finally {
        setAppReady(true);
        try { await SplashScreen.hideAsync(); } catch {}
      }
    })();
  }, []);

  if (!appReady) return null;

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <WithNavigationTheme>
          {isLoggedIn ? (
            <AppNavigator onLogout={() => setIsLoggedIn(false)} />
          ) : (
            <AuthStack.Navigator
              screenOptions={{
                headerShown: false, // ปิด header เป็นค่าเริ่มต้น
              }}
            >
              {/* Login ไม่มี header */}
              <AuthStack.Screen name="Login">
                {(props) => (
                  <LoginScreen
                    {...props}
                    onLogin={() => setIsLoggedIn(true)}
                  />
                )}
              </AuthStack.Screen>

              {/* Register แสดง header เพื่อให้มีปุ่มย้อนกลับอัตโนมัติ */}
              <AuthStack.Screen
                name="Register"
                options={{
                  headerShown: true,
                  title: 'Create a new account',
                  headerBackTitleVisible: false,
                  headerStyle: { backgroundColor: '#FFFFFF' },
                  headerTintColor: '#1A1A1A', // สีไอคอนย้อนกลับ/ตัวอักษร
                }}
              >
                {(props) => (
                  <RegisterScreen
                    {...props}
                    onRegistered={() => setIsLoggedIn(true)}
                  />
                )}
              </AuthStack.Screen>
            </AuthStack.Navigator>
          )}
        </WithNavigationTheme>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
