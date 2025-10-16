// src/components/BackButton.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function BackButton({ tint }) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  // ถ้าอยู่หน้าหลัก (ไปหลังไม่ได้) ก็ไม่แสดงปุ่ม
  if (!navigation.canGoBack()) return null;

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ paddingHorizontal: 12 }}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      <Ionicons name="chevron-back" size={24} color={tint || '#fff'} />
    </TouchableOpacity>
  );
}
