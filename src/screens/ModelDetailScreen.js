// src/screens/ModelDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function ModelDetailScreen({ route, navigation }) {
  const { colors } = useTheme();
  const model = route.params?.model || {
    name: 'model_name',
    price: 8000,
    colors: ['#c49a6c', '#6e6e6e', '#161616'],
    diameter: '17"',
    width: '7.5J',
    offset: 'ET+35',
    bolt: '5x114.3',
    material: 'aluminum alloy',
    weight: '8.2 kg',
    brand: 'brand AAA',
    origin: 'made in japan',
    img: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=1200&auto=format&fit=crop',
  };

  const swatches = model.colors || ['#c49a6c', '#6e6e6e', '#161616'];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* ภาพด้านบน */}
      <View style={{ backgroundColor: colors.card }}>
        <Image source={{ uri: model.img }} style={styles.preview} />
        {/* ปุ่มย้อนกลับ + favorite */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="heart-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* เนื้อหา */}
      <View style={{ padding: 16 }}>
        <Text style={[styles.title, { color: colors.text }]}>{model.name}</Text>
        <Text style={[styles.price, { color: colors.primary }]}>฿{Number(model.price).toLocaleString()}</Text>

        {/* swatches */}
        <View style={{ flexDirection: 'row', gap: 10, marginVertical: 12 }}>
          {swatches.map((c) => (
            <View key={c} style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: c, borderWidth: 1, borderColor: colors.border }} />
          ))}
        </View>

        {/* สเปค */}
        <View style={[styles.specBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {[
            ['diameter', model.diameter || '—'],
            ['width', model.width || '—'],
            ['offset', model.offset || '—'],
            ['bolt size', model.bolt || '—'],
            ['material', model.material || '—'],
            ['weight', model.weight || '—'],
            ['brand', model.brand || '—'],
            ['country of origin', model.origin || '—'],
          ].map(([k, v]) => (
            <View key={k} style={styles.specRow}>
              <Text style={[styles.specKey, { color: colors.textDim }]}>{k}</Text>
              <Text style={[styles.specVal, { color: colors.text }]}>{v}</Text>
            </View>
          ))}
        </View>

        {/* ปุ่มด้านล่าง */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.favBtn, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <Ionicons name="heart-outline" size={18} color={colors.text} />
            <Text style={{ marginLeft: 8, color: colors.text, fontWeight: '700' }}>Add to favorite</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.arBtn, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('AR')}>
            <Ionicons name="camera" size={18} color="#fff" />
            <Text style={{ marginLeft: 8, color: '#fff', fontWeight: '700' }}>View in AR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  preview: { width: '100%', height: 240, resizeMode: 'cover' },
  topBar: { position: 'absolute', top: 10, left: 10, right: 10, flexDirection: 'row', justifyContent: 'space-between' },
  iconBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#00000066', alignItems: 'center', justifyContent: 'center' },

  title: { fontSize: 22, fontWeight: '900' },
  price: { marginTop: 6, fontSize: 18, fontWeight: '900' },

  specBox: { borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 4 },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#0000' },
  specKey: { fontSize: 13, textTransform: 'capitalize' },
  specVal: { fontSize: 13, fontWeight: '700' },

  actionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 },
  favBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderRadius: 12, borderWidth: 1, flex: 1, marginRight: 10 },
  arBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12 },
});
