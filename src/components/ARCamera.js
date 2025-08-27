// src/components/ARCamera.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, PanResponder, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ARCamera = ({ selectedWheel, onCapture, onClose }) => {
  const camRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaGranted, setMediaGranted] = useState(false);
  const [facing, setFacing] = useState('back'); // 'back' | 'front'
  const [isDetecting, setIsDetecting] = useState(false);

  // Overlay states
  const [wheelPosition] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  const [wheelScale] = useState(new Animated.Value(1));
  const [wheelRotation] = useState(new Animated.Value(0));

  // ขอสิทธิ์กล้อง
  useEffect(() => { if (!permission?.granted) requestPermission(); }, [permission]);

  // ขอสิทธิ์ Media Library (สำหรับบันทึกรูปลงแกลเลอรี)
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setMediaGranted(status === 'granted');
    })();
  }, []);

  // เดโมสลับสถานะตรวจจับ
  useEffect(() => {
    const t = setInterval(() => setIsDetecting(p => !p), 2000);
    return () => clearInterval(t);
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      wheelPosition.setOffset({ x: wheelPosition.x._value, y: wheelPosition.y._value });
    },
    onPanResponderMove: Animated.event(
      [null, { dx: wheelPosition.x, dy: wheelPosition.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => wheelPosition.flattenOffset(),
  });

  const handleZoom = (scale) =>
    Animated.spring(wheelScale, { toValue: scale, useNativeDriver: true }).start();

  const rotateWheel = () =>
    Animated.timing(wheelRotation, { toValue: wheelRotation._value + 90, duration: 500, useNativeDriver: true }).start();

  // บันทึกไฟล์: สำเนาในโฟลเดอร์แอป + ลงแกลเลอรี (ถ้าอนุญาต)
  const savePhotoAsync = async (uri) => {
    // 1) โฟลเดอร์ของแอป
    const dir = FileSystem.documentDirectory + 'photos';
    const info = await FileSystem.getInfoAsync(dir);
    if (!info.exists) await FileSystem.makeDirectoryAsync(dir, { intermediates: true });

    const dest = `${dir}/AR_${Date.now()}.jpg`;
    await FileSystem.copyAsync({ from: uri, to: dest });

    // 2) แกลเลอรี (Android/iOS)
    if (mediaGranted) {
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('ARWheelApp', asset, false).catch(() => {});
    }

    Alert.alert('สำเร็จ', 'บันทึกรูปภาพเรียบร้อยแล้ว');
    return dest;
  };

  if (!permission) return <View style={styles.center}><Text>Checking camera permission...</Text></View>;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>ต้องการสิทธิ์กล้อง</Text>
        <TouchableOpacity style={styles.controlButton} onPress={requestPermission}>
          <Text style={{ color: '#fff' }}>Grant</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={camRef}>
        {/* AR Overlay */}
        <View style={styles.overlay}>
          <View style={[styles.detectionFrame, { borderColor: isDetecting ? '#00ff00' : '#ff0000' }]}>
            <Text style={styles.detectionText}>{isDetecting ? 'พบล้อรถ' : 'กำลังค้นหา...'}</Text>
          </View>

          {selectedWheel && isDetecting && (
            <Animated.View
              style={{
                position: 'absolute',
                transform: [
                  { translateX: wheelPosition.x },
                  { translateY: wheelPosition.y },
                  { scale: wheelScale },
                  {
                    rotate: wheelRotation.interpolate({
                      inputRange: [0, 360],
                      outputRange: ['0deg', '360deg']
                    })
                  }
                ],
                alignItems: 'center',
                justifyContent: 'center'
              }}
              {...panResponder.panHandlers}
            >
              <View style={[styles.wheelPreview, { backgroundColor: getWheelColor(selectedWheel?.color) }]}>
                <View style={styles.wheelCenter} />
                <Text style={styles.wheelName}>{selectedWheel?.name}</Text>
              </View>
            </Animated.View>
          )}
        </View>

        {/* Top Controls */}
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.controlButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.infoPanel}>
            {selectedWheel && <Text style={styles.selectedWheelText}>{selectedWheel.name} - {selectedWheel.brand}</Text>}
          </View>

          <TouchableOpacity style={styles.controlButton} onPress={() => setFacing(p => (p === 'back' ? 'front' : 'back'))}>
            <Ionicons name="camera-reverse" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleZoom(wheelScale._value * 1.2)}>
            <Ionicons name="add" size={20} color="white" />
            <Text style={styles.actionText}>ขยาย</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.captureButton}
            onPress={async () => {
              try {
                const photo = await camRef.current?.takePictureAsync?.({ skipProcessing: true, quality: 1 });
                if (photo?.uri) {
                  const savedPath = await savePhotoAsync(photo.uri);
                  onCapture && onCapture({ ...photo, savedPath });
                }
              } catch (e) {
                console.warn('capture failed', e);
                Alert.alert('ข้อผิดพลาด', 'ไม่สามารถบันทึกรูปได้');
              }
            }}
          >
            <View className="captureInner" style={styles.captureInner} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={rotateWheel}>
            <Ionicons name="refresh" size={20} color="white" />
            <Text style={styles.actionText}>หมุน</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const getWheelColor = (name) => {
  const m = {
    Silver:'#c0c0c0', Black:'#333333', White:'#ffffff', Gunmetal:'#666666', Chrome:'#e5e5e5',
    'Matte Black':'#1a1a1a', Anthracite:'#4a4a4a', Polished:'#f0f0f0', Titanium:'#878681',
    Carbon:'#2c2c2c', Gold:'#ffd700', Brushed:'#d4d4d4', 'Matte Grey':'#808080',
    Orange:'#ff6600', 'Gloss Carbon':'#1a1a1a', Platinum:'#e5e4e2', Red:'#cc0000',
    'Rose Gold':'#e8b4b8', 'Matte Carbon':'#2c2c2c'
  };
  return m[name] || '#c0c0c0';
};

const styles = StyleSheet.create({
  container:{ flex:1 },
  center:{ flex:1, alignItems:'center', justifyContent:'center' },
  camera:{ flex:1 },
  overlay:{ position:'absolute', top:0, left:0, right:0, bottom:0, justifyContent:'center', alignItems:'center' },
  detectionFrame:{ width:200, height:200, borderWidth:3, borderRadius:100, borderStyle:'dashed', justifyContent:'center', alignItems:'center' },
  detectionText:{ color:'white', fontSize:14, fontWeight:'bold', textAlign:'center', backgroundColor:'rgba(0,0,0,0.7)', paddingHorizontal:10, paddingVertical:5, borderRadius:10 },
  wheelPreview:{ width:100, height:100, borderRadius:50, justifyContent:'center', alignItems:'center', borderWidth:2, borderColor:'#333', position:'relative' },
  wheelCenter:{ width:30, height:30, borderRadius:15, backgroundColor:'#333', position:'absolute' },
  wheelName:{ position:'absolute', bottom:-25, color:'white', fontSize:12, fontWeight:'bold', textAlign:'center', backgroundColor:'rgba(0,0,0,0.7)', paddingHorizontal:8, paddingVertical:2, borderRadius:8 },
  topControls:{ position:'absolute', top:50, left:20, right:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  controlButton:{ backgroundColor:'rgba(0,0,0,0.6)', padding:12, borderRadius:25 },
  infoPanel:{ backgroundColor:'rgba(0,0,0,0.6)', paddingHorizontal:15, paddingVertical:8, borderRadius:20, maxWidth: width - 120 },
  selectedWheelText:{ color:'white', fontSize:14, fontWeight:'bold', textAlign:'center' },
  bottomControls:{ position:'absolute', bottom:40, left:20, right:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  actionButton:{ backgroundColor:'rgba(0,0,0,0.6)', padding:15, borderRadius:25, alignItems:'center', minWidth:60 },
  actionText:{ color:'white', fontSize:10, marginTop:4 },
  captureButton:{ width:80, height:80, borderRadius:40, backgroundColor:'white', justifyContent:'center', alignItems:'center' },
  captureInner:{ width:60, height:60, borderRadius:30, backgroundColor:'#667eea' }
});

export default ARCamera;
