// src/screens/ProfileScreen.js
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext'; // ✅ ใช้ธีมส่วนกลาง

const ProfileItem = ({ icon, title, subtitle, onPress, rightElement, colors }) => (
  <TouchableOpacity style={[styles.profileItem, { borderBottomColor: colors.border }]} onPress={onPress}>
    <View style={styles.profileItemLeft}>
      <View style={[styles.iconContainer, { backgroundColor: colors.bg }]}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <View>
        <Text style={[styles.profileItemTitle, { color: colors.text }]}>{title}</Text>
        {subtitle && <Text style={[styles.profileItemSubtitle, { color: colors.textDim }]}>{subtitle}</Text>}
      </View>
    </View>
    <View style={styles.profileItemRight}>
      {rightElement || <Ionicons name="chevron-forward" size={20} color={colors.textDim} />}
    </View>
  </TouchableOpacity>
);

export default function ProfileScreen({ navigation, onLogout }) {
  const [notifications, setNotifications] = useState(true);

  // ✅ ดึงค่าจาก ThemeContext
  const { colors, isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    Alert.alert('ออกจากระบบ', 'คุณต้องการออกจากระบบหรือไม่?', [
      { text: 'ยกเลิก', style: 'cancel' },
      { text: 'ออกจากระบบ', style: 'destructive', onPress: onLogout },
    ]);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Header */}
      <View style={[styles.profileHeader, { backgroundColor: colors.primary }]}>
        <View style={[styles.avatarContainer, { backgroundColor: '#ffffff22' }]}>
          <Ionicons name="person" size={40} color="#fff" />
        </View>
        <Text style={[styles.userName, { color: '#fff' }]}>ผู้ใช้ Demo</Text>
        <Text style={[styles.userEmail, { color: '#E9ECFF' }]}>demo@arwheel.com</Text>
        <TouchableOpacity style={[styles.editProfileButton, { backgroundColor: '#fff' }]}>
          <Text style={{ color: colors.primary, fontWeight: 'bold' }}>แก้ไขโปรไฟล์</Text>
        </TouchableOpacity>
      </View>

      {/* บัญชี */}
      <View style={[styles.menuSection, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>บัญชี</Text>
        <ProfileItem
          colors={colors}
          icon="heart-outline"
          title="รายการโปรด"
          subtitle="ล้อแม็กซ์ที่คุณบันทึกไว้"
          onPress={() => navigation.navigate('Favorites')}
        />
        <ProfileItem
          colors={colors}
          icon="images-outline"
          title="ที่บันทึก"
          subtitle="รูปภาพ/ไฟล์ของฉัน"
          onPress={() => navigation.navigate('Saved')}
        />
        <ProfileItem
          colors={colors}
          icon="camera-outline"
          title="ประวัติ AR"
          subtitle="การทดลองที่ผ่านมา"
          onPress={() => Alert.alert('ประวัติ AR', 'เปิดหน้าประวัติการใช้งาน')}
        />
      </View>

      {/* การตั้งค่า */}
      <View style={[styles.menuSection, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>การตั้งค่า</Text>
        <ProfileItem
          colors={colors}
          icon="notifications-outline"
          title="การแจ้งเตือน"
          subtitle="จัดการการแจ้งเตือน"
          rightElement={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'#fff'}
            />
          }
        />
        {/* ✅ ใช้ isDark / toggleTheme แทน useState */}
        <ProfileItem
          colors={colors}
          icon="moon-outline"
          title="โหมดมืด"
          subtitle={isDark ? 'เปิดอยู่' : 'ปิดอยู่'}
          rightElement={
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'#fff'}
            />
          }
        />
        <ProfileItem
          colors={colors}
          icon="language-outline"
          title="ภาษา"
          subtitle="ไทย"
          onPress={() => Alert.alert('ภาษา', 'เลือกภาษาที่ต้องการ')}
        />
      </View>

      {/* ช่วยเหลือ */}
      <View style={[styles.menuSection, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>ช่วยเหลือ</Text>
        <ProfileItem
          colors={colors}
          icon="help-circle-outline"
          title="ความช่วยเหลือ"
          subtitle="คำถามที่พบบ่อยและการสนับสนุน"
          onPress={() => Alert.alert('ความช่วยเหลือ', 'เปิดหน้าช่วยเหลือ')}
        />
        <ProfileItem
          colors={colors}
          icon="information-circle-outline"
          title="เกี่ยวกับแอป"
          subtitle="เวอร์ชัน 1.0.0"
          onPress={() => Alert.alert('เกี่ยวกับ', 'AR Wheel App v1.0.0\nพัฒนาโดยทีม AR Development')}
        />
      </View>

      {/* Logout */}
      <View style={[styles.menuSection, { backgroundColor: colors.card }]}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#ff4444" />
          <Text style={[styles.logoutText, { color: '#ff4444' }]}>ออกจากระบบ</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 12, color: colors.textDim }}>AR Wheel App v1.0.0</Text>
        <Text style={{ fontSize: 12, color: colors.textDim }}>© 2024 AR Development Team</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileHeader: { alignItems: 'center', padding: 26, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 10 },
  avatarContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  userName: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  userEmail: { fontSize: 16, marginBottom: 20 },
  editProfileButton: { paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 },

  menuSection: { marginBottom: 10, paddingVertical: 10, borderRadius: 16, marginHorizontal: 10, overflow: 'hidden' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginHorizontal: 20 },

  profileItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1,
  },
  profileItemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconContainer: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },

  profileItemTitle: { fontSize: 16, fontWeight: '500' },
  profileItemSubtitle: { fontSize: 14, marginTop: 2 },
  profileItemRight: { marginLeft: 10 },

  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15, paddingHorizontal: 20 },
  logoutText: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
});
