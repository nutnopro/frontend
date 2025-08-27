// src/screens/HomeScreen.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WheelCard = ({ wheel, onPress }) => (
  <TouchableOpacity style={styles.wheelCard} onPress={onPress}>
    <View style={styles.wheelPreview}>
      <View style={styles.wheelRim} />
    </View>
    <Text style={styles.wheelName}>{wheel.name}</Text>
    <Text style={styles.wheelBrand}>{wheel.brand}</Text>
    <Text style={styles.wheelPrice}>฿{wheel.price}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const featuredWheels = [
    { id: 1, name: 'Sport Pro', brand: 'Racing Elite', price: '12,500' },
    { id: 2, name: 'Urban Style', brand: 'City Drive', price: '9,800' },
    { id: 3, name: 'Luxury Master', brand: 'Premium Line', price: '18,500' },
    { id: 4, name: 'Street Racing', brand: 'Speed Max', price: '15,200' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ยินดีต้อนรับสู่ AR Wheel</Text>
        <Text style={styles.headerSubtitle}>ทดลองล้อแม็กซ์ด้วยเทคโนโลยี AR</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="camera" size={30} color="#667eea" />
          <Text style={styles.actionText}>เปิดกล้อง AR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="cube" size={30} color="#667eea" />
          <Text style={styles.actionText}>ดูโมเดล 3D</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart" size={30} color="#667eea" />
          <Text style={styles.actionText}>รายการโปรด</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ล้อแม็กซ์แนะนำ</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredWheels.map((wheel) => (
            <WheelCard
              key={wheel.id}
              wheel={wheel}
              onPress={() => console.log('Selected wheel:', wheel.name)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ขนาดยอดนิยม</Text>
        <View style={styles.sizeButtons}>
          {['15"', '16"', '17"', '18"', '19"'].map((size) => (
            <TouchableOpacity key={size} style={styles.sizeButton}>
              <Text style={styles.sizeText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
  },
  actionButton: {
    alignItems: 'center',
    padding: 15,
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    margin: 10,
    padding: 20,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  wheelCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    width: 150,
    alignItems: 'center',
  },
  wheelPreview: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  wheelRim: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#666',
  },
  wheelName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  wheelBrand: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  wheelPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
    marginTop: 5,
  },
  sizeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sizeButton: {
    backgroundColor: '#667eea',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sizeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});