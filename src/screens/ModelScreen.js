// src/screens/ModelScreen.js
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const GAP = 14;
const SIDE = 16;
const CARD_W = (width - SIDE * 2 - GAP) / 2;

const SIZES = [
  { id: 'all', name: 'ทั้งหมด' },
  { id: '15', name: '15"' },
  { id: '16', name: '16"' },
  { id: '17', name: '17"' },
  { id: '18', name: '18"' },
];

const PLACE_IMG =
  'https://images.unsplash.com/photo-1617469165781-8dca0d24dd47?q=80&w=640&auto=format&fit=crop';

// เพิ่มรูปทดลองให้แต่ละโมเดล
const MODELS = [
  { id: 1, name: 'Sport Classic', brand: 'Racing Pro',  price: '8,900', size: 15, material: 'Alloy',  img: PLACE_IMG },
  { id: 2, name: 'Urban Style',   brand: 'City Drive',  price: '7,500', size: 15, material: 'Steel',  img: 'https://images.unsplash.com/photo-1595717579655-587eb7c1575e?q=80&w=640&auto=format&fit=crop' },
  { id: 3, name: 'Performance Pro',brand: 'Racing Elite',price: '10,500',size: 16, material: 'Alloy',  img: 'https://images.unsplash.com/photo-1517946132621-7a3bb2f0b2ae?q=80&w=640&auto=format&fit=crop' },
  { id: 4, name: 'Modern Design',  brand: 'Urban Tech',  price: '9,800', size: 16, material: 'Forged', img: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=640&auto=format&fit=crop' },
  { id: 5, name: 'Ultra Sport',    brand: 'Max Performance', price: '13,500', size: 17, material: 'Carbon', img: PLACE_IMG },
  { id: 6, name: 'Executive Line', brand: 'Luxury Motors', price: '15,800', size: 17, material: 'Forged', img: PLACE_IMG },
  { id: 7, name: 'Super Sport',    brand: 'Turbo Rim',   price: '18,500', size: 18, material: 'Carbon', img: PLACE_IMG },
  { id: 8, name: 'Luxury Sport',   brand: 'Diamond Cut', price: '21,200', size: 18, material: 'Forged', img: PLACE_IMG },
  { id: 9, name: 'Ultimate Sport', brand: 'Extreme Perf.', price: '25,500', size: 19, material: 'Carbon', img: PLACE_IMG },
  { id:10, name: 'Luxury Master',  brand: 'Platinum Series', price: '28,900', size: 19, material: 'Forged', img: PLACE_IMG },
];

/* ---------- Small UI building blocks ---------- */
function Header({ colors }) {
  return (
    <View style={[styles.headerCard, { backgroundColor: colors.card }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <LinearGradient colors={['#e9ecff', '#ffffff']} style={styles.logoWrap}>
          <Ionicons name="car-sport" size={22} color={colors.primary} />
        </LinearGradient>
        <Text style={[styles.headerTitle, { color: colors.text }]}>AR Wheel</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <HeaderIcon name="search" />
        <HeaderIcon name="heart" />
        <HeaderIcon name="cart" disabled />
      </View>
    </View>
  );
}

function HeaderIcon({ name, disabled }) {
  const dim = disabled ? 0.35 : 1;
  return (
    <View style={{ opacity: dim, marginLeft: 10 }}>
      <LinearGradient
        colors={['#7b86ff', '#8a6ee8']}
        style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}
      >
        <Ionicons name={`${name}-outline`.replace('-outline-outline', '-outline')} size={18} color="#fff" />
      </LinearGradient>
    </View>
  );
}

function SizeChip({ label, active, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.95} style={[styles.chip, active && styles.chipActive]}>
      {active ? (
        <LinearGradient colors={['#7a86ff', '#7b5de8']} style={styles.chipGrad}>
          <Text style={styles.chipTextActive}>{label}</Text>
        </LinearGradient>
      ) : (
        <Text style={styles.chipText}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

function Tag({ text }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
}

/* ---------- Main Screen ---------- */
export default function ModelScreen() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState('all');
  const [favs, setFavs] = useState({});
  const [detail, setDetail] = useState(null);

  const data = useMemo(() => {
    if (filter === 'all') return MODELS;
    return MODELS.filter((m) => String(m.size) === filter);
  }, [filter]);

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
          <Text style={[styles.price, { color: '#6c79ff' }]}>฿{item.price}</Text>

          <View style={{ flexDirection: 'row', marginTop: 6 }}>
            <Tag text={`${item.size}"`} />
            <Tag text={item.material} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#6a76e7', '#6a2fb6']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: SIDE, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <Header colors={colors} />

        {/* ฟิลเตอร์ขนาด */}
        <View style={[styles.filterBar, { backgroundColor: colors.card }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {SIZES.map((s) => (
              <SizeChip
                key={s.id}
                label={s.name}
                active={filter === s.id}
                onPress={() => setFilter(s.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* กริดสินค้า 2 คอลัมน์ */}
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

      {/* โมดัลรายละเอียด */}
      <Modal visible={!!detail} animationType="slide" transparent onRequestClose={() => setDetail(null)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setDetail(null)}>
              <Ionicons name="close" size={22} color={colors.text} />
            </TouchableOpacity>

            {detail && (
              <>
                <View style={styles.modalImgWrap}>
                  <Image source={{ uri: detail.img }} style={styles.modalImg} />
                </View>

                <Text style={[styles.modalTitle, { color: colors.text }]}>{detail.name}</Text>
                <Text style={[styles.modalBrand, { color: colors.textDim }]}>{detail.brand}</Text>
                <Text style={styles.modalPrice}>฿{detail.price}</Text>

                <View style={styles.modalSpecs}>
                  <View style={styles.specRow}>
                    <Text style={[styles.specLabel, { color: colors.text }]}>ขนาด</Text>
                    <Text style={styles.specValue}>{detail.size}"</Text>
                  </View>
                  <View style={styles.specRow}>
                    <Text style={[styles.specLabel, { color: colors.text }]}>วัสดุ</Text>
                    <Text style={styles.specValue}>{detail.material}</Text>
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.arBtn}>
                    <Ionicons name="camera" size={18} color="#fff" />
                    <Text style={styles.arBtnText}>ทดลองด้วย AR</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.favCircle} onPress={() => toggleFav(detail.id)}>
                    <Ionicons name={favs[detail.id] ? 'heart' : 'heart-outline'} size={20} color={favs[detail.id] ? '#f43f5e' : '#333'} />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  headerCard: {
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  logoWrap: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  headerTitle: { fontSize: 24, fontWeight: '800' },

  filterBar: {
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  chip: {
    minWidth: 74, height: 44,
    backgroundColor: '#eef0f8',
    borderRadius: 12,
    marginHorizontal: 6,
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 12,
  },
  chipActive: { backgroundColor: 'transparent', padding: 0 },
  chipGrad: { width: 94, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  chipText: { color: '#6b72e8', fontWeight: '700' },
  chipTextActive: { color: '#fff', fontWeight: '800' },

  card: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  imageWrap: {
    width: '100%',
    height: CARD_W * 0.62,
    backgroundColor: '#f5f5f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '80%', height: '80%', resizeMode: 'contain' },
  favBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#ffffffdd',
    alignItems: 'center', justifyContent: 'center',
  },

  name: { fontSize: 16, fontWeight: '800' },
  brand: { fontSize: 13, marginTop: 2 },
  price: { fontSize: 16, fontWeight: '900', marginTop: 8 },

  tag: {
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 10, backgroundColor: '#eef1f6',
    marginRight: 8,
  },
  tagText: { fontSize: 12, color: '#6b7280', fontWeight: '600' },

  /* Modal */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalCard: {
    width: '90%', maxHeight: '82%',
    borderRadius: 20, padding: 18,
  },
  modalClose: { alignSelf: 'flex-end', padding: 4 },
  modalImgWrap: {
    height: 200, backgroundColor: '#f0f0f0', borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  modalImg: { width: 140, height: 140, resizeMode: 'contain' },
  modalTitle: { fontSize: 22, fontWeight: '800', textAlign: 'center' },
  modalBrand: { fontSize: 14, textAlign: 'center', marginTop: 2 },
  modalPrice: { fontSize: 26, fontWeight: '900', color: '#6c79ff', textAlign: 'center', marginTop: 10 },

  modalSpecs: { marginTop: 14, marginBottom: 18 },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomColor: '#f0f0f0', borderBottomWidth: 1 },
  specLabel: { fontSize: 15 },
  specValue: { fontSize: 15, fontWeight: '800', color: '#6c79ff' },

  modalActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  arBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#667eea', paddingVertical: 14, borderRadius: 26, justifyContent: 'center', marginRight: 10 },
  arBtnText: { color: '#fff', fontWeight: '800', marginLeft: 8 },
  favCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
});
