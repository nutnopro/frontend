import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import i18n from '../i18n';

export default function LogoutScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { onConfirm } = route.params || {};

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>{i18n.t('logout.title')}</Text>
      <Text style={{ color: colors.textDim, marginTop: 8, textAlign: 'center' }}>{i18n.t('logout.ask')}</Text>
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 18 }}>
        <Btn label={i18n.t('common.cancel')} onPress={() => navigation.goBack()} />
        <Btn primary label={i18n.t('common.confirm')} onPress={() => { onConfirm?.(); }} />
      </View>
    </View>
  );
}

function Btn({ label, onPress, primary }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress}
      style={{ paddingHorizontal: 16, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
        backgroundColor: primary ? colors.primary : 'transparent', borderColor: colors.border, borderWidth: primary ? 0 : 1 }}>
      <Text style={{ color: primary ? '#fff' : colors.text }}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: '900' },
});
