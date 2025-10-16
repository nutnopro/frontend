// src/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ARScreen from '../screens/ARScreen';
import ModelScreen from '../screens/ModelScreen';       // ✅ ใช้ที่นี่
import FavoriteScreen from '../screens/FavoriteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SavedScreen from '../screens/SavedScreen';

import BackButton from '../components/BackButton';
import CustomTabBar from '../components/CustomTabBar';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ProfileStack({ onLogout }) {
  const PS = createStackNavigator();
  const { colors } = useTheme();
  return (
    <PS.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: () => <BackButton />,
      }}
    >
      <PS.Screen name="ProfileHome" options={{ title: 'โปรไฟล์' }}>
        {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
      </PS.Screen>
      <PS.Screen name="Favorites" component={FavoriteScreen} options={{ title: 'รายการโปรด' }} />
      <PS.Screen name="Saved" component={SavedScreen} options={{ title: 'ที่บันทึก' }} />
    </PS.Navigator>
  );
}

function MainTabs({ onLogout }) {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: () => <BackButton />,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'หน้าหลัก' }} />
      <Tab.Screen name="AR" component={ARScreen} options={{ title: 'AR' }} />
      <Tab.Screen name="Profile" options={{ title: 'โปรไฟล์', headerShown: false }}>
        {() => <ProfileStack onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator({ onLogout }) {
  const { colors } = useTheme();
  const MainTabsWrapper = (props) => <MainTabs {...props} onLogout={onLogout} />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* ✅ แท็บหลัก */}
      <Stack.Screen name="MainTabs" component={MainTabsWrapper} />

      {/* ✅ หน้าโมเดลแบบสแตกเดี่ยว (ไม่มีปุ่มในแท็บ) */}
      <Stack.Screen
        name="Models"
        component={ModelScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          title: 'โมเดล',
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack.Navigator>
  );
}
