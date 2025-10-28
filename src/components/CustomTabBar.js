// src/components/CustomTabBar.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

const DIAMETER = 72;
const RADIUS = DIAMETER / 2;
const SPACER_W = DIAMETER + 24;

export default function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const [barW, setBarW] = useState(0);

  const onPress = (routeName) => {
    if (!routeName) return;
    const route = state.routes.find(r => r.name === routeName);
    if (!route) return;
    const focused = state.routes[state.index]?.name === routeName;
    const e = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
    if (e.defaultPrevented) return;

    if (routeName === 'Profile') {
      // ไปหน้า root ของโปรไฟล์เสมอ (แก้เด้งค้างหน้า Favorites)
      navigation.navigate('Profile', { screen: 'ProfileHome' });
    } else {
      if (!focused) navigation.navigate(route.name);
    }
  };

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 8) - 4 }]}>
      <View
        style={[
          styles.bar,
          { backgroundColor: isDark ? '#13161a' : '#eef0f4', borderColor: colors.border }
        ]}
        onLayout={e => setBarW(e.nativeEvent.layout.width)}
      >
        <TabItem
          active={state.routes[state.index]?.name === 'Home'}
          iconOn="home"
          iconOff="home-outline"
          label="หน้าหลัก"
          colors={colors}
          onPress={() => onPress('Home')}
        />
        <View style={{ width: SPACER_W }} />
        <TabItem
          active={state.routes[state.index]?.name === 'Profile'}
          iconOn="person"
          iconOff="person-outline"
          label="โปรไฟล์"
          colors={colors}
          onPress={() => onPress('Profile')}
        />
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => onPress('AR')}
          style={[styles.centerBtnWrap, { left: Math.max(0, (barW - DIAMETER) / 2) }]}
        >
          <View style={[
            styles.centerBtn,
            { width: DIAMETER, height: DIAMETER, borderRadius: RADIUS, backgroundColor: isDark ? '#0f1a2c' : '#0e1b33' }
          ]}>
            <Ionicons name="globe-outline" size={24} color="#fff" />
            <Text style={styles.centerTxt}>AR</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TabItem({ active, iconOn, iconOff, label, colors, onPress }) {
  return (
    <TouchableOpacity style={styles.item} activeOpacity={0.9} onPress={onPress}>
      <Ionicons name={active ? iconOn : iconOff} size={22} color={active ? colors.primary : colors.textDim} />
      <Text numberOfLines={1} style={[styles.lbl, { color: active ? colors.primary : colors.textDim }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center' },
  bar: {
    width: '92%',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    ...Platform.select({
      android: { elevation: 10 },
      ios: { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 18, shadowOffset: { width: 0, height: 8 } },
    }),
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 2 },
  lbl: { fontSize: 12, fontWeight: '600' },
  centerBtnWrap: { position: 'absolute', top: -28, zIndex: 20 },
  centerBtn: { alignItems: 'center', justifyContent: 'center' },
  centerTxt: { color: '#fff', fontSize: 11, marginTop: 2, fontWeight: '700' },
});
