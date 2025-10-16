// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation, route }) {
  // รับฟังก์ชันหลังสมัครสำเร็จ (เราจะส่งมาจาก App.js)
  const onRegistered = route?.params?.onRegistered;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const submit = () => {
    if (!name.trim() || !email.trim() || !pass.trim() || !confirm.trim()) {
      Alert.alert('กรอกไม่ครบ', 'โปรดกรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('อีเมลไม่ถูกต้อง', 'กรุณาตรวจสอบรูปแบบอีเมล');
      return;
    }
    if (pass.length < 6) {
      Alert.alert('รหัสผ่านสั้นเกินไป', 'รหัสผ่านอย่างน้อย 6 ตัวอักษร');
      return;
    }
    if (pass !== confirm) {
      Alert.alert('ยืนยันรหัสผ่านไม่ตรงกัน', 'โปรดตรวจสอบอีกครั้ง');
      return;
    }

    // Mock สมัครสำเร็จ
    Alert.alert('สมัครสำเร็จ', 'ยินดีต้อนรับสู่ AR Wheel!', [
      {
        text: 'ไปใช้งาน',
        onPress: () => {
          // ล็อกอินอัตโนมัติหลังสมัคร (ฝั่ง frontend)
          if (typeof onRegistered === 'function') onRegistered();
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradient}>
        <View style={styles.card}>
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="person-add" size={52} color="#667eea" />
            <Text style={styles.title}>สมัครสมาชิก</Text>
            <Text style={styles.subtitle}>สร้างบัญชีใหม่เพื่อเริ่มใช้งาน</Text>
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="person-outline" size={18} color="#666" />
            <TextInput style={styles.input} placeholder="ชื่อ-นามสกุล" value={name} onChangeText={setName} />
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="mail-outline" size={18} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="อีเมล"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={18} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="รหัสผ่าน (อย่างน้อย 6 ตัว)"
              value={pass}
              onChangeText={setPass}
              secureTextEntry={!showPass}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={18} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="ยืนยันรหัสผ่าน"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry={!showConfirm}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Ionicons name={showConfirm ? 'eye-off-outline' : 'eye-outline'} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submit} onPress={submit}>
            <LinearGradient colors={['#667eea', '#764ba2']} style={styles.submitGrad}>
              <Text style={styles.submitText}>สมัครสมาชิก</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 14, alignItems: 'center' }} onPress={() => navigation.goBack()}>
            <Text style={{ color: '#667eea', fontWeight: '600' }}>มีบัญชีอยู่แล้ว? กลับไปเข้าสู่ระบบ</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: {
    backgroundColor: '#fff', borderRadius: 20, padding: 24, width: '100%', maxWidth: 420,
    shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 8 }, elevation: 12,
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#667eea', marginTop: 8 },
  subtitle: { fontSize: 13, color: '#666', marginTop: 4 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12,
    backgroundColor: '#f9f9f9', marginBottom: 10,
  },
  input: { flex: 1, height: 46, fontSize: 16 },
  submit: { borderRadius: 14, overflow: 'hidden', marginTop: 8 },
  submitGrad: { paddingVertical: 14, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
