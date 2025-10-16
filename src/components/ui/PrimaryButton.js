import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function PrimaryButton({ title, onPress, style, textStyle, left, right, disabled }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        { backgroundColor: disabled ? colors.border : colors.primary },
        style,
      ]}
    >
      {left ? <View style={styles.side}>{left}</View> : <View style={styles.side} />}
      <Text style={[styles.txt, { color: colors.bg }, textStyle]}>{title}</Text>
      {right ? <View style={styles.side}>{right}</View> : <View style={styles.side} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
    flexDirection: 'row',
  },
  txt: { fontWeight: '800', fontSize: 16 },
  side: { width: 36, alignItems: 'center', justifyContent: 'center' },
});
