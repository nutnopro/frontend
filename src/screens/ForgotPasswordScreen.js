// src/screens/ForgotPasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ForgotPasswordScreen({ navigation }) {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const submit = () => {
    if (!email.includes('@') || pass.length < 6 || pass !== confirm) {
      Alert.alert('แก้ไขไม่ได้', 'ตรวจสอบอีเมล/รหัสผ่านใหม่อีกครั้ง');
      return;
    }
    Alert.alert('สำเร็จ', 'รีเซ็ตรหัสผ่านแล้ว (เดโม่)', [{ text: 'ตกลง', onPress: () => navigation.goBack() }]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <Text style={[styles.title, { color: colors.text }]}>ตั้งรหัสผ่านใหม่</Text>

        <Field label="Email" value={email} onChange={setEmail} keyboardType="email-address" />
        <Field label="รหัสผ่านใหม่" value={pass} onChange={setPass} secure />
        <Field label="ยืนยันรหัสผ่าน" value={confirm} onChange={setConfirm} secure />

        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={submit}>
          <Text style={{ color: '#fff', fontWeight: '800' }}>บันทึก</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function Field({ label, value, onChange, secure, keyboardType }) {
  const { colors } = useTheme();
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ color: colors.text, marginBottom: 6 }}>{label}</Text>
      <TextInput
        style={{ borderColor: colors.border, borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, height: 44, color: colors.text }}
        placeholder={label}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChange}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18 },
  title: { fontSize: 20, fontWeight: '800', marginBottom: 12 },
  btn: { marginTop: 8, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
});
