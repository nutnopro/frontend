// src/screens/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileItem = ({ icon, title, subtitle, onPress, rightElement }) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress}>
    <View style={styles.profileItemLeft}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color="#667eea" />
      </View>
      <View>
        <Text style={styles.profileItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.profileItemSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <View style={styles.profileItemRight}>
      {rightElement || <Ionicons name="chevron-forward" size={20} color="#ccc" />}
    </View>
  </TouchableOpacity>
);

export default function ProfileScreen({ onLogout }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'ออกจากระบบ',
      'คุณต้องการออกจากระบบหรือไม่?',
      [
        { text: 'ยกเลิก', style: 'cancel' },
        { 
          text: 'ออกจากระบบ', 
          style: 'destructive',
          onPress: onLogout 
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={40} color="#667eea" />
        </View>
        <Text style={styles.userName}>ผู้ใช้ Demo</Text>
        <Text style={styles.userEmail}>demo@arwheel.com</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>แก้ไขโปรไฟล์</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>รายการโปรด</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>ทดลอง AR</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>รูปภาพ</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>บัญชี</Text>
        <ProfileItem
          icon="person-outline"
          title="ข้อมูลส่วนตัว"
          subtitle="จัดการข้อมูลและความเป็นส่วนตัว"
          onPress={() => Alert.alert('ข้อมูลส่วนตัว', 'เปิดหน้าจัดการข้อมูลส่วนตัว')}
        />
        <ProfileItem
          icon="heart-outline"
          title="รายการโปรด"
          subtitle="ล้อแม็กซ์ที่คุณบันทึกไว้"
          onPress={() => Alert.alert('รายการโปรด', 'เปิดหน้ารายการโปรด')}
        />
        <ProfileItem
          icon="camera-outline"
          title="ประวัติ AR"
          subtitle="รูปภาพและการทดลองที่ผ่านมา"
          onPress={() => Alert.alert('ประวัติ AR', 'เปิดหน้าประวัติการใช้งาน')}
        />
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>การตั้งค่า</Text>
        <ProfileItem
          icon="notifications-outline"
          title="การแจ้งเตือน"
          subtitle="จัดการการแจ้งเตือน"
          rightElement={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#ccc', true: '#667eea' }}
              thumbColor={notifications ? '#fff' : '#f4f3f4'}
            />
          }
        />
        <ProfileItem
          icon="moon-outline"
          title="โหมดมืด"
          subtitle="เปลี่ยนธีมแอปพลิเคชัน"
          rightElement={
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#ccc', true: '#667eea' }}
              thumbColor={darkMode ? '#fff' : '#f4f3f4'}
            />
          }
        />
        <ProfileItem
          icon="language-outline"
          title="ภาษา"
          subtitle="ไทย"
          onPress={() => Alert.alert('ภาษา', 'เลือกภาษาที่ต้องการ')}
        />
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>ช่วยเหลือ</Text>
        <ProfileItem
          icon="help-circle-outline"
          title="ความช่วยเหลือ"
          subtitle="คำถามที่พบบ่อยและการสนับสนุน"
          onPress={() => Alert.alert('ความช่วยเหลือ', 'เปิดหน้าช่วยเหลือ')}
        />
        <ProfileItem
          icon="information-circle-outline"
          title="เกี่ยวกับแอป"
          subtitle="เวอร์ชัน 1.0.0"
          onPress={() => Alert.alert('เกี่ยวกับ', 'AR Wheel App v1.0.0\nพัฒนาโดยทีม AR Development')}
        />
        <ProfileItem
          icon="star-outline"
          title="ให้คะแนนแอป"
          subtitle="แบ่งปันความคิดเห็นของคุณ"
          onPress={() => Alert.alert('ให้คะแนน', 'ขอบคุณสำหรับความคิดเห็น!')}
        />
      </View>

      {/* Logout Button */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#ff4444" />
          <Text style={styles.logoutText}>ออกจากระบบ</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>AR Wheel App v1.0.0</Text>
        <Text style={styles.footerText}>© 2024 AR Development Team</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 30,
    marginBottom: 10,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editProfileText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statsContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 20,
    marginBottom: 10,
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
    marginHorizontal: 20,
  },
  menuSection: {
    backgroundColor: 'white',
    marginBottom: 10,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  profileItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  profileItemRight: {
    marginLeft: 10,
  },
  logoutSection: {
    backgroundColor: 'white',
    marginBottom: 20,
    paddingVertical: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4444',
    marginLeft: 10,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
});