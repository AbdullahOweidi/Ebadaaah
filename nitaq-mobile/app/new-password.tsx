import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, TextInput, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

export default function NewPasswordScreen() {
  const router = useRouter();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

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
          <Text style={styles.headerTitle}>كلمة المرور الجديدة</Text>
        </View>

        {/* Form Content */}
        <View style={styles.content}>
          {/* New Password Input */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>ادخل كلمة المرور الجديدة</Text>
            </View>
            <View style={styles.passwordContainer}>
              <TouchableOpacity onPress={() => setShowPassword1(!showPassword1)} style={styles.eyeIcon}>
                <Feather name={showPassword1 ? "eye" : "eye-off"} size={20} color={Colors.secondaryText} />
              </TouchableOpacity>
              <TextInput 
                style={[styles.input, { flex: 1, marginBottom: 0 }]} 
                secureTextEntry={!showPassword1} 
              />
            </View>
          </View>

          {/* Confirm New Password Input */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>تأكيد كلمة المرور الجديدة</Text>
            </View>
            <View style={styles.passwordContainer}>
              <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)} style={styles.eyeIcon}>
                <Feather name={showPassword2 ? "eye" : "eye-off"} size={20} color={Colors.secondaryText} />
              </TouchableOpacity>
              <TextInput 
                style={[styles.input, { flex: 1, marginBottom: 0 }]} 
                secureTextEntry={!showPassword2} 
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8}
            onPress={() => router.replace('./login')} // Returns user to login after success
          >
            <Text style={styles.buttonText}>التالي</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: Colors.background, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  container: { flex: 1 },
  bottomPattern: { width: width, height: '35%', position: 'absolute', bottom: 0, opacity: 0.6, zIndex: -1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20, marginBottom: 40 },
  backButton: { padding: 8, marginLeft: -8 },
  headerTitle: { fontSize: 20, color: Colors.primaryText, fontFamily: 'Arabic-Bold' },
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 40 },
  inputGroup: { marginBottom: 24 },
  labelContainer: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 8 },
  label: { fontSize: 14, color: Colors.primaryText, fontFamily: 'Arabic-Bold' },
  input: { backgroundColor: Colors.inputBackground, borderRadius: 12, height: 50, paddingHorizontal: 16, textAlign: 'right', fontFamily: 'Arabic-Bold', color: Colors.primaryText },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.inputBackground, borderRadius: 12, height: 50 },
  eyeIcon: { paddingHorizontal: 16 },
  button: { backgroundColor: Colors.cardBackground, width: '100%', paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  buttonText: { fontSize: 18, color: Colors.whiteText, fontFamily: 'Arabic-Bold' },
});