// src/screens/ARScreen.js
import React, { useRef, useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Alert,
  ScrollView, Image, ImageBackground, Dimensions, Modal, StatusBar
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

const WHEELS = [
  { id: 'w1', name: 'XR-01', price: 2900, img: 'https://images.unsplash.com/photo-1617469165781-8dca0d24dd47?q=80&w=600&auto=format&fit=crop' },
  { id: 'w2', name: 'SR-06', price: 1000, img: 'https://images.unsplash.com/photo-1595717579655-587eb7c1575e?q=80&w=600&auto=format&fit=crop' },
  { id: 'w3', name: 'GT-5', price: 2600, img: 'https://images.unsplash.com/photo-1517946132621-7a3bb2f0b2ae?q=80&w=600&auto=format&fit=crop' },
  { id: 'w4', name: 'SP-2', price: 4900, img: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=600&auto=format&fit=crop' },
];
const COLORS = ['#1F2937', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB', '#C2410C', '#991B1B', '#14532D'];

export default function ARScreen() {
  const { colors } = useTheme();

  const camRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [isARActive, setIsARActive] = useState(true);
  const [activeWheel, setActiveWheel] = useState(WHEELS[0].id);
  const [activeColor, setActiveColor] = useState(COLORS[2]);

  // NEW: modal กล้องเต็มหน้าจอ
  const [showFull, setShowFull] = useState(false);

  useEffect(() => { if (!permission?.granted) requestPermission(); }, [permission]);

  const takePicture = async () => {
    try {
      const photo = await camRef.current?.takePictureAsync?.();
      if (photo) Alert.alert('สำเร็จ', 'บันทึกรูปภาพแล้ว!');
    } catch (e) {
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถถ่ายรูปได้');
    }
  };

  if (!permission) return <View style={styles.center}><Text>กำลังตรวจสอบสิทธิ์...</Text></View>;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 10 }}>ต้องอนุญาตการเข้าถึงกล้อง</Text>
        <TouchableOpacity style={[styles.pillBtn, { backgroundColor: '#667eea' }]} onPress={requestPermission}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>Grant</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#6a76e7', '#6a2fb6']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
        {/* CARD */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <LinearGradient colors={['#e9ecff', '#ffffff']} style={styles.logoWrap}>
                <Ionicons name="car-sport" size={22} color={colors.primary} />
              </LinearGradient>
              <Text style={[styles.title, { color: colors.text }]}>AR Wheel</Text>
            </View>
            <View style={styles.headerRight}>
              <HeaderIcon name="search" />
              <HeaderIcon name="heart" />
              <HeaderIcon name="cart" disabled />
            </View>
          </View>

          {/* Toolbar */}
          <View style={[styles.toolbar, { backgroundColor: colors.bg, borderColor: colors.border }]}>
            <ToolbarIcon name="camera-outline" label="Camera" active />
            <ToolbarIcon name="image-outline" label="Gallery" />
            <ToolbarIcon name="copy-outline" label="Template" />
            <ToolbarIcon name="contrast-outline" label="Rim" />
            <ToolbarIcon name="cart-outline" label="Cart" disabled />
            <ToolbarIcon name="person-circle-outline" label="Profile" />
          </View>

          {/* ===== Camera area (ขยายสูงขึ้น + ปุ่มขยายเต็มจอ) ===== */}
          <View style={styles.camContainer}>
            <CameraView ref={camRef} style={StyleSheet.absoluteFill} facing={facing} />

            {/* Overlay */}
            <View style={styles.arOverlay}>
              <View style={styles.detectionFrame} />
              <Text style={styles.arInstructions}>
                {isARActive ? 'กำลังตรวจจับล้อรถ...' : 'เล็งกล้องไปที่ล้อรถ'}
              </Text>
            </View>

            {/* Top Controls */}
            <View style={styles.topControls}>
              <TouchableOpacity style={styles.controlButton} onPress={() => setIsARActive(v => !v)}>
                <Ionicons name={isARActive ? 'scan' : 'scan-outline'} size={20} color="#fff" />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.controlButton} onPress={() => setShowFull(true)}>
                  <Ionicons name="expand-outline" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={() => setFacing(p => (p === 'back' ? 'front' : 'back'))}>
                  <Ionicons name="camera-reverse-outline" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Bottom Controls */}
            <View style={styles.bottomControls}>
              <TouchableOpacity style={styles.wheelSizeButton}>
                <Text style={styles.wheelSizeText}>17"</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureInner} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.wheelStyleButton}>
                <Ionicons name="settings-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Change Style */}
          <SectionHeader icon="construct" text="Change Style" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hList}>
            {WHEELS.map((w) => (
              <TouchableOpacity key={w.id} onPress={() => setActiveWheel(w.id)} activeOpacity={0.9}>
                <View style={[styles.wheelItem, activeWheel === w.id && styles.wheelActive]} />
                <View style={styles.priceTag}>
                  <Text style={styles.priceText}>${w.price.toLocaleString()}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Change Color */}
          <SectionHeader icon="color-palette" text="Change Color" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hList}>
            {COLORS.map((c) => (
              <TouchableOpacity key={c} onPress={() => setActiveColor(c)} style={styles.colorBtn}>
                <View style={[styles.colorDot, { backgroundColor: c, borderColor: c === '#D1D5DB' ? '#cbd5e1' : 'transparent' }]} />
                {activeColor === c && <Ionicons name="checkmark-circle" size={18} color={colors.primary} style={{ marginLeft: 6 }} />}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Bottom actions */}
          <View style={styles.bottomRow}>
            <TouchableOpacity style={styles.ctaWrap} activeOpacity={0.9}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.ctaGrad}>
                <Text style={styles.ctaText}>CONFIRM</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shareBtn, { borderColor: colors.primary }]} activeOpacity={0.9}>
              <Ionicons name="camera-outline" size={20} color={colors.primary} />
              <Text style={[styles.shareText, { color: colors.primary }]}>SHARE AR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ===== Modal กล้องเต็มหน้าจอ ===== */}
      <Modal visible={showFull} animationType="fade" presentationStyle="fullScreen" onRequestClose={() => setShowFull(false)}>
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <StatusBar hidden />
          <CameraView ref={camRef} style={StyleSheet.absoluteFill} facing={facing} />

          {/* overlay เต็มจอ */}
          <View style={styles.fullOverlay}>
            <View style={styles.detectionFrame} />

            <View style={styles.fullTopRow}>
              <TouchableOpacity style={styles.fullBtn} onPress={() => setShowFull(false)}>
                <Ionicons name="close" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.fullBtn} onPress={() => setFacing(p => (p === 'back' ? 'front' : 'back'))}>
                <Ionicons name="camera-reverse-outline" size={22} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.fullBottomRow}>
              <TouchableOpacity style={styles.wheelSizeButton}>
                <Text style={styles.wheelSizeText}>17"</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.captureButton, { borderWidth: 2, borderColor: '#fff' }]} onPress={takePicture}>
                <View style={styles.captureInner} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.wheelStyleButton}>
                <Ionicons name="settings-outline" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

/* ---------- Sub Components ---------- */
function HeaderIcon({ name, disabled }) {
  const dim = disabled ? 0.35 : 1;
  return (
    <View style={{ opacity: dim, marginLeft: 10 }}>
      <LinearGradient colors={['#7b86ff', '#8a6ee8']} style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={`${name}-outline`.replace('-outline-outline', '-outline')} size={18} color="#fff" />
      </LinearGradient>
    </View>
  );
}
function ToolbarIcon({ name, label, active, disabled }) {
  return (
    <View style={[styles.tabItem, disabled && { opacity: 0.35 }]}>
      <View style={[styles.tabIcon, active && { backgroundColor: '#8e97ff' }]}>
        <Ionicons name={name} size={18} color={active ? '#fff' : '#6b7280'} />
      </View>
      <Text style={{ fontSize: 11, color: '#6b7280' }}>{label}</Text>
    </View>
  );
}
function SectionHeader({ icon, text }) {
  return (
    <View style={styles.sectionHeader}>
      <LinearGradient colors={['#eef1ff', '#ffffff']} style={styles.sectionIcon}>
        <Ionicons name={icon} size={18} color="#7b86ff" />
      </LinearGradient>
      <Text style={styles.sectionTitle}>{text}</Text>
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  card: {
    borderRadius: 24, padding: 14,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 }, elevation: 10,
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8, marginBottom: 6 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  logoWrap: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  title: { fontSize: 22, fontWeight: '700' },

  toolbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, borderRadius: 16, borderWidth: 1, marginTop: 10, marginBottom: 8 },
  tabItem: { alignItems: 'center', marginHorizontal: 8 },
  tabIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', marginBottom: 2 },

  /* Camera area — สูงขึ้น (จาก 0.6 → 0.75 ของกว้าง) */
  camContainer: {
    marginTop: 8, marginBottom: 12, borderRadius: 18, overflow: 'hidden',
    height: width * 0.75, position: 'relative',
    backgroundColor: '#000',
  },
  arOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
  detectionFrame: { width: 220, height: 220, borderWidth: 2, borderColor: '#00ff99', borderRadius: 110, borderStyle: 'dashed' },
  arInstructions: { position: 'absolute', bottom: 22, backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, fontSize: 14 },

  topControls: { position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between' },
  controlButton: { backgroundColor: 'rgba(0,0,0,0.55)', padding: 10, borderRadius: 22, marginLeft: 8 },

  bottomControls: { position: 'absolute', bottom: 12, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  wheelSizeButton: { backgroundColor: 'rgba(0,0,0,0.7)', padding: 12, borderRadius: 24, minWidth: 50, alignItems: 'center' },
  wheelSizeText: { color: 'white', fontSize: 15, fontWeight: 'bold' },
  captureButton: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
  captureInner: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#667eea' },
  wheelStyleButton: { backgroundColor: 'rgba(0,0,0,0.7)', padding: 12, borderRadius: 24 },

  /* Lists */
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  sectionIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#6b7280' },

  hList: { paddingVertical: 10 },

  wheelItem: {
    width: 120, height: 120, borderRadius: 16, marginRight: 14, backgroundColor: '#f3f4f6',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 4,
  },
  wheelActive: { borderWidth: 2, borderColor: '#8e97ff' },
  wheelImg: { width: '100%', height: '100%' },

  priceTag: { position: 'absolute', bottom: 6, left: 6, backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, elevation: 3 },
  priceText: { fontSize: 12, fontWeight: '700', color: '#6b7280' },

  colorBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 12, padding: 6, borderRadius: 12, backgroundColor: '#fff' },
  colorDot: { width: 28, height: 28, borderRadius: 14, borderWidth: 1 },

  /* Bottom CTA */
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  ctaWrap: { flex: 1, marginRight: 10, borderRadius: 14, overflow: 'hidden' },
  ctaGrad: { paddingVertical: 14, alignItems: 'center', borderRadius: 14 },
  ctaText: { color: '#fff', fontWeight: '800', letterSpacing: 0.5 },
  shareBtn: { height: 52, paddingHorizontal: 18, borderRadius: 14, borderWidth: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#fff' },
  shareText: { fontWeight: '800', marginLeft: 8 },

  /* Fullscreen modal overlay */
  fullOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, paddingBottom: 24 },
  fullTopRow: { width: '100%', paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' },
  fullBottomRow: { width: '100%', paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  fullBtn: { backgroundColor: 'rgba(0,0,0,0.55)', padding: 12, borderRadius: 24 },
});
