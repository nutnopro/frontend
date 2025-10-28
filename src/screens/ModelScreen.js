// src/screens/ModelScreen.js
import React, { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, Modal, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const GAP = 14, SIDE = 16;
const CARD_W = (width - SIDE * 2 - GAP) / 2;

const SIZES = [
  { id: 'all', name: 'ทั้งหมด' }, { id: '15', name: '15"' }, { id: '16', name: '16"' }, { id: '17', name: '17"' }, { id: '18', name: '18"' },
];

const PLACE_IMG = 'https://images.unsplash.com/photo-1617469165781-8dca0d24dd47?q=80&w=640&auto=format&fit=crop';
const MODELS = [
  { id: 1, name: 'Sport Classic', brand: 'Racing Pro', price: '8,900', size: 15, material: 'Alloy', img: PLACE_IMG },
  { id: 2, name: 'Urban Style', brand: 'City Drive', price: '7,500', size: 15, material: 'Steel', img: 'https://images.unsplash.com/photo-1595717579655-587eb7c1575e?q=80&w=640&auto=format&fit=crop' },
  { id: 3, name: 'Performance Pro', brand: 'Racing Elite', price: '10,500', size: 16, material: 'Alloy', img: 'https://images.unsplash.com/photo-1517946132621-7a3bb2f0b2ae?q=80&w=640&auto=format&fit=crop' },
  { id: 4, name: 'Modern Design', brand: 'Urban Tech', price: '9,800', size: 16, material: 'Forged', img: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=640&auto=format&fit=crop' },
];

function Header({ colors }) {
  return (
    <View style={[styles.headerCard, { backgroundColor: colors.card }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <LinearGradient colors={['#EAF2FF', '#FFFFFF']} style={styles.logoWrap}>
          <Ionicons name="car-sport" size={22} color={colors.primary} />
        </LinearGradient>
        <Text style={[styles.headerTitle, { color: colors.text }]}>AR Wheel</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <HeaderIcon name="search" colors={colors} />
        <HeaderIcon name="heart" colors={colors} />
        <HeaderIcon name="cart" colors={colors} disabled />
      </View>
    </View>
  );
}
function HeaderIcon({ name, colors, disabled }) {
  return (
    <View style={{ opacity: disabled ? 0.35 : 1, marginLeft: 10 }}>
      <LinearGradient colors={['#EAF2FF', '#FFFFFF']} style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={`${name}-outline`.replace('-outline-outline', '-outline')} size={18} color={colors.primary} />
      </LinearGradient>
    </View>
  );
}
function SizeChip({ label, active, onPress, colors }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.95} style={[styles.chip, active && styles.chipActive]}>
      {active ? (
        <LinearGradient colors={[colors.primary, colors.primaryPressed]} style={styles.chipGrad}>
          <Text style={styles.chipTextActive}>{label}</Text>
        </LinearGradient>
      ) : (
        <Text style={[styles.chipText, { color: colors.primary }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
function Tag({ text }) {
  return <View style={styles.tag}><Text style={styles.tagText}>{text}</Text></View>;
}

export default function ModelScreen() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState('all');
  const [favs, setFavs] = useState({});
  const [detail, setDetail] = useState(null);

  const data = useMemo(() => (filter === 'all' ? MODELS : MODELS.filter((m) => String(m.size) === filter)), [filter]);
  const toggleFav = (id) => setFavs((p) => ({ ...p, [id]: !p[id] }));

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: colors.card, width: CARD_W }]}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: item.img }} style={styles.image} />
        <TouchableOpacity style={styles.favBtn} onPress={() => toggleFav(item.id)}>
          <Ionicons name={favs[item.id] ? 'heart' : 'heart-outline'} size={20} color={favs[item.id] ? '#f43f5e' : '#9ca3af'} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.9} onPress={() => setDetail(item)}>
        <View style={{ padding: 12 }}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
          <Text style={[styles.brand, { color: colors.textDim }]} numberOfLines={1}>{item.brand}</Text>
          <Text style={[styles.price, { color: colors.primary }]}>฿{item.price}</Text>
          <View style={{ flexDirection: 'row', marginTop: 6 }}>
            <Tag text={`${item.size}"`} /><Tag text={item.material} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={[colors.primary, colors.primaryPressed]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: SIDE, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <Header colors={colors} />
        <View style={[styles.filterBar, { backgroundColor: colors.card }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {SIZES.map((s) => (
              <SizeChip key={s.id} label={s.name} active={filter === s.id} onPress={() => setFilter(s.id)} colors={colors} />
            ))}
          </ScrollView>
        </View>
        <FlatList
          data={data}
          keyExtractor={(it) => String(it.id)}
          numColumns={2}
          renderItem={renderItem}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: GAP }}
          scrollEnabled={false}
          contentContainerStyle={{ paddingTop: 6 }}
        />
      </ScrollView>

      {/* modal detail เหมือนเดิม (ไม่แก้สีอื่น) */}
      {/* ...ของเดิมในไฟล์คุณใช้งานได้ต่อเลย... */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    borderRadius: 24, padding: 16, marginBottom: 12, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 14, shadowOffset: { width: 0, height: 8 }, elevation: 6,
  },
  logoWrap: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  headerTitle: { fontSize: 24, fontWeight: '800' },

  filterBar: { borderRadius: 16, paddingVertical: 10, paddingHorizontal: 8, marginBottom: 12 },
  chip: { minWidth: 74, height: 44, backgroundColor: '#eef0f8', borderRadius: 12, marginHorizontal: 6, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
  chipActive: { backgroundColor: 'transparent', padding: 0 },
  chipGrad: { width: 94, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  chipText: { fontWeight: '700' }, chipTextActive: { color: '#fff', fontWeight: '800' },

  card: { borderRadius: 18, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 5 },
  imageWrap: { width: '100%', height: CARD_W * 0.62, backgroundColor: '#f5f5f7', alignItems: 'center', justifyContent: 'center' },
  image: { width: '80%', height: '80%', resizeMode: 'contain' },
  favBtn: { position: 'absolute', top: 10, right: 10, width: 34, height: 34, borderRadius: 17, backgroundColor: '#ffffffdd', alignItems: 'center', justifyContent: 'center' },

  name: { fontSize: 16, fontWeight: '800' },
  brand: { fontSize: 13, marginTop: 2 },
  price: { fontSize: 16, fontWeight: '900', marginTop: 8 },

  tag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, backgroundColor: '#eef1f6', marginRight: 8 },
  tagText: { fontSize: 12, color: '#6b7280', fontWeight: '600' },
});
