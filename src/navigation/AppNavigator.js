import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ARScreen from '../screens/ARScreen';
import ModelScreen from '../screens/ModelScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabNavigator({ onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Model') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'AR') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        headerStyle: {
          backgroundColor: '#667eea',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'หน้าหลัก' }} 
      />
      <Tab.Screen 
        name="Model" 
        component={ModelScreen} 
        options={{ title: 'โมเดล' }} 
      />
      <Tab.Screen 
        name="AR" 
        component={ARScreen} 
        options={{ title: 'AR' }} 
      />
      <Tab.Screen 
        name="Favorite" 
        component={FavoriteScreen} 
        options={{ title: 'รายการโปรด' }} 
      />
      <Tab.Screen name="Profile" options={{ title: 'โปรไฟล์' }}>
        {() => <ProfileScreen onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator({ onLogout }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs">
        {() => <MainTabNavigator onLogout={onLogout} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 60,
    paddingBottom: 5,
  },
});