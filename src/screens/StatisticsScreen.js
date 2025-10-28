import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import i18n from '../i18n';

const TIMEFRAMES = ['all', 'year', 'month', 'week', 'today'];

function StatBox({ label, value }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.box, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={{ color: colors.textDim, fontSize: 12 }}>{label}</Text>
      <Text style={{ color: colors.text, fontWeight: '900', fontSize: 18, marginTop: 6 }}>{value}</Text>
    </View>
  );
}

export default function StatisticsScreen() {
  const { colors } = useTheme();
  const [tf, setTf] = useState('all');

  // mock data
  const data = {
    totalModels: 42,
    followers: 3800,
    avgRating: 4.5,
    totalViews: tf === 'today' ? 320 : 120000,
    totalLikes: tf === 'today' ? 40 : 6400,
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>{i18n.t('stats.title')}</Text>

      {/* timeframe chips */}
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
        {TIMEFRAMES.map((k) => (
          <TouchableOpacity key={k} onPress={() => setTf(k)}
            style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, borderWidth: 1,
              borderColor: colors.border, backgroundColor: tf === k ? colors.primary : 'transparent' }}>
            <Text style={{ color: tf === k ? '#fff' : colors.text }}>
              {i18n.t(`stats.${k === 'all' ? 'allTime' : k}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <StatBox label={i18n.t('stats.totalModels')} value={data.totalModels} />
        <StatBox label={i18n.t('stats.followers')} value={data.followers} />
      </View>

      <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
        <StatBox label={i18n.t('stats.avgRating')} value={data.avgRating} />
        <StatBox label={i18n.t('stats.totalViews')} value={data.totalViews} />
        <StatBox label={i18n.t('stats.totalLikes')} value={data.totalLikes} />
      </View>

      {/* สามารถต่อยอดเป็นกราฟจริงทีหลังได้ */}
      <View style={[styles.bigPanel, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={{ color: colors.textDim, textAlign: 'center' }}>Graph placeholder</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '800', marginBottom: 10 },
  box: { flex: 1, padding: 14, borderRadius: 12, borderWidth: 1 },
  bigPanel: { marginTop: 12, height: 200, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
});
