// src/screens/ARScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function ARScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isARActive, setIsARActive] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        Alert.alert('สำเร็จ', 'บันทึกรูปภาพแล้ว!');
      } catch (error) {
        Alert.alert('ข้อผิดพลาด', 'ไม่สามารถถ่ายรูปได้');
      }
    }
  };

  const toggleCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <Text>กำลังขอสิทธิ์เข้าถึงกล้อง...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>ไม่สามารถเข้าถึงกล้องได้</Text>
        <Text style={styles.permissionSubtext}>
          กรุณาอนุญาตให้แอปเข้าถึงกล้องในการตั้งค่า
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}
        ref={(ref) => setCameraRef(ref)}
      >
        {/* AR Overlay */}
        <View style={styles.arOverlay}>
          <View style={styles.detectionFrame} />
          <Text style={styles.arInstructions}>
            {isARActive ? 'กำลังตรวจจับล้อรถ...' : 'เล็งกล้องไปที่ล้อรถ'}
          </Text>
        </View>

        {/* Top Controls */}
        <View style={styles.topControls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setIsARActive(!isARActive)}
          >
            <Ionicons 
              name={isARActive ? "scan" : "scan-outline"} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={toggleCamera}>
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
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  permissionSubtext: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  camera: {
    flex: 1,
  },
  arOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detectionFrame: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#00ff00',
    borderRadius: 100,
    borderStyle: 'dashed',
  },
  arInstructions: {
    position: 'absolute',
    bottom: 150,
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  topControls: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 25,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wheelSizeButton: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 25,
    minWidth: 50,
    alignItems: 'center',
  },
  wheelSizeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#667eea',
  },
  wheelStyleButton: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 25,
  },
});