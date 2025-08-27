
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    // จำลองการเข้าสู่ระบบ
    if (username === 'demo' && password === '123456') {
      Alert.alert('สำเร็จ', 'เข้าสู่ระบบสำเร็จ!', [
        { text: 'ตกลง', onPress: onLogin }
      ]);
    } else {
      Alert.alert('ข้อผิดพลาด', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง\n\nทดลองใช้:\nUsername: demo\nPassword: 123456');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <View style={styles.loginCard}>
          <View style={styles.logoContainer}>
            <Ionicons name="car-sport" size={80} color="#667eea" />
            <Text style={styles.logoText}>AR Wheel</Text>
            <Text style={styles.subtitle}>ระบบทดลองล้อแม็กซ์ด้วย AR</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="ชื่อผู้ใช้"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="รหัสผ่าน"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.buttonGradient}
              >
                <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.demoInfo}>
              <Text style={styles.demoText}>บัญชีทดลอง:</Text>
              <Text style={styles.demoCredentials}>Username: demo</Text>
              <Text style={styles.demoCredentials}>Password: 123456</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 15,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#667eea',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },
  loginButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 10,
  },
  buttonGradient: {
    padding: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoInfo: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  demoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  demoCredentials: {
    fontSize: 12,
    color: '#666',
  },
});