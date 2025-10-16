import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function IconButton({ onPress, size = 40, radius = 12, children, outline = false, style }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.base,
        {
          width: size, height: size, borderRadius: radius,
          backgroundColor: outline ? 'transparent' : colors.card,
          borderColor: colors.border, borderWidth: outline ? 1 : 0,
        },
        style,
      ]}
      activeOpacity={0.9}
    >
      {children}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
});
