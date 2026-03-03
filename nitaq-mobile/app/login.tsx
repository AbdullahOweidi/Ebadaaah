import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, TextInput, Platform, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  
  // State management for form inputs and loading status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('خطأ', 'يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    setIsLoading(true);

    try {
      // NOTE: Use 10.0.2.2 for Android Emulator, 127.0.0.1 for iOS Simulator, 
      // or your local IPv4 address (e.g., 192.168.1.x) for a physical device.
      const response = await fetch('http://10.0.2.2:8000/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // Enforce the Organization role requirement
        if (data.data.user.type !== 'organization') {
          Alert.alert('صلاحيات غير كافية', 'هذا الحساب ليس مسجلاً كمنظمة.');
          setIsLoading(false);
          return;
        }

        // Store the token and user type securely
        await SecureStore.setItemAsync('userToken', data.data.access_token);
        await SecureStore.setItemAsync('userType', data.data.user.type);

        // Redirect to the organization dashboard
        router.replace('./(drawer)/organization_dashboard');
      } else {
        Alert.alert('خطأ في تسجيل الدخول', data.message || 'بيانات الاعتماد غير صحيحة');
      }
    } catch (error) {
      Alert.alert('خطأ في الاتصال', 'تعذر الاتصال بالخادم. تأكد من تشغيل الخادم المحلي.');
      console.error('Login Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Background Pattern */}
        <Image source={require('../assets/images/bottom-pattern.png')} style={styles.bottomPattern} resizeMode="cover" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={Colors.primaryText} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>أهلا بك</Text>
          </View>
        </View>

        {/* Form Content */}
        <View style={styles.content}>
          
          {/* Email Input */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>البريد الإلكتروني</Text>
              <Feather name="mail" size={16} color={Colors.primaryText} style={styles.labelIcon} />
            </View>
            <TextInput 
              style={styles.input} 
              keyboardType="email-address" 
              autoCapitalize="none" 
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>كلمة{'\u00A0'}المرور</Text>
              <Feather name="lock" size={16} color={Colors.primaryText} style={styles.labelIcon} />
            </View>
            <View style={styles.passwordContainer}>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Feather name={showPassword ? "eye" : "eye-off"} size={20} color={Colors.secondaryText} />
              </TouchableOpacity>
              <TextInput 
                style={[styles.input, { flex: 1, marginBottom: 0 }]} 
                secureTextEntry={!showPassword} 
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          {/* Options: Remember Me & Forgot Password */}
          <View style={styles.optionsRow}>
            <TouchableOpacity onPress={() => router.push('/forgot-password')}>
              <Text style={styles.forgotPasswordText}>هل نسيت كلمة السر ؟</Text>
            </TouchableOpacity>
            <View style={styles.rememberMeContainer}>
              <Text style={styles.rememberMeText}>تذكرني</Text>
              <View style={styles.checkbox} />
            </View>
          </View>

          {/* Social Login */}
          <View style={styles.socialSection}>
            <Text style={styles.socialText}>التسجيل باستخدام</Text>
            <View style={styles.socialIconsRow}>
              <TouchableOpacity style={styles.socialCircle}>
                <Ionicons name="finger-print" size={20} color={Colors.primaryText} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialCircle}>
                <FontAwesome5 name="facebook-f" size={18} color={Colors.primaryText} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialCircle}>
                <FontAwesome5 name="google" size={18} color={Colors.primaryText} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Register Link */}
          <TouchableOpacity onPress={() => router.push('/register')} style={styles.registerLink}>
            <Text style={styles.registerTextMain}>ليس لديك حساب؟ <Text style={styles.registerTextBold}>أنشئ حسابا</Text></Text>
          </TouchableOpacity>

          {/* Main Button */}
          <TouchableOpacity 
            style={[styles.button, isLoading && { opacity: 0.7 }]} 
            activeOpacity={0.8} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.whiteText} />
            ) : (
              <Text style={styles.buttonText}>تسجيل الدخول</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1 },
  bottomPattern: { width: width, height: '35%', position: 'absolute', bottom: 0, opacity: 0.6, zIndex: -1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20 },
  backButton: { padding: 8, marginLeft: -8 },
  headerTitleContainer: { alignItems: 'flex-end' },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.buttonBackground, marginBottom: 4 },
  headerTitle: { fontSize: 20, color: Colors.primaryText, fontFamily: 'Arabic-Bold' },
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 40 },
  inputGroup: { marginBottom: 20 },
  labelContainer: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 8 },
  label: { 
    fontSize: 14, 
    color: Colors.primaryText, 
    fontFamily: 'Arabic-Bold', 
    marginRight: 8,
    textAlign: 'right',
    writingDirection: 'rtl'
  },
  labelIcon: { marginLeft: 4 },
  input: { backgroundColor: Colors.inputBackground, borderRadius: 12, height: 50, paddingHorizontal: 16, textAlign: 'right', fontFamily: 'Arabic-Bold', color: Colors.primaryText },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.inputBackground, borderRadius: 12, height: 50 },
  eyeIcon: { paddingHorizontal: 16 },
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 },
  forgotPasswordText: { fontSize: 12, color: Colors.primaryText, fontFamily: 'Arabic-Bold' },
  rememberMeContainer: { flexDirection: 'row', alignItems: 'center' },
  rememberMeText: { fontSize: 12, color: Colors.primaryText, fontFamily: 'Arabic-Bold', marginRight: 8 },
  checkbox: { width: 16, height: 16, borderWidth: 1, borderColor: Colors.primaryText, borderRadius: 4 },
  socialSection: { alignItems: 'center', marginBottom: 30 },
  socialText: { fontSize: 12, color: Colors.primaryText, fontFamily: 'Arabic-Bold', marginBottom: 12 },
  socialIconsRow: { flexDirection: 'row', justifyContent: 'center', gap: 16 },
  socialCircle: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: Colors.primaryText, justifyContent: 'center', alignItems: 'center' },
  registerLink: { alignItems: 'center', marginBottom: 20 },
  registerTextMain: { fontSize: 12, color: Colors.primaryText, fontFamily: 'Arabic-Bold' },
  registerTextBold: { fontWeight: 'bold' },
  button: { backgroundColor: Colors.cardBackground, width: '100%', paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  buttonText: { fontSize: 18, color: Colors.whiteText, fontFamily: 'Arabic-Bold' },
});