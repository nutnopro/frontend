// src/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ARScreen from '../screens/ARScreen';
import ModelScreen from '../screens/ModelScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SavedScreen from '../screens/SavedScreen';

// ✅ ใช้สีจากธีม (ให้ dark mode ทำงานทั้ง header/แท็บ)
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ทำ Stack แยกสำหรับหน้าโปรไฟล์ + เมนูย่อย
function ProfileStack({ onLogout }) {
  const PS = createStackNavigator();
  return (
    <PS.Navigator screenOptions={{ headerShown: false }}>
      {/* ส่ง props ของ navigator ลงไปให้ ProfileScreen */}
      <PS.Screen name="ProfileHome">
        {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
      </PS.Screen>
      <PS.Screen name="Favorites" component={FavoriteScreen} />
      <PS.Screen name="Saved" component={SavedScreen} />
    </PS.Navigator>
  );
}

function MainTabs({ onLogout }) {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textDim,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },

        tabBarIcon: ({ focused, color }) => {
          const map = {
            Home: focused ? 'home' : 'home-outline',
            Models: focused ? 'cube' : 'cube-outline',
            AR: focused ? 'camera' : 'camera-outline',
            Profile: focused ? 'person-circle' : 'person-circle-outline',
          };
          return <Ionicons name={map[route.name]} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'หน้าหลัก' }}
      />
      <Tab.Screen
        name="Models"
        component={ModelScreen}
        options={{ title: 'โมเดล' }}
      />
      <Tab.Screen
        name="AR"
        component={ARScreen}
        options={{ title: 'AR' }}
      />
      <Tab.Screen name="Profile" options={{ title: 'โปรไฟล์' }}>
        {() => <ProfileStack onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator({ onLogout }) {
  // ใช้ component wrapper เพื่อส่ง onLogout ลงไป
  const MainTabsWrapper = (props) => <MainTabs {...props} onLogout={onLogout} />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabsWrapper} />
    </Stack.Navigator>
  );
}
