// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const TEST_USERS = [
  { email: 'demo@arwheel.com', password: '123456', name: 'Demo User' },
  { email: 'user@arwheel.com', password: 'password1', name: 'User One' },
];

export default function LoginScreen({ onLogin, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const tryLogin = () => {
    const found = TEST_USERS.find(
      u => u.email.trim().toLowerCase() === email.trim().toLowerCase() && u.password === password
    );
    if (found) {
      onLogin?.(); // เข้าสู่ระบบสำเร็จ → ไปหน้าแอป
    } else {
      Alert.alert('เข้าสู่ระบบไม่สำเร็จ', 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient colors={['#3A7AFE', '#2F63D1']} style={styles.gradient}>
        <View style={styles.card}>
          {/* โลโก้/หัวข้อ */}
          <View style={styles.logoWrap}>
            <View style={styles.logoCircle}>
              <Ionicons name="car-sport" size={36} color="#3A7AFE" />
            </View>
            <Text style={styles.title}>AR Wheel</Text>
            <Text style={styles.subtitle}>ระบบทดลองล้อแม็กซ์ด้วย AR</Text>
          </View>

          {/* ช่องกรอก */}
          <View style={styles.inputRow}>
            <Ionicons name="mail-outline" size={18} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={18} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
            />
            <TouchableOpacity onPress={() => setShowPass(p => !p)}>
              <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* ปุ่มหลัก: เข้าสู่ระบบผู้ใช้ */}
          <TouchableOpacity style={styles.mainBtn} onPress={tryLogin} activeOpacity={0.95}>
            <LinearGradient colors={['#3A7AFE', '#2F63D1']} style={styles.mainBtnGrad}>
              <Text style={styles.mainBtnTxt}>เข้าสู่ระบบผู้ใช้</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* ปุ่มโซเชียล (ยังเป็นปุ่มเปล่า ๆ) */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.9} onPress={() => Alert.alert('ยังไม่เชื่อมต่อ', 'ปุ่ม Facebook เป็นตัวอย่างเท่านั้น')}>
              <Ionicons name="logo-facebook" size={18} color="#1877F2" />
              <Text style={styles.socialTxt}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.9} onPress={() => Alert.alert('ยังไม่เชื่อมต่อ', 'ปุ่ม Google เป็นตัวอย่างเท่านั้น')}>
              <Ionicons name="logo-google" size={18} color="#DB4437" />
              <Text style={styles.socialTxt}>Google</Text>
            </TouchableOpacity>
          </View>

          {/* ลิงก์สมัครสมาชิก */}
          <TouchableOpacity style={{ alignItems: 'center', marginTop: 10 }} onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#2F63D1', fontWeight: '600' }}>ยังไม่มีบัญชี? สมัครสมาชิก</Text>
          </TouchableOpacity>

          {/* ปุ่มรอง: เข้าใช้งานแบบทดลอง (ไม่เด่น) */}
          <TouchableOpacity style={styles.trialBtn} onPress={() => onLogin?.()}>
            <Text style={styles.trialTxt}>เข้าใช้งานแบบทดลอง</Text>
          </TouchableOpacity>

          {/* กล่องแสดงบัญชีทดสอบ (เฉพาะ user) */}
          <View style={styles.demoBox}>
            <Text style={styles.demoTitle}>บัญชีทดสอบผู้ใช้:</Text>
            {TEST_USERS.map(u => (
              <Text key={u.email} style={styles.demoLine}>
                {u.email}  /  Pass: {u.password}
              </Text>
            ))}
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 420,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  logoWrap: { alignItems: 'center', marginBottom: 16 },
  logoCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: '#EAF1FF', alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#3A7AFE' },
  subtitle: { fontSize: 13, color: '#666', marginTop: 4 },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#E4E6EB',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    marginTop: 10,
  },
  input: { flex: 1, height: 46, fontSize: 16 },

  mainBtn: { borderRadius: 14, overflow: 'hidden', marginTop: 14 },
  mainBtnGrad: { paddingVertical: 14, alignItems: 'center' },
  mainBtnTxt: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  socialRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 12 },
  socialBtn: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E6EB',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  socialTxt: { color: '#333', fontWeight: '600' },

  trialBtn: {
    marginTop: 14,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E6EB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  trialTxt: { color: '#2F63D1', fontWeight: '800' },

  demoBox: {
    marginTop: 14,
    padding: 12,
    backgroundColor: '#F2F4F7',
    borderRadius: 12,
  },
  demoTitle: { fontWeight: '700', color: '#333', marginBottom: 4, fontSize: 13 },
  demoLine: { fontSize: 12, color: '#555' },
});
