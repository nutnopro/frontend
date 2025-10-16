// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';

import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { FavoritesProvider } from './src/context/FavoritesContext';

// ให้ Splash ค้างไว้จนกว่าจะพร้อม
SplashScreen.preventAutoHideAsync().catch(() => {});

const AuthStack = createStackNavigator();

// ทำให้ React Navigation รับธีมเดียวกับ ThemeContext
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
    (async () => {
      try {
        // โหลดทรัพยากร/เตรียมแอป (จำลอง 1.5s)
        await new Promise(r => setTimeout(r, 1500));
      } finally {
        setAppIsReady(true);
        try { await SplashScreen.hideAsync(); } catch {}
      }
    })();
  }, []);

  if (!appIsReady) return null;

  return (
    <PaperProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <WithNavigationTheme>
            {isLoggedIn ? (
              <AppNavigator onLogout={() => setIsLoggedIn(false)} />
            ) : (
              // สแตกก่อนล็อกอิน: Login → Register
              <AuthStack.Navigator screenOptions={{ headerShown: false }}>
                <AuthStack.Screen name="Login">
                  {(props) => (
                    <LoginScreen
                      {...props}
                      onLogin={() => setIsLoggedIn(true)}
                      onGoRegister={() => props.navigation.navigate('Register')}
                    />
                  )}
                </AuthStack.Screen>
                <AuthStack.Screen
                  name="Register"
                  // RegisterScreen ควรเรียก props.route.params.onRegistered() เมื่อสมัครสำเร็จ
                  initialParams={{ onRegistered: () => setIsLoggedIn(true) }}
                  component={RegisterScreen}
                />
              </AuthStack.Navigator>
            )}
          </WithNavigationTheme>
        </FavoritesProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}
