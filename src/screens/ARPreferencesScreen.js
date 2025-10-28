import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import i18n from '../i18n';

const KEY = '@ar_prefs';

export default function ARPreferencesScreen() {
  const { colors } = useTheme();
  const [prefs, setPrefs] = useState({ showGuide: true, autoFocus: true, mirrorFront: false });

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(KEY);
      if (saved) setPrefs(JSON.parse(saved));
    })();
  }, []);

  useEffect(() => { AsyncStorage.setItem(KEY, JSON.stringify(prefs)); }, [prefs]);

  const Row = ({ label, value, onChange }) => (
    <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor="#fff"
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>{i18n.t('ar.title')}</Text>
      <Row label={i18n.t('ar.showGuide')} value={prefs.showGuide} onChange={(v) => setPrefs((p) => ({ ...p, showGuide: v }))} />
      <Row label={i18n.t('ar.autoFocus')} value={prefs.autoFocus} onChange={(v) => setPrefs((p) => ({ ...p, autoFocus: v }))} />
      <Row label={i18n.t('ar.mirrorFront')} value={prefs.mirrorFront} onChange={(v) => setPrefs((p) => ({ ...p, mirrorFront: v }))} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: '800', marginBottom: 6 },
  row: { borderRadius: 12, padding: 16, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 16, fontWeight: '600' },
});
