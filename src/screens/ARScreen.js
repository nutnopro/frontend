// src/screens/ARScreen.js
import React, { useRef, useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Alert,
  ScrollView, Dimensions, Modal, StatusBar, StyleSheet as RNStyleSheet
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const WHEELS = [
  { id: 'w1', name: 'XR-01', price: 2900 },
  { id: 'w2', name: 'SR-06', price: 1000 },
  { id: 'w3', name: 'GT-5', price: 2600 },
  { id: 'w4', name: 'SP-2', price: 4900 },
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
  const [showFull, setShowFull] = useState(false);

  useEffect(() => { if (!permission?.granted) requestPermission(); }, [permission]);

  const takePicture = async () => {
    try {
      const photo = await camRef.current?.takePictureAsync?.();
      if (photo) Alert.alert('สำเร็จ', 'บันทึกรูปภาพแล้ว!');
    } catch {
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถถ่ายรูปได้');
    }
  };

  if (!permission) return <View style={s.center}><Text>กำลังตรวจสอบสิทธิ์...</Text></View>;
  if (!permission.granted) {
    return (
      <View style={s.center}>
        <Text style={{ marginBottom: 10 }}>ต้องอนุญาตการเข้าถึงกล้อง</Text>
        <TouchableOpacity style={[s.pillBtn, { backgroundColor: colors.primary }]} onPress={requestPermission}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>Grant</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient colors={[colors.primary, colors.primaryPressed]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
        <View style={[s.card, { backgroundColor: colors.card }]}>
          {/* Header */}
          <View style={s.header}>
            <View style={s.headerLeft}>
              <LinearGradient colors={['#EAF2FF', '#FFFFFF']} style={s.logoWrap}>
                <Ionicons name="car-sport" size={22} color={colors.primary} />
              </LinearGradient>
              <Text style={[s.title, { color: colors.text }]}>AR Wheel</Text>
            </View>
            <View style={s.headerRight}>
              <HeaderIcon name="search" color={colors} />
              <HeaderIcon name="heart" color={colors} />
              <HeaderIcon name="cart" color={colors} disabled />
            </View>
          </View>

          {/* Toolbar */}
          <View style={[s.toolbar, { backgroundColor: colors.bg, borderColor: colors.border }]}>
            <ToolbarIcon name="camera-outline" label="Camera" active />
            <ToolbarIcon name="image-outline" label="Gallery" />
            <ToolbarIcon name="copy-outline" label="Template" />
            <ToolbarIcon name="contrast-outline" label="Rim" />
            <ToolbarIcon name="cart-outline" label="Cart" disabled />
            <ToolbarIcon name="person-circle-outline" label="Profile" />
          </View>

          {/* Camera area */}
          <View style={s.camContainer}>
            <CameraView ref={camRef} style={RNStyleSheet.absoluteFill} facing={facing} />

            <View style={s.arOverlay}>
              <View style={[s.detectionFrame, { borderColor: colors.accent || '#00C6AE' }]} />
              <Text style={s.arInstructions}>
                {isARActive ? 'กำลังตรวจจับล้อรถ...' : 'เล็งกล้องไปที่ล้อรถ'}
              </Text>
            </View>

            {/* Controls */}
            <View style={s.topControls}>
              <TouchableOpacity style={s.controlButton} onPress={() => setIsARActive(v => !v)}>
                <Ionicons name={isARActive ? 'scan' : 'scan-outline'} size={20} color="#fff" />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={s.controlButton} onPress={() => setShowFull(true)}>
                  <Ionicons name="expand-outline" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={s.controlButton} onPress={() => setFacing(p => (p === 'back' ? 'front' : 'back'))}>
                  <Ionicons name="camera-reverse-outline" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={s.bottomControls}>
              <TouchableOpacity style={s.wheelSizeButton}><Text style={s.wheelSizeText}>17"</Text></TouchableOpacity>
              <TouchableOpacity style={s.captureButton} onPress={takePicture}><View style={[s.captureInner, { backgroundColor: colors.primary }]} /></TouchableOpacity>
              <TouchableOpacity style={s.wheelStyleButton}><Ionicons name="settings-outline" size={20} color="white" /></TouchableOpacity>
            </View>
          </View>

          {/* Change Style */}
          <SectionHeader icon="construct" text="Change Style" colors={colors} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.hList}>
            {WHEELS.map((w) => (
              <TouchableOpacity key={w.id} onPress={() => setActiveWheel(w.id)} activeOpacity={0.9}>
                <View style={[s.wheelItem, activeWheel === w.id && { borderWidth: 2, borderColor: colors.primary }]} />
                <View style={s.priceTag}><Text style={[s.priceText, { color: colors.textDim }]}>${w.price.toLocaleString()}</Text></View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Change Color */}
          <SectionHeader icon="color-palette" text="Change Color" colors={colors} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.hList}>
            {COLORS.map((c) => (
              <TouchableOpacity key={c} onPress={() => setActiveColor(c)} style={s.colorBtn}>
                <View style={[s.colorDot, { backgroundColor: c, borderColor: c === '#D1D5DB' ? '#cbd5e1' : 'transparent' }]} />
                {activeColor === c && <Ionicons name="checkmark-circle" size={18} color={colors.primary} style={{ marginLeft: 6 }} />}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* CTA */}
          <View style={s.bottomRow}>
            <TouchableOpacity style={s.ctaWrap} activeOpacity={0.9}>
              <LinearGradient colors={[colors.primary, colors.primaryPressed]} style={s.ctaGrad}>
                <Text style={s.ctaText}>CONFIRM</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[s.shareBtn, { borderColor: colors.primary }]} activeOpacity={0.9}>
              <Ionicons name="camera-outline" size={20} color={colors.primary} />
              <Text style={[s.shareText, { color: colors.primary }]}>SHARE AR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Fullscreen Modal */}
      <Modal visible={showFull} animationType="fade" presentationStyle="fullScreen" onRequestClose={() => setShowFull(false)}>
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <StatusBar hidden />
          <CameraView ref={camRef} style={RNStyleSheet.absoluteFill} facing={facing} />
          <View style={s.fullOverlay}>
            <View style={[s.detectionFrame, { borderColor: '#00C6AE' }]} />
            <View style={s.fullTopRow}>
              <TouchableOpacity style={s.fullBtn} onPress={() => setShowFull(false)}><Ionicons name="close" size={22} color="#fff" /></TouchableOpacity>
              <TouchableOpacity style={s.fullBtn} onPress={() => setFacing(p => (p === 'back' ? 'front' : 'back'))}><Ionicons name="camera-reverse-outline" size={22} color="#fff" /></TouchableOpacity>
            </View>
            <View style={s.fullBottomRow}>
              <TouchableOpacity style={s.wheelSizeButton}><Text style={s.wheelSizeText}>17"</Text></TouchableOpacity>
              <TouchableOpacity style={[s.captureButton, { borderWidth: 2, borderColor: '#fff' }]} onPress={takePicture}><View style={[s.captureInner, { backgroundColor: colors.primary }]} /></TouchableOpacity>
              <TouchableOpacity style={s.wheelStyleButton}><Ionicons name="settings-outline" size={22} color="#fff" /></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

function HeaderIcon({ name, color, disabled }) {
  const dim = disabled ? 0.35 : 1;
  return (
    <View style={{ opacity: dim, marginLeft: 10 }}>
      <LinearGradient colors={['#EAF2FF', '#FFFFFF']} style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={`${name}-outline`.replace('-outline-outline', '-outline')} size={18} color={color.primary} />
      </LinearGradient>
    </View>
  );
}
function ToolbarIcon({ name, label, active, disabled }) {
  return (
    <View style={[s.tabItem, disabled && { opacity: 0.35 }]}>
      <View style={[s.tabIcon, active && { backgroundColor: '#cfe0ff' }]}>
        <Ionicons name={name} size={18} color={active ? '#1A1A1A' : '#6b7280'} />
      </View>
      <Text style={{ fontSize: 11, color: '#6b7280' }}>{label}</Text>
    </View>
  );
}
function SectionHeader({ icon, text, colors }) {
  return (
    <View style={s.sectionHeader}>
      <LinearGradient colors={['#EAF2FF', '#FFFFFF']} style={s.sectionIcon}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </LinearGradient>
      <Text style={s.sectionTitle}>{text}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: { borderRadius: 24, padding: 14, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 16, shadowOffset: { width: 0, height: 12 }, elevation: 10 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8, marginBottom: 6 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' }, headerRight: { flexDirection: 'row', alignItems: 'center' },
  logoWrap: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  title: { fontSize: 22, fontWeight: '700' },
  toolbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, borderRadius: 16, borderWidth: 1, marginTop: 10, marginBottom: 8 },

  camContainer: { marginTop: 8, marginBottom: 12, borderRadius: 18, overflow: 'hidden', height: width * 0.75, position: 'relative', backgroundColor: '#000' },
  arOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
  detectionFrame: { width: 220, height: 220, borderWidth: 2, borderRadius: 110, borderStyle: 'dashed' },
  arInstructions: { position: 'absolute', bottom: 22, backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, fontSize: 14 },

  topControls: { position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between' },
  controlButton: { backgroundColor: 'rgba(0,0,0,0.55)', padding: 10, borderRadius: 22, marginLeft: 8 },

  bottomControls: { position: 'absolute', bottom: 12, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  wheelSizeButton: { backgroundColor: 'rgba(0,0,0,0.7)', padding: 12, borderRadius: 24, minWidth: 50, alignItems: 'center' },
  wheelSizeText: { color: 'white', fontSize: 15, fontWeight: 'bold' },
  captureButton: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
  captureInner: { width: 50, height: 50, borderRadius: 25 },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  sectionIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#6b7280' },

  hList: { paddingVertical: 10 },
  wheelItem: { width: 120, height: 120, borderRadius: 16, marginRight: 14, backgroundColor: '#f3f4f6', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 4 },
  priceTag: { position: 'absolute', bottom: 6, left: 6, backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, elevation: 3 },
  priceText: { fontSize: 12, fontWeight: '700' },

  colorBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 12, padding: 6, borderRadius: 12, backgroundColor: '#fff' },
  colorDot: { width: 28, height: 28, borderRadius: 14, borderWidth: 1 },

  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  ctaWrap: { flex: 1, marginRight: 10, borderRadius: 14, overflow: 'hidden' },
  ctaGrad: { paddingVertical: 14, alignItems: 'center', borderRadius: 14 },
  ctaText: { color: '#fff', fontWeight: '800', letterSpacing: 0.5 },
  shareBtn: { height: 52, paddingHorizontal: 18, borderRadius: 14, borderWidth: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#fff' },
  shareText: { fontWeight: '800', marginLeft: 8 },

  fullOverlay: { ...RNStyleSheet.absoluteFillObject, justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, paddingBottom: 24 },
  fullTopRow: { width: '100%', paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' },
  fullBottomRow: { width: '100%', paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  fullBtn: { backgroundColor: 'rgba(0,0,0,0.55)', padding: 12, borderRadius: 24 },
});
