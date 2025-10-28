// src/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ARScreen from '../screens/ARScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import SavedScreen from '../screens/SavedScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import LanguageScreen from '../screens/LanguageScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import ManageModelsScreen from '../screens/ManageModelsScreen';

import ModelDetailScreen from '../screens/ModelDetailScreen';
import BackButton from '../components/BackButton';
import CustomTabBar from '../components/CustomTabBar';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const ProfileStackNav = createStackNavigator();

function ProfileStack() {
  const { colors } = useTheme();
  return (
    <ProfileStackNav.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: () => <BackButton />,
      }}
    >
      <ProfileStackNav.Screen
        name="ProfileHome"
        component={ProfileScreen}
        options={{ title: 'โปรไฟล์' }}
      />
      <ProfileStackNav.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{ title: 'รายการโปรด' }}
      />
      <ProfileStackNav.Screen
        name="Saved"
        component={SavedScreen}
        options={{ title: 'ที่บันทึก' }}
      />
      <ProfileStackNav.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: 'เปลี่ยนรหัสผ่าน' }}
      />
      <ProfileStackNav.Screen
        name="Language"
        component={LanguageScreen}
        options={{ title: 'ภาษา' }}
      />
      <ProfileStackNav.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{ title: 'สถิติ' }}
      />
      <ProfileStackNav.Screen
        name="ManageModels"
        component={ManageModelsScreen}
        options={{ title: 'จัดการโมเดล' }}
      />
    </ProfileStackNav.Navigator>
  );
}

function MainTabs() {
  // ❗️ปิด header ของ Tab ทั้งหมด เพื่อไม่ให้ซ้อนกับ header ที่ HomeScreen วาดเอง
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'ARWheel' }} />
      <Tab.Screen name="AR" component={ARScreen} options={{ title: 'AR' }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ title: 'โปรไฟล์' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { colors } = useTheme();
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="MainTabs" component={MainTabs} />
      <RootStack.Screen
        name="ModelDetail"
        component={ModelDetailScreen}
        options={{
          headerShown: true,
          title: 'รายละเอียดโมเดล',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => <BackButton />,
        }}
      />
    </RootStack.Navigator>
  );
}
