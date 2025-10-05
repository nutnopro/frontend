// src/screens/HomeScreen.js (เฉพาะส่วนสำคัญ)
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const { colors } = useTheme();

  const featuredWheels = [ /* ...ของเดิม... */ ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ backgroundColor: colors.primary, padding: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 5 }}>ยินดีต้อนรับสู่ AR Wheel</Text>
        <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>ทดลองล้อแม็กซ์ด้วยเทคโนโลยี AR</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: colors.card, padding: 20, marginVertical: 10 }}>
        <TouchableOpacity style={{ alignItems: 'center', padding: 15 }}>
          <Ionicons name="camera" size={30} color={colors.primary} />
          <Text style={{ marginTop: 8, fontSize: 12, color: colors.text }}>เปิดกล้อง AR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center', padding: 15 }}>
          <Ionicons name="cube" size={30} color={colors.primary} />
          <Text style={{ marginTop: 8, fontSize: 12, color: colors.text }}>ดูโมเดล 3D</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center', padding: 15 }}>
          <Ionicons name="heart" size={30} color={colors.primary} />
          <Text style={{ marginTop: 8, fontSize: 12, color: colors.text }}>รายการโปรด</Text>
        </TouchableOpacity>
      </View>

      <View style={{ backgroundColor: colors.card, margin: 10, padding: 20, borderRadius: 15 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 15 }}>ล้อแม็กซ์แนะนำ</Text>
        {/* ... render การ์ดเหมือนเดิม แต่ใช้ colors สำหรับข้อความ/พื้นหลัง ... */}
      </View>
    </ScrollView>
  );
}
