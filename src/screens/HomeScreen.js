// src/screens/HomeScreen.js
import React, { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
  Dimensions, FlatList, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import SearchBar from '../components/SearchBar';

const { width } = Dimensions.get('window');
const SIDE = 16;
const GAP = 12;
const CARD_W = (width - SIDE * 2 - GAP) / 2;

const MODELS = [
  { id: 1, name: 'Sport Classic', brand: 'Racing Pro',  price: 8900, size: 15, material: 'Alloy',  img: 'https://images.unsplash.com/photo-1617469165781-8dca0d24dd47?q=80&w=640&auto=format&fit=crop' },
  { id: 2, name: 'Urban Style',   brand: 'City Drive',  price: 7500, size: 15, material: 'Steel',  img: 'https://images.unsplash.com/photo-1595717579655-587eb7c1575e?q=80&w=640&auto=format&fit=crop' },
  { id: 3, name: 'Performance Pro',brand:'Racing Elite', price:10500, size: 16, material: 'Alloy',  img: 'https://images.unsplash.com/photo-1517946132621-7a3bb2f0b2ae?q=80&w=640&auto=format&fit=crop' },
  { id: 4, name: 'Modern Design', brand:'Urban Tech',    price: 9800, size: 16, material: 'Forged', img: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=640&auto=format&fit=crop' },
  { id: 5, name: 'Ultra Sport',    brand:'Max Perf.',     price:12800, size: 17, material: 'Alloy',  img: 'https://images.unsplash.com/photo-1558980394-0c6232b361ab?q=80&w=640&auto=format&fit=crop' },
  { id: 6, name: 'Executive Line', brand:'Luxury Motors', price:15800, size: 17, material: 'Forged', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=640&auto=format&fit=crop' },
];

function Chip({ text }) {
  return (
    <View style={styles.chip}>
      <Text style={{ color: '#cbd5e1', fontSize: 11, fontWeight: '700' }}>{text}</Text>
    </View>
  );
}

function WheelCard({ item, onPress, onToggleFav, fav }) {
  return (
    <TouchableOpacity
      style={[styles.card, { width: CARD_W, backgroundColor: '#0c1117' }]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Image source={{ uri: item.img }} style={styles.cardImg} />
      <TouchableOpacity
        style={[styles.favBtn, { backgroundColor: '#0c1117cc', borderColor: '#1f2937' }]}
        onPress={onToggleFav}
      >
        <Ionicons name={fav ? 'heart' : 'heart-outline'} size={18} color={fav ? '#f43f5e' : '#e5e7eb'} />
      </TouchableOpacity>
      <View style={styles.cardBody}>
        <Text style={[styles.cardTitle, { color: '#fff' }]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.cardSub, { color: '#9aa3af' }]} numberOfLines={1}>{item.brand}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
          <Text style={[styles.cardPrice, { color: '#5B9BFF' }]}>฿{item.price.toLocaleString()}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
          <Chip text={`${item.size}"`} />
          <Chip text={item.material} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [q, setQ] = useState('');
  const [favs, setFavs] = useState({});

  const data = useMemo(() => {
    if (!q.trim()) return MODELS;
    const k = q.trim().toLowerCase();
    return MODELS.filter(m =>
      m.name.toLowerCase().includes(k) ||
      m.brand.toLowerCase().includes(k) ||
      String(m.size).includes(k) ||
      m.material.toLowerCase().includes(k)
    );
  }, [q]);

  const toggleFav = (id) => setFavs((p) => ({ ...p, [id]: !p[id] }));

  const renderItem = ({ item }) => (
    <WheelCard
      item={item}
      fav={!!favs[item.id]}
      onToggleFav={() => toggleFav(item.id)}
      onPress={() => navigation.navigate('ModelDetail', {
        model: {
          name: item.name,
          price: item.price,
          colors: ['#c49a6c', '#6e6e6e', '#161616'],
          diameter: `${item.size}"`,
          width: '7.5J',
          offset: 'ET+35',
          bolt: '5x114.3',
          material: item.material,
          weight: '8.6 kg',
          brand: item.brand,
          origin: 'made in japan',
          img: item.img,
        }
      })}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }} edges={['top']}>
      {/* ทำให้ตัวอักษรอ่านง่ายบนพื้นหลังเข้ม */}
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <ScrollView
        style={{ flex: 1, backgroundColor: colors.primary }}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Header: ARWheel + หัวใจ (เว้นระยะจาก safe area แล้ว) */}
        <View
          style={{
            paddingTop: 8,              // ระยะเผื่อใต้รอยบาก
            paddingHorizontal: SIDE,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '900', fontSize: 22 }}>ARWheel</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', { screen: 'Favorites' })}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="heart-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* SearchBar */}
        <View style={{ paddingHorizontal: SIDE, marginTop: 10 }}>
          <SearchBar value={q} onChangeText={setQ} onSubmitEditing={() => {}} />
        </View>

        {/* ล้อแม็กซ์แนะนำ + ปุ่มตัวกรอง */}
        <View
          style={{
            paddingHorizontal: SIDE,
            marginTop: 16,
            marginBottom: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '900' }}>ล้อแม็กซ์แนะนำ</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Models')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 10,
              backgroundColor: '#0c1117',
            }}
          >
            <Ionicons name="options-outline" size={16} color="#cbd5e1" />
            <Text style={{ color: '#cbd5e1', marginLeft: 6, fontSize: 12, fontWeight: '700' }}>ตัวกรอง</Text>
          </TouchableOpacity>
        </View>

        {/* Grid 2 คอลัมน์ (เลื่อนแนวตั้ง) */}
        <View style={{ paddingHorizontal: SIDE }}>
          <FlatList
            data={data}
            keyExtractor={(it) => String(it.id)}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: GAP }}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 0,
  },
  cardImg: { width: '100%', height: CARD_W * 0.62, backgroundColor: '#0a0f14' },
  favBtn: {
    position: 'absolute',
    top: 10, right: 10,
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1,
  },
  cardBody: { padding: 12, backgroundColor: '#0c1117' },
  cardTitle: { fontSize: 14, fontWeight: '900' },
  cardSub: { fontSize: 12, marginTop: 2 },
  cardPrice: { fontSize: 14, fontWeight: '900' },
  chip: {
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 10, backgroundColor: '#111827',
    borderWidth: 1, borderColor: '#1f2937',
  },
});
