// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function RegisterScreen({ navigation, route }) {
  const { colors } = useTheme();
  const onRegistered = route?.params?.onRegistered;

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [consent, setConsent] = useState(true);

  const submit = () => {
    if (!first || !last || !email.includes('@') || pass.length < 6 || pass !== confirm || !consent) {
      Alert.alert('กรอกข้อมูลไม่ครบ', 'โปรดตรวจสอบข้อมูลทั้งหมด');
      return;
    }
    Alert.alert('สำเร็จ', 'สร้างบัญชีผู้ใช้แล้ว (เดโม่)', [
      { text: 'เริ่มต้นใช้งาน', onPress: () => onRegistered?.() },
    ]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <Text style={[styles.title, { color: colors.text }]}>Create a new account</Text>

        <Row>
          <Field flex label="ชื่อ" value={first} onChange={setFirst} />
          <Field flex label="นามสกุล" value={last} onChange={setLast} />
        </Row>
        <Field label="Email" value={email} onChange={setEmail} keyboardType="email-address" />
        <Field label="Password" value={pass} onChange={setPass} secure />
        <Field label="Confirm Password" value={confirm} onChange={setConfirm} secure />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
          <Switch value={consent} onValueChange={setConsent} trackColor={{ false: colors.border, true: colors.secondary || '#00C6AE' }} />
          <Text style={{ marginLeft: 8, color: colors.text }}>ยินยอมรับข่าวสาร/อัปเดตจากแอป</Text>
        </View>

        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={submit}>
          <Text style={{ color: '#fff', fontWeight: '800' }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function Row({ children }) {
  return <View style={{ flexDirection: 'row', gap: 8 }}>{children}</View>;
}

function Field({ label, value, onChange, secure, keyboardType, flex }) {
  const { colors } = useTheme();
  return (
    <View style={{ marginBottom: 10, flex: flex ? 1 : undefined }}>
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
  btn: { marginTop: 12, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
});
