// src/screens/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  ImageBackground,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const Row = ({ icon, title, subtitle, onPress, right, colors }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <View
      style={[
        styles.row,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: colors.bg }]}>
        <Ionicons name={icon} size={18} color={colors.text} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.rowSub, { color: colors.textDim }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right ?? (
        <Ionicons name="chevron-forward" size={18} color={colors.textDim} />
      )}
    </View>
  </TouchableOpacity>
);

export default function ProfileScreen({ navigation, onLogout }) {
  const { colors, isDark, toggleTheme } = useTheme();
  const [notif, setNotif] = useState(true);

  const handleLogoutPress = () => {
    Alert.alert('ออกจากระบบ', 'คุณต้องการออกจากระบบจริงหรือไม่?', [
      { text: 'ยกเลิก', style: 'cancel' },
      {
        text: 'ออกจากระบบ',
        style: 'destructive',
        onPress: () => {
          if (typeof onLogout === 'function') {
            onLogout();
            return;
          }

          // fallback: reset ไปหน้า Login (ถ้ามี)
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: 160 }}
    >
      {/* Header */}
      <ImageBackground
        source={{
          uri:
            'https://images.unsplash.com/photo-1520975922139-a6b6b2924d32?w=1200&q=80&auto=format&fit=crop',
        }}
        style={styles.headerBg}
        imageStyle={{ opacity: 0.18 }}
      >
        <View style={styles.headerCard}>
          <View style={[styles.avatar, { borderColor: '#fff' }]}>
            <Ionicons name="person" size={34} color="#fff" />
            <View style={styles.editBadge}>
              <Ionicons name="pencil" size={12} color="#0e1b33" />
            </View>
          </View>

          <Text style={[styles.storeName, { color: colors.text }]}>
            store_name
          </Text>
          <Text style={[styles.email, { color: colors.textDim }]}>
            sample@gmail.com
          </Text>
          <Text style={[styles.email, { color: colors.textDim }]}>
            phone_number
          </Text>
          <Text style={[styles.email, { color: colors.textDim }]}>address</Text>

          <TouchableOpacity
            style={[styles.editBtn, { backgroundColor: colors.primary }]}
            onPress={() => {}}
          >
            <Text style={styles.editBtnTxt}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Menu */}
      <View style={{ paddingHorizontal: 12, marginTop: 10 }}>
        <Row
          colors={colors}
          icon="construct-outline"
          title="Manage models"
          onPress={() => navigation.navigate('ManageModels')}
        />
        <Row
          colors={colors}
          icon="stats-chart-outline"
          title="Statistics"
          onPress={() => navigation.navigate('Statistics')}
        />
        <Row
          colors={colors}
          icon="lock-closed-outline"
          title="Change password"
          onPress={() => navigation.navigate('ChangePassword')}
        />
        <Row
          colors={colors}
          icon="language-outline"
          title="Language"
          subtitle="Thai"
          onPress={() => navigation.navigate('Language')}
        />
        <Row
          colors={colors}
          icon="color-palette-outline"
          title="Theme"
          subtitle={isDark ? 'Dark' : 'Light'}
          right={
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#fff"
            />
          }
        />
        <Row
          colors={colors}
          icon="notifications-outline"
          title="Notification"
          right={
            <Switch
              value={notif}
              onValueChange={setNotif}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#fff"
            />
          }
        />
        <Row
          colors={colors}
          icon="settings-outline"
          title="AR preferences"
          onPress={() => {
            try {
              navigation.navigate('ARPreferences');
            } catch (e) {
              // ignore if not available
            }
          }}
        />

        {/* Logout Row */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleLogoutPress}
          style={[
            styles.logoutRow,
            { backgroundColor: isDark ? '#2b1113' : '#fff1f0' },
          ]}
        >
          <View
            style={[
              styles.logoutIconWrap,
              { backgroundColor: isDark ? '#3b1a1b' : '#ffecec' },
            ]}
          >
            <Ionicons name="log-out-outline" size={18} color="#ff4d4f" />
          </View>
          <Text style={[styles.logoutText, { color: '#ff4d4f' }]}>Logout</Text>
          <Ionicons name="chevron-forward" size={18} color="#ff9a9a" />
        </TouchableOpacity>
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerBg: { paddingHorizontal: 12, paddingTop: 12 },
  headerCard: {
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#ffffff25',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0e1b33',
  },
  editBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#fff',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeName: { fontWeight: '800', fontSize: 18, marginTop: 10 },
  email: { fontSize: 12, marginTop: 2 },
  editBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 12,
  },
  editBtnTxt: { color: '#fff', fontWeight: '700' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowTitle: { fontWeight: '700', fontSize: 14 },
  rowSub: { marginTop: 2, fontSize: 12 },

  // Logout styles
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ffd6d6',
  },
  logoutIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoutText: { flex: 1, fontWeight: '800', fontSize: 14 },
});
