// src/screens/HomeScreen.js
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import SearchBar from '../components/SearchBar'; // ถ้าไม่มีไฟล์นี้ให้เปลี่ยนเป็น TextInput

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

function WheelCard({ item, onPress, onToggleFav, fav }) {
  return (
    <TouchableOpacity style={[styles.card, { width: CARD_W }]} activeOpacity={0.9} onPress={onPress}>
      <Image source={{ uri: item.img }} style={styles.cardImg} />
      <TouchableOpacity style={styles.favBtn} onPress={onToggleFav}>
        <Ionicons name={fav ? 'heart' : 'heart-outline'} size={18} color={fav ? '#f43f5e' : '#e5e7eb'} />
      </TouchableOpacity>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cardSub} numberOfLines={1}>{item.brand}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
          <Text style={styles.cardPrice}>฿{item.price.toLocaleString()}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
          <Chip text={`${item.size}"`} />
          <Chip text={item.material} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Chip({ text }) {
  return (
    <View style={styles.chip}>
      <Text style={{ color: '#cbd5e1', fontSize: 11, fontWeight: '700' }}>{text}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
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
      onPress={() => navigation.navigate('ModelDetail', { model: {
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
      }})}
    />
  );

  // พื้นที่หน่วงด้านล่างให้พ้น custom tab bar
  const TAB_BAR_HEIGHT = 110;

  const ListHeader = () => (
    <View style={{ paddingHorizontal: SIDE }}>
      {/* header row: ARWheel (ซ้าย) + heart (ขวา) */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 4 }}>
        <Text style={{ color: '#fff', fontWeight: '900', fontSize: 22 }}>ARWheel</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Profile', { screen: 'Favorites' })} style={{ padding: 8 }}>
          <Ionicons name="heart-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 12 }}>
        <SearchBar value={q} onChangeText={setQ} onSubmitEditing={() => {}} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ color: '#fff', fontWeight: '900' }}>ล้อแม็กซ์แนะนำ</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Models')} style={styles.filterBtn}>
          <Ionicons name="options-outline" size={16} color="#cbd5e1" />
          <Text style={{ color: '#cbd5e1', marginLeft: 6, fontSize: 12, fontWeight: '700' }}>ตัวกรอง</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // กำหนด paddingTop ให้ SafeAreaView รองรับ StatusBar (Android) ด้วย
  const safeTop = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary, paddingTop: safeTop }}>
      <FlatList
        data={data}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: SIDE, marginBottom: GAP }}
        contentContainerStyle={{ paddingTop: 0, paddingBottom: TAB_BAR_HEIGHT + 24 }}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 0,
    backgroundColor: '#0c1117',
  },
  cardImg: { width: '100%', height: CARD_W * 0.62, backgroundColor: '#0a0f14' },
  favBtn: {
    position: 'absolute',
    top: 10, right: 10,
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#1f2937', backgroundColor: '#0c1117cc',
  },
  cardBody: { padding: 12, backgroundColor: '#0c1117' },
  cardTitle: { fontSize: 14, fontWeight: '900', color: '#fff' },
  cardSub: { fontSize: 12, marginTop: 2, color: '#9aa3af' },
  cardPrice: { fontSize: 14, fontWeight: '900', color: '#5B9BFF' },
  chip: {
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 10, backgroundColor: '#111827',
    borderWidth: 1, borderColor: '#1f2937',
  },
  filterBtn: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 10, backgroundColor: '#0c1117',
  },
});
