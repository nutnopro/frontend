import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export default function SearchBar({ value, onChangeText, placeholder = 'search' }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.box, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Ionicons name="search" size={18} color={colors.textDim} />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textDim}
        autoCapitalize="none"
        returnKeyType="search"
      />
      <Ionicons name="options-outline" size={18} color={colors.textDim} />
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, height: 44,
  },
  input: { flex: 1, fontSize: 14 },
});
