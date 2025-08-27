// src/screens/FavoriteScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FavoriteCard = ({ item, onRemove, onViewAR }) => (
  <View style={styles.favoriteCard}>
    <View style={styles.cardImage}>
      <View style={styles.wheelImage} />
    </View>
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardBrand}>{item.brand}</Text>
      <Text style={styles.cardPrice}>฿{item.price}</Text>
      <Text style={styles.cardSize}>{item.size}" wheel</Text>
    </View>
    <View style={styles.cardActions}>
      <TouchableOpacity style={styles.arActionButton} onPress={onViewAR}>
        <Ionicons name="camera" size={20} color="#667eea" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Ionicons name="heart" size={20} color="#ff4444" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState([
    { id: 1, name: 'Sport Classic', brand: 'Racing Pro', price: '8,900', size: 15 },
    { id: 5, name: 'Ultra Sport', brand: 'Max Performance', price: '13,500', size: 17 },
    { id: 7, name: 'Super Sport', brand: 'Turbo Rim', price: '18,500', size: 18 },
  ]);

  const removeFavorite = (id) => {
    Alert.alert(
      'ลบรายการโปรด',
      'คุณต้องการลบรายการนี้ออกจากรายการโปรดหรือไม่?',
      [
        { text: 'ยกเลิก', style: 'cancel' },
        {
          text: 'ลบ',
          style: 'destructive',
          onPress: () => {
            setFavorites(prev => prev.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const viewInAR = (item) => {
    Alert.alert('AR Preview', `กำลังเปิดโหมด AR สำหรับ ${item.name}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>รายการโปรด</Text>
        <Text style={styles.headerSubtitle}>
          {favorites.length} รายการ
        </Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>ไม่มีรายการโปรด</Text>
          <Text style={styles.emptyText}>
            เลือกล้อแม็กซ์ที่คุณชอบและเพิ่มเป็นรายการโปรด
          </Text>
          <TouchableOpacity style={styles.browseButton}>
            <Text style={styles.browseButtonText}>เลือกดูล้อแม็กซ์</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.favoritesList}>
          {favorites.map((item) => (
            <FavoriteCard
              key={item.id}
              item={item}
              onRemove={() => removeFavorite(item.id)}
              onViewAR={() => viewInAR(item)}
            />
          ))}
        </ScrollView>
      )}
    </View>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  browseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoritesList: {
    flex: 1,
    padding: 15,
  },
  favoriteCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  wheelImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 5,
  },
  cardSize: {
    fontSize: 12,
    color: '#999',
  },
  cardActions: {
    alignItems: 'center',
  },
  arActionButton: {
    backgroundColor: '#f0f8ff',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#fff0f0',
    padding: 10,
    borderRadius: 20,
  },
});