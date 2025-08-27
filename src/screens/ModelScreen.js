// src/screens/ModelScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ModelCard = ({ model, onPress, onFavorite, isFavorite }) => (
  <TouchableOpacity style={styles.modelCard} onPress={onPress}>
    <View style={styles.modelImageContainer}>
      <View style={styles.modelImage} />
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={onFavorite}
      >
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={20} 
          color={isFavorite ? "#ff4444" : "#999"} 
        />
      </TouchableOpacity>
    </View>
    <View style={styles.modelInfo}>
      <Text style={styles.modelName}>{model.name}</Text>
      <Text style={styles.modelBrand}>{model.brand}</Text>
      <Text style={styles.modelPrice}>฿{model.price}</Text>
      <View style={styles.modelSpecs}>
        <Text style={styles.specText}>{model.size}"</Text>
        <Text style={styles.specText}>{model.material}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function ModelScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModel, setSelectedModel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: '15', name: '15"' },
    { id: '16', name: '16"' },
    { id: '17', name: '17"' },
    { id: '18', name: '18"' },
    { id: '19', name: '19"' },
  ];

  const models = [
    { id: 1, name: 'Sport Classic', brand: 'Racing Pro', price: '8,900', size: 15, material: 'Alloy' },
    { id: 2, name: 'Urban Style', brand: 'City Drive', price: '7,500', size: 15, material: 'Steel' },
    { id: 3, name: 'Performance Pro', brand: 'Racing Elite', price: '10,500', size: 16, material: 'Alloy' },
    { id: 4, name: 'Modern Design', brand: 'Urban Tech', price: '9,800', size: 16, material: 'Forged' },
    { id: 5, name: 'Ultra Sport', brand: 'Max Performance', price: '13,500', size: 17, material: 'Carbon' },
    { id: 6, name: 'Executive Line', brand: 'Luxury Motors', price: '15,800', size: 17, material: 'Forged' },
    { id: 7, name: 'Super Sport', brand: 'Turbo Rim', price: '18,500', size: 18, material: 'Carbon' },
    { id: 8, name: 'Luxury Sport', brand: 'Diamond Cut', price: '21,200', size: 18, material: 'Forged' },
    { id: 9, name: 'Ultimate Sport', brand: 'Extreme Performance', price: '25,500', size: 19, material: 'Carbon' },
    { id: 10, name: 'Luxury Master', brand: 'Platinum Series', price: '28,900', size: 19, material: 'Forged' },
  ];

  const filteredModels = selectedCategory === 'all' 
    ? models 
    : models.filter(model => model.size.toString() === selectedCategory);

  const toggleFavorite = (modelId) => {
    setFavorites(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const openModelDetail = (model) => {
    setSelectedModel(model);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.categoryTextActive
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Models Grid */}
      <ScrollView style={styles.modelsContainer}>
        <View style={styles.modelsGrid}>
          {filteredModels.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              onPress={() => openModelDetail(model)}
              onFavorite={() => toggleFavorite(model.id)}
              isFavorite={favorites.includes(model.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Model Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            
            {selectedModel && (
              <>
                <View style={styles.modalImageContainer}>
                  <View style={styles.modalImage} />
                </View>
                
                <Text style={styles.modalTitle}>{selectedModel.name}</Text>
                <Text style={styles.modalBrand}>{selectedModel.brand}</Text>
                <Text style={styles.modalPrice}>฿{selectedModel.price}</Text>
                
                <View style={styles.modalSpecs}>
                  <View style={styles.specItem}>
                    <Text style={styles.specLabel}>ขนาด:</Text>
                    <Text style={styles.specValue}>{selectedModel.size} นิ้ว</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Text style={styles.specLabel}>วัสดุ:</Text>
                    <Text style={styles.specValue}>{selectedModel.material}</Text>
                  </View>
                </View>
                
                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.arButton}>
                    <Ionicons name="camera" size={20} color="white" />
                    <Text style={styles.arButtonText}>ทดลองด้วย AR</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.favoriteModalButton}
                    onPress={() => toggleFavorite(selectedModel.id)}
                  >
                    <Ionicons 
                      name={favorites.includes(selectedModel.id) ? "heart" : "heart-outline"} 
                      size={20} 
                      color={favorites.includes(selectedModel.id) ? "#ff4444" : "#333"} 
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  categoryContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  categoryButtonActive: {
    backgroundColor: '#667eea',
  },
  categoryText: {
    color: '#333',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: 'white',
  },
  modelsContainer: {
    flex: 1,
    padding: 10,
  },
  modelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modelCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modelImageContainer: {
    height: 120,
    backgroundColor: '#f0f0f0',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
  },
  modelInfo: {
    padding: 15,
  },
  modelName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  modelBrand: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  modelPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 10,
  },
  modelSpecs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specText: {
    fontSize: 11,
    color: '#999',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  modalImageContainer: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalBrand: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalSpecs: {
    marginBottom: 30,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  specLabel: {
    fontSize: 16,
    color: '#333',
  },
  specValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arButton: {
    backgroundColor: '#667eea',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  arButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  favoriteModalButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 25,
  },
});