// src/components/ARCamera.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ARCamera = ({ selectedWheel, onCapture, onClose }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isDetecting, setIsDetecting] = useState(false);
  const [wheelPosition] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  const [wheelScale] = useState(new Animated.Value(1));
  const [wheelRotation] = useState(new Animated.Value(0));

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    // Simulate AR detection
    const detectionInterval = setInterval(() => {
      setIsDetecting(prev => !prev);
    }, 2000);

    return () => clearInterval(detectionInterval);
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      wheelPosition.setOffset({
        x: wheelPosition.x._value,
        y: wheelPosition.y._value,
      });
    },
    onPanResponderMove: Animated.event(
      [null, { dx: wheelPosition.x, dy: wheelPosition.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      wheelPosition.flattenOffset();
    },
  });

  const handlePinchGesture = (scale) => {
    Animated.spring(wheelScale, {
      toValue: scale,
      useNativeDriver: true,
    }).start();
  };

  const rotateWheel = () => {
    Animated.timing(wheelRotation, {
      toValue: wheelRotation._value + 90,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  if (hasPermission === null) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.errorContainer}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}
        ref={setCameraRef}
      >
        {/* AR Overlay */}
        <View style={styles.overlay}>
          {/* Detection Frame */}
          <View style={[
            styles.detectionFrame,
            { borderColor: isDetecting ? '#00ff00' : '#ff0000' }
          ]}>
            <Text style={styles.detectionText}>
              {isDetecting ? 'พบล้อรถ' : 'กำลังค้นหา...'}
            </Text>
          </View>

          {/* Virtual Wheel */}
          {selectedWheel && isDetecting && (
            <Animated.View
              style={[
                styles.virtualWheel,
                {
                  transform: [
                    { translateX: wheelPosition.x },
                    { translateY: wheelPosition.y },
                    { scale: wheelScale },
                    { rotate: wheelRotation.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg']
                      })
                    }
                  ]
                }
              ]}
              {...panResponder.panHandlers}
            >
              <View style={[
                styles.wheelPreview,
                { backgroundColor: getWheelColor(selectedWheel.color) }
              ]}>
                <View style={styles.wheelCenter} />
                <Text style={styles.wheelName}>{selectedWheel.name}</Text>
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
            {selectedWheel && (
              <Text style={styles.selectedWheelText}>
                {selectedWheel.name} - {selectedWheel.brand}
              </Text>
            )}
          </View>

          <TouchableOpacity 
            style={styles.controlButton} 
            onPress={() => setCameraType(
              cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )}
          >
            <Ionicons name="camera-reverse" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handlePinchGesture(wheelScale._value * 1.2)}
          >
            <Ionicons name="add" size={20} color="white" />
            <Text style={styles.actionText}>ขยาย</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.captureButton}
            onPress={async () => {
              if (cameraRef) {
                const photo = await cameraRef.takePictureAsync();
                onCapture && onCapture(photo);
              }
            }}
          >
            <View style={styles.captureInner} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={rotateWheel}
          >
            <Ionicons name="refresh" size={20} color="white" />
            <Text style={styles.actionText}>หมุน</Text>
          </TouchableOpacity>
        </View>

        {/* Wheel Info Panel */}
        {selectedWheel && (
          <View style={styles.wheelInfoPanel}>
            <Text style={styles.wheelInfoTitle}>{selectedWheel.name}</Text>
            <Text style={styles.wheelInfoBrand}>{selectedWheel.brand}</Text>
            <Text style={styles.wheelInfoPrice}>฿{selectedWheel.price}</Text>
            <View style={styles.wheelInfoSpecs}>
              <Text style={styles.specInfo}>{selectedWheel.material}</Text>
              <Text style={styles.specInfo}>{selectedWheel.pattern}</Text>
              {selectedWheel.weight && (
                <Text style={styles.specInfo}>{selectedWheel.weight}</Text>
              )}
            </View>
          </View>
        )}
      </Camera>
    </View>
  );
};

const getWheelColor = (colorName) => {
  const colors = {
    'Silver': '#c0c0c0',
    'Black': '#333333',
    'White': '#ffffff',
    'Gunmetal': '#666666',
    'Chrome': '#e5e5e5',
    'Matte Black': '#1a1a1a',
    'Anthracite': '#4a4a4a',
    'Polished': '#f0f0f0',
    'Titanium': '#878681',
    'Carbon': '#2c2c2c',
    'Gold': '#ffd700',
    'Brushed': '#d4d4d4',
    'Matte Grey': '#808080',
    'Orange': '#ff6600',
    'Gloss Carbon': '#1a1a1a',
    'Platinum': '#e5e4e2',
    'Red': '#cc0000',
    'Rose Gold': '#e8b4b8',
    'Matte Carbon': '#2c2c2c',
  };
  return colors[colorName] || '#c0c0c0';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  overlay: {
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
    borderWidth: 3,
    borderRadius: 100,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detectionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  virtualWheel: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
    position: 'relative',
  },
  wheelCenter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333',
    position: 'absolute',
  },
  wheelName: {
    position: 'absolute',
    bottom: -25,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  topControls: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
    borderRadius: 25,
  },
  infoPanel: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    maxWidth: width - 120,
  },
  selectedWheelText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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
  actionButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    minWidth: 60,
  },
  actionText: {
    color: 'white',
    fontSize: 10,
    marginTop: 4,
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
  wheelInfoPanel: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 15,
    padding: 15,
  },
  wheelInfoTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  wheelInfoBrand: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  wheelInfoPrice: {
    color: '#667eea',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  wheelInfoSpecs: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  specInfo: {
    color: 'white',
    fontSize: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginHorizontal: 3,
    marginVertical: 2,
  },
});

export default ARCamera;