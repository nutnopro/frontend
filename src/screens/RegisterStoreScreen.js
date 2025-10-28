// src/screens/RegisterStoreScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function RegisterStoreScreen({ navigation, route }) {
  const { colors } = useTheme();
  const onRegistered = route?.params?.onRegistered;

  const [owner, setOwner] = useState('');
  const [shop, setShop] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [addr, setAddr] = useState('');

  const submit = () => {
    if (!owner || !shop || !phone || !email.includes('@') || pass.length < 6) {
      Alert.alert('กรอกข้อมูลไม่ครบ', 'โปรดกรอกข้อมูลให้ครบ');
      return;
    }
    Alert.alert('สำเร็จ', 'สมัครร้านค้าสำเร็จ (เดโม่)', [{ text: 'ไปใช้งาน', onPress: () => onRegistered?.() }]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <Text style={[styles.title, { color: colors.text }]}>ลงทะเบียนร้านค้า</Text>

        <Field label="ชื่อ - นามสกุล" value={owner} onChange={setOwner} />
        <Field label="ชื่อร้านค้า" value={shop} onChange={setShop} />
        <Field label="เบอร์โทร" value={phone} onChange={setPhone} keyboardType="phone-pad" />
        <Field label="Email" value={email} onChange={setEmail} keyboardType="email-address" />
        <Field label="Password" value={pass} onChange={setPass} secure />
        <Field label="ที่อยู่ร้านค้า" value={addr} onChange={setAddr} multiline />

        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={submit}>
          <Text style={{ color: '#fff', fontWeight: '800' }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function Field({ label, value, onChange, secure, keyboardType, multiline }) {
  const { colors } = useTheme();
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ color: colors.text, marginBottom: 6 }}>{label}</Text>
      <TextInput
        style={{
          borderColor: colors.border, borderWidth: 1, borderRadius: 12,
          paddingHorizontal: 12, height: multiline ? 90 : 44, color: colors.text, textAlignVertical: multiline ? 'top' : 'center',
        }}
        placeholder={label}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChange}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18 },
  title: { fontSize: 20, fontWeight: '800', marginBottom: 12 },
  btn: { marginTop: 12, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
});
