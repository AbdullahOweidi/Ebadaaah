import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

export default function LoginSelectionScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Bottom Geometric Pattern */}
        <Image
          source={require('../assets/images/bottom-pattern.png')}
          style={styles.bottomPattern}
          resizeMode="cover"
        />

        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={Colors.primaryText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>تسجيل الدخول</Text>
          {/* Empty view to balance the flex layout and keep the title centered/right-aligned visually */}
          <View style={{ width: 24 }} /> 
        </View>

        {/* Center Content */}
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            مرحبا بك في <Text style={styles.brandName}>نطاق</Text>
          </Text>

          {/* Buttons */}
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonText}>حساب مؤسسة</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonText}>حساب مشرف</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonText}>حساب حاج</Text>
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
    // Add top padding for Android to avoid overlapping with the status bar
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  bottomPattern: {
    width: width,
    height: '40%',
    position: 'absolute',
    bottom: 0,
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    zIndex: 10, // Ensures the header stays above other elements
  },
  backButton: {
    padding: 8,
    marginLeft: -8, // Adjusts touch target alignment
  },
  headerTitle: {
    fontSize: 22,
    color: Colors.primaryText,
    fontFamily: 'Arabic-Bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: -40, // Offsets the flex-center slightly upwards to match the design
  },
  subtitle: {
    fontSize: 20,
    color: Colors.primaryText,
    fontFamily: 'Arabic-Bold',
    marginBottom: 40,
  },
  brandName: {
    fontSize: 22,
    color: Colors.cardBackground, // Uses the darker brown for emphasis
  },
  button: {
    backgroundColor: Colors.cardBackground, // Dark brown from the theme
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.whiteText,
    fontFamily: 'Arabic-Bold',
  },
});