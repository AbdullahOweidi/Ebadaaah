import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, TextInput, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
  const router = useRouter();

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
          <Text style={styles.headerTitle}>اعادة تعيين كلمة المرور</Text>
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
            />
          </View>

          {/* Next Button */}
          <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8}
            onPress={() => router.push('./new-password')}
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
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 60 },
  inputGroup: { marginBottom: 40 },
  labelContainer: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 8 },
  label: { fontSize: 14, color: Colors.primaryText, fontFamily: 'Arabic-Bold', marginRight: 8 },
  labelIcon: { marginLeft: 4 },
  input: { backgroundColor: Colors.inputBackground, borderRadius: 12, height: 50, paddingHorizontal: 16, textAlign: 'right', fontFamily: 'Arabic-Bold', color: Colors.primaryText },
  button: { backgroundColor: Colors.cardBackground, width: '100%', paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  buttonText: { fontSize: 18, color: Colors.whiteText, fontFamily: 'Arabic-Bold' },
});