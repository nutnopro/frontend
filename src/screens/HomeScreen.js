// src/screens/HomeScreen.js
import React, { useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions,
} from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const SIDE = 16;
const CARD_W = 160;

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1080&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1080&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1080&auto=format&fit=crop',
];

const FEATURED = [
  { id: 1, name: 'Sport Pro', brand: 'Racing Elite', price: 12500, img: 'https://images.unsplash.com/photo-1592813630413-9f0402c2fd90?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Urban Style', brand: 'City Drive', price: 9800,  img: 'https://images.unsplash.com/photo-1517946132621-7a3bb2f0b2ae?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Luxury Master', brand: 'Premium Line', price: 18500, img: 'https://images.unsplash.com/photo-1595717579655-587eb7c1575e?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Street Racing', brand: 'Speed Max', price: 15200, img: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=800&auto=format&fit=crop' },
];

const POP_SIZES = ['15"', '16"', '17"', '18"', '19"'];

function QuickAction({ icon, label, onPress, colors }) {
  return (
    <TouchableOpacity style={styles.quickItem} onPress={onPress} activeOpacity={0.9}>
      <LinearGradient colors={[colors.primary, colors.primaryPressed]} style={styles.quickIconWrap}>
        <Ionicons name={icon} size={22} color="#fff" />
      </LinearGradient>
      <Text style={[styles.quickText, { color: colors.text }]} numberOfLines={1}>{label}</Text>
    </TouchableOpacity>
  );
}

function WheelCard({ item, colors }) {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.card }]} activeOpacity={0.9}>
      <Image source={{ uri: item.img }} style={styles.cardImg} />
      <View style={styles.cardBody}>
        <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.cardSub, { color: colors.textDim }]} numberOfLines={1}>{item.brand}</Text>
        <Text style={[styles.cardPrice, { color: colors.primary }]}>฿{item.price.toLocaleString()}</Text>
      </View>
      <View style={[styles.cardFav, { backgroundColor: `${colors.bg}dd`, borderColor: colors.border }]}>
        <Ionicons name="heart-outline" size={18} color={colors.textDim} />
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const heroDots = useMemo(() => HERO_IMAGES.map((_, i) => i), []);

  return (
    <LinearGradient colors={[colors.primary, colors.primaryPressed]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* HERO */}
        <View style={styles.heroWrap}>
          <View style={[styles.heroCard, { backgroundColor: colors.card }]}>
            <View style={styles.heroHeader}>
              <View style={styles.heroTitleRow}>
                <Ionicons name="car-sport" size={24} color={colors.primary} />
                <Text style={[styles.heroTitle, { color: colors.text }]}>ยินดีต้อนรับสู่ AR Wheel</Text>
              </View>
              <Text style={[styles.heroSub, { color: colors.textDim }]}>
                ทดลองล้อแม็กซ์ด้วยเทคโนโลยี AR
              </Text>
            </View>

            {/* Hero gallery */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              decelerationRate="fast"
              snapToInterval={width - SIDE * 2}
              contentContainerStyle={{ paddingHorizontal: 0 }}
              style={{ marginTop: 6 }}
            >
              {HERO_IMAGES.map((uri) => (
                <Image key={uri} source={{ uri }} style={[styles.heroImage, { width: width - SIDE * 2 }]} />
              ))}
            </ScrollView>

            {/* dots */}
            <View style={styles.dotsRow}>
              {heroDots.map((i) => <View key={i} style={[styles.dot, { backgroundColor: colors.border }]} />)}
            </View>

            {/* quick actions */}
            <View style={styles.quickRow}>
              <QuickAction
                icon="camera"
                label="เปิดกล้อง AR"
                colors={colors}
                onPress={() => navigation.navigate('AR')}
              />
              <QuickAction
                icon="cube"
                label="ดูโมเดล 3D"
                colors={colors}
                onPress={() => navigation.navigate('Models')}
              />
              <QuickAction
                icon="heart"
                label="รายการโปรด"
                colors={colors}
                onPress={() => navigation.navigate('Profile', { screen: 'Favorites' })}
              />
            </View>
          </View>
        </View>

        {/* PROMO BANNER */}
        <TouchableOpacity activeOpacity={0.9} style={{ paddingHorizontal: SIDE }}>
          <View style={[styles.promo, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.promoBadge, { backgroundColor: '#fca311' }]}>
                <Text style={styles.promoBadgeText}>โปร</Text>
              </View>
              <Text style={[styles.promoText, { color: colors.text }]}>
                ลด 15% สำหรับรุ่น Sport Pro วันนี้เท่านั้น!
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textDim} />
          </View>
        </TouchableOpacity>

        {/* FEATURED */}
        <View style={{ paddingHorizontal: SIDE, marginTop: 14 }}>
          <Text style={[styles.sectionTitle, { color: colors.bg }]}>ล้อแม็กซ์แนะนำ</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {FEATURED.map((w) => (
              <View key={w.id} style={{ marginRight: 12 }}>
                <WheelCard item={w} colors={colors} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* POPULAR SIZES */}
        <View style={{ paddingHorizontal: SIDE, marginTop: 14 }}>
          <Text style={[styles.sectionTitle, { color: colors.bg }]}>ขนาดยอดนิยม</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 6 }}>
            {POP_SIZES.map((s) => (
              <TouchableOpacity key={s} style={[styles.sizeChip, { borderColor: colors.border, backgroundColor: colors.bg }]} onPress={() => navigation.navigate('Models')}>
                <Text style={[styles.sizeText, { color: colors.primary }]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* TIPS */}
        <View style={{ paddingHorizontal: SIDE, marginTop: 6 }}>
          <View style={[styles.tipsCard, { backgroundColor: colors.card }]}>
            <View style={styles.tipRow}>
              <Ionicons name="scan" size={20} color={colors.primary} />
              <Text style={[styles.tipText, { color: colors.text }]}>เล็งกล้องไปที่ล้อแล้วกดปุ่มถ่ายเพื่อเริ่ม AR</Text>
            </View>
            <View style={styles.tipRow}>
              <Ionicons name="color-palette" size={20} color={colors.primary} />
              <Text style={[styles.tipText, { color: colors.text }]}>เลือกขนาด/สี/สไตล์ได้จากหน้า AR และโมเดล</Text>
            </View>
            <View style={styles.tipRow}>
              <Ionicons name="heart" size={20} color={colors.primary} />
              <Text style={[styles.tipText, { color: colors.text }]}>กดหัวใจเพื่อบันทึกไว้ดูใน “รายการโปรด”</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  heroWrap: { paddingHorizontal: SIDE, paddingTop: 10 },
  heroCard: {
    borderRadius: 24,
    padding: 14,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 }, elevation: 6,
  },
  heroHeader: { paddingHorizontal: 6, paddingBottom: 6 },
  heroTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroTitle: { fontSize: 20, fontWeight: '800' },
  heroSub: { marginTop: 2, fontSize: 12 },
  heroImage: { height: 170, borderRadius: 16, marginRight: 10 },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 3 },

  quickRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  quickItem: { flex: 1, alignItems: 'center' },
  quickIconWrap: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  quickText: { fontSize: 12, marginTop: 6 },

  promo: {
    marginTop: 14, borderRadius: 16, paddingVertical: 12, paddingHorizontal: 14,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1,
  },
  promoBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, marginRight: 8 },
  promoBadgeText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  promoText: { fontWeight: '700' },

  sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 8 },

  card: {
    width: CARD_W, borderRadius: 18, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 }, elevation: 4,
  },
  cardImg: { width: '100%', height: 110 },
  cardBody: { padding: 12 },
  cardTitle: { fontSize: 14, fontWeight: '800' },
  cardSub: { fontSize: 12, marginTop: 2 },
  cardPrice: { fontSize: 14, fontWeight: '900', marginTop: 6 },
  cardFav: {
    position: 'absolute', top: 8, right: 8,
    width: 30, height: 30, borderRadius: 15,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1,
  },

  sizeChip: {
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, borderWidth: 1,
  },
  sizeText: { fontWeight: '800', fontSize: 12 },

  tipsCard: { borderRadius: 16, padding: 14, marginTop: 10 },
  tipRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 5 },
  tipText: { fontSize: 13 },
});
