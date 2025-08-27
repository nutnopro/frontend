// src/screens/ARScreen.js
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function ARScreen() {
  const camRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back'); // 'back' | 'front'
  const [isARActive, setIsARActive] = useState(false);

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
        <Text>ต้องอนุญาตการเข้าถึงกล้อง</Text>
        <TouchableOpacity style={styles.controlButton} onPress={requestPermission}>
          <Text style={{ color: '#fff' }}>Grant</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={camRef} facing={facing}>
        {/* AR Overlay */}
        <View style={styles.arOverlay}>
          <View style={styles.detectionFrame} />
          <Text style={styles.arInstructions}>
            {isARActive ? 'กำลังตรวจจับล้อรถ...' : 'เล็งกล้องไปที่ล้อรถ'}
          </Text>
        </View>

        {/* Top Controls */}
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.controlButton} onPress={() => setIsARActive(v => !v)}>
            <Ionicons name={isARActive ? 'scan' : 'scan-outline'} size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={() => setFacing(p => (p === 'back' ? 'front' : 'back'))}>
            <Ionicons name="camera-reverse" size={24} color="white" />
          </TouchableOpacity>
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
            <Ionicons name="settings" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  camera: { flex: 1 },
  arOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
  detectionFrame: { width: 200, height: 200, borderWidth: 2, borderColor: '#00ff00', borderRadius: 100, borderStyle: 'dashed' },
  arInstructions: { position: 'absolute', bottom: 150, backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', padding: 10, borderRadius: 10, fontSize: 16, textAlign: 'center' },
  topControls: { position: 'absolute', top: 50, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between' },
  controlButton: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 15, borderRadius: 25 },
  bottomControls: { position: 'absolute', bottom: 40, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  wheelSizeButton: { backgroundColor: 'rgba(0,0,0,0.7)', padding: 15, borderRadius: 25, minWidth: 50, alignItems: 'center' },
  wheelSizeText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  captureButton: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
  captureInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#667eea' },
  wheelStyleButton: { backgroundColor: 'rgba(0,0,0,0.7)', padding: 15, borderRadius: 25 },
});
