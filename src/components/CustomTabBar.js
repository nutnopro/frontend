import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

const DIAMETER = 72;            // ขนาดปุ่ม AR
const RADIUS   = DIAMETER / 2;
const SPACER_W = DIAMETER + 24; // เว้นช่องว่างกลางให้พอ

export default function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const [barW, setBarW] = useState(0);

  const leftRoute   = state.routes[0]; // Home
  const middleRoute = state.routes[1]; // AR
  const rightRoute  = state.routes[2]; // Profile

  const onPress = (route, focused) => {
    const e = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
    if (!focused && !e.defaultPrevented) navigation.navigate(route.name);
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
        {/* LEFT */}
        <TabItem
          iconFocused="home"
          iconDefault="home-outline"
          label="หน้าหลัก"
          route={leftRoute}
          state={state}
          index={0}
          colors={colors}
          onPress={onPress}
        />

        {/* เว้นช่องตรงกลาง (ตามขนาดปุ่ม) */}
        <View style={{ width: SPACER_W }} />

        {/* RIGHT */}
        <TabItem
          iconFocused="person"
          iconDefault="person-outline"
          label="โปรไฟล์"
          route={rightRoute}
          state={state}
          index={2}
          colors={colors}
          onPress={onPress}
        />

        {/* CENTER AR — ตำแหน่งคำนวณจากความกว้างจริงของแถบ */}
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => onPress(middleRoute, state.index === 1)}
          style={[
            styles.centerBtnWrap,
            { left: Math.max(0, (barW - DIAMETER) / 2) } // เป๊ะกึ่งกลาง
          ]}
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

function TabItem({ iconFocused, iconDefault, label, route, state, index, colors, onPress }) {
  const focused = state.index === index;
  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.9}
      onPress={() => onPress(route, focused)}
    >
      <Ionicons
        name={focused ? iconFocused : iconDefault}
        size={22}
        color={focused ? colors.primary : colors.textDim}
      />
      <Text style={[styles.lbl, { color: focused ? colors.primary : colors.textDim }]} numberOfLines={1}>
        {label}
      </Text>
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
