import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';
import { useTheme } from '../context/ThemeContext';

const LANG_KEY = '@lang';

export default function LanguageScreen() {
  const { colors } = useTheme();
  const [lang, setLang] = useState(i18n.locale?.startsWith('th') ? 'th' : 'en');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(LANG_KEY);
      if (saved) {
        setLang(saved);
        i18n.locale = saved;
      }
    })();
  }, []);

  const change = async (code) => {
    setLang(code);
    i18n.locale = code;
    await AsyncStorage.setItem(LANG_KEY, code);
  };

  const Item = ({ code, label }) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}
      onPress={() => change(code)}
    >
      <Text style={[styles.name, { color: colors.text }]}>{label}</Text>
      <Text style={{ color: code === lang ? colors.primary : colors.textDim }}>
        {code === lang ? '●' : '○'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>{i18n.t('language.title')}</Text>
      <Item code="th" label={i18n.t('language.th')} />
      <Item code="en" label={i18n.t('language.en')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: '800', marginBottom: 8 },
  item: { borderRadius: 12, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '600' },
});
