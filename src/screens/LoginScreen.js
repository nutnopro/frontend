// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ROLES = [
  { key: 'visitor', label: 'ทดลองใช้' },
  { key: 'user', label: 'ผู้ใช้' },
  { key: 'admin', label: 'แอดมิน' },
];

export default function LoginScreen({ onLogin, navigation }) {
  const [role, setRole] = useState('visitor');
  const [email, setEmail] = useState('demo@arwheel.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);

  const submit = () => {
    if (role === 'visitor') {
      onLogin?.();
      return;
    }
    if (role === 'admin') {
      if (email === 'admin@arwheel.com' && password === 'admin123') onLogin?.();
      else Alert.alert('ไม่สำเร็จ', 'อีเมลหรือรหัสผ่านผู้ดูแลระบบไม่ถูกต้อง');
      return;
    }
    if (!email.includes('@') || password.length < 6) {
      Alert.alert('กรอกไม่ครบ', 'โปรดกรอกอีเมลให้ถูกต้องและรหัสผ่านอย่างน้อย 6 ตัวอักษร');
      return;
    }
    onLogin?.();
  };

  const goRegister = () => {
    navigation?.navigate?.('Register', { onRegistered: onLogin });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradient}>
        <View style={styles.card}>
          <View style={styles.logoWrap}>
            <Ionicons name="car-sport" size={72} color="#667eea" />
            <Text style={styles.title}>AR Wheel</Text>
            <Text style={styles.subtitle}>ระบบทดลองล้อแม็กซ์ด้วย AR</Text>
          </View>

          <View style={styles.roleBar}>
            {ROLES.map(r => (
              <TouchableOpacity
                key={r.key}
                onPress={() => setRole(r.key)}
                style={[styles.roleBtn, role === r.key && styles.roleBtnActive]}
              >
                <Text style={[styles.roleTxt, role === r.key && styles.roleTxtActive]}>{r.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {role !== 'visitor' && (
            <>
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
                  placeholder="รหัสผ่าน"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </>
          )}

          <TouchableOpacity style={styles.submit} onPress={submit}>
            <LinearGradient colors={['#667eea', '#764ba2']} style={styles.submitGrad}>
              <Text style={styles.submitText}>
                {role === 'visitor' ? 'เข้าใช้งานแบบทดลอง' : 'เข้าสู่ระบบ'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* ลิงก์สมัครสมาชิก */}
          {role !== 'admin' && (
            <TouchableOpacity style={styles.registerLink} onPress={goRegister}>
              <Text style={styles.registerText}>ยังไม่มีบัญชี? สมัครสมาชิก</Text>
            </TouchableOpacity>
          )}

          <View style={styles.demoBox}>
            <Text style={styles.demoTitle}>บัญชีทดสอบ:</Text>
            <Text style={styles.demoLine}>User: demo@arwheel.com  / Pass: 123456</Text>
            <Text style={styles.demoLine}>Admin: admin@arwheel.com / Pass: admin123</Text>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: {
    backgroundColor: '#fff', borderRadius: 20, padding: 26, width: '100%', maxWidth: 420,
    shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 8 }, elevation: 12
  },
  logoWrap: { alignItems: 'center', marginBottom: 22 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#667eea', marginTop: 8 },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  roleBar: { flexDirection: 'row', backgroundColor: '#eef0ff', borderRadius: 999, padding: 4, marginTop: 12, marginBottom: 12 },
  roleBtn: { flex: 1, paddingVertical: 8, borderRadius: 999, alignItems: 'center' },
  roleBtnActive: { backgroundColor: '#667eea' },
  roleTxt: { color: '#667eea', fontSize: 13 },
  roleTxtActive: { color: '#fff', fontWeight: '700' },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12,
    backgroundColor: '#f9f9f9', marginBottom: 12,
  },
  input: { flex: 1, height: 48, fontSize: 16 },
  submit: { borderRadius: 14, overflow: 'hidden', marginTop: 4 },
  submitGrad: { paddingVertical: 14, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  registerLink: { marginTop: 10, alignItems: 'center' },
  registerText: { color: '#667eea', fontWeight: '600' },

  demoBox: { marginTop: 18, padding: 12, backgroundColor: '#f3f4f6', borderRadius: 12, alignItems: 'center' },
  demoTitle: { fontWeight: '700', color: '#333', marginBottom: 4, fontSize: 13 },
  demoLine: { fontSize: 12, color: '#666' },
});
