// src/components/WheelCard.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WheelCard = ({ 
  wheel, 
  onPress, 
  onFavorite, 
  isFavorite, 
  showPrice = true,
  compact = false 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.card, compact && styles.compactCard]} 
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <View style={[styles.wheelImage, { backgroundColor: getWheelColor(wheel.color) }]}>
          <View style={styles.wheelRim} />
          {wheel.pattern && (
            <Text style={styles.patternText}>{wheel.pattern}</Text>
          )}
        </View>
        
        {onFavorite && (
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => onFavorite(wheel.id)}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={16} 
              color={isFavorite ? "#ff4444" : "#999"} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{wheel.name}</Text>
        <Text style={styles.brand} numberOfLines={1}>{wheel.brand}</Text>
        {showPrice && <Text style={styles.price}>฿{wheel.price}</Text>}
        {!compact && (
          <View style={styles.specs}>
            <Text style={styles.spec}>{wheel.material}</Text>
            {wheel.weight && <Text style={styles.spec}>{wheel.weight}</Text>}
          </View>
        )}
      </View>
    </TouchableOpacity>
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
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  compactCard: {
    padding: 10,
    marginBottom: 10,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 10,
  },
  wheelImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    position: 'relative',
  },
  wheelRim: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333',
    position: 'absolute',
  },
  patternText: {
    position: 'absolute',
    bottom: -15,
    fontSize: 8,
    color: '#666',
    textAlign: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  info: {
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 2,
  },
  brand: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
    marginBottom: 8,
  },
  specs: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  spec: {
    fontSize: 10,
    color: '#999',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginHorizontal: 2,
    marginVertical: 1,
  },
});

export default WheelCard;