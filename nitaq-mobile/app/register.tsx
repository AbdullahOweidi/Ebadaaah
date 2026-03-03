import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, TextInput, Platform, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  const router = useRouter();
  
  // State management
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('خطأ', 'يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    setIsLoading(true);

    try {
      // Adjust IP address based on your environment (10.0.2.2 for Android emulator)
      const response = await fetch('http://10.0.2.2:8000/api/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
          type: 'organization', // Hardcoding the type based on this app's context
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // Store the token and user type securely
        await SecureStore.setItemAsync('userToken', data.data.access_token);
        await SecureStore.setItemAsync('userType', data.data.user.type);

        Alert.alert('نجاح', 'تم إنشاء الحساب بنجاح');
        
        // Redirect to the organization dashboard
        router.replace('./(drawer)/organization_dashboard');
      } else {
        // Handle validation errors from Laravel
        const errorMessage = data.message || 'حدث خطأ أثناء التسجيل';
        Alert.alert('خطأ في التسجيل', errorMessage);
      }
    } catch (error) {
      Alert.alert('خطأ في الاتصال', 'تعذر الاتصال بالخادم. تأكد من تشغيل الخادم المحلي.');
      console.error('Registration Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('../assets/images/bottom-pattern.png')} style={styles.bottomPattern} resizeMode="cover" />

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={Colors.primaryText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>مرحبا بك</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>البريد{'\u00A0'}الإلكتروني</Text>
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

          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>رقم{'\u00A0'}الهاتف</Text>
              <Feather name="phone" size={16} color={Colors.primaryText} style={styles.labelIcon} />
            </View>
            <TextInput 
              style={styles.input} 
              keyboardType="phone-pad" 
              value={phone}
              onChangeText={setPhone}
            />
          </View>

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

          <Text style={styles.termsText}>
            بالتسجيل أنت توافق على شروط الاستخدام و سياسة الخصوصية ونوافق عليها
          </Text>

          <View style={styles.socialSection}>
            <Text style={styles.socialText}>التسجيل باستخدام</Text>
            <View style={styles.socialIconsRow}>
              <TouchableOpacity style={styles.socialCircle}><Ionicons name="finger-print" size={20} color={Colors.primaryText} /></TouchableOpacity>
              <TouchableOpacity style={styles.socialCircle}><FontAwesome5 name="facebook-f" size={18} color={Colors.primaryText} /></TouchableOpacity>
              <TouchableOpacity style={styles.socialCircle}><FontAwesome5 name="google" size={18} color={Colors.primaryText} /></TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={() => router.back()} style={styles.loginLink}>
            <Text style={styles.loginTextMain}>لديك حساب؟ <Text style={styles.loginTextBold}>تسجيل الدخول</Text></Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, isLoading && { opacity: 0.7 }]} 
            activeOpacity={0.8}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.whiteText} />
            ) : (
              <Text style={styles.buttonText}>انشاء حساب</Text>
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
  bottomPattern: { width: width, height: '30%', position: 'absolute', bottom: 0, opacity: 0.6, zIndex: -1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20, marginBottom: 20 },
  backButton: { padding: 8, marginLeft: -8 },
  headerTitle: { fontSize: 22, color: Colors.primaryText, fontFamily: 'Arabic-Bold' },
  content: { flex: 1, paddingHorizontal: 30 },
  inputGroup: { marginBottom: 16 },
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
  termsText: { fontSize: 10, color: Colors.primaryText, fontFamily: 'Arabic-Bold', textAlign: 'center', marginTop: 8, marginBottom: 20, lineHeight: 16 },
  socialSection: { alignItems: 'center', marginBottom: 20 },
  socialText: { fontSize: 12, color: Colors.primaryText, fontFamily: 'Arabic-Bold', marginBottom: 12 },
  socialIconsRow: { flexDirection: 'row', justifyContent: 'center', gap: 16 },
  socialCircle: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: Colors.primaryText, justifyContent: 'center', alignItems: 'center' },
  loginLink: { alignItems: 'center', marginBottom: 20 },
  loginTextMain: { fontSize: 12, color: Colors.primaryText, fontFamily: 'Arabic-Bold' },
  loginTextBold: { fontWeight: 'bold' },
  button: { backgroundColor: Colors.cardBackground, width: '100%', paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  buttonText: { fontSize: 18, color: Colors.whiteText, fontFamily: 'Arabic-Bold' },
});