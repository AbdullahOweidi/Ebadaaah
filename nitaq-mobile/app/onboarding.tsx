import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Half: Illustration */}
      <View style={styles.topSection}>
        <Image
          source={require('../assets/images/illustration.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Half: Details Card */}
      <View style={styles.bottomCard}>
        {/* Faint pattern overlay */}
        <Image
          source={require('../assets/images/pattern.png')}
          style={styles.cardPattern}
          resizeMode="cover"
        />

        <View style={styles.cardContent}>
          <Text style={styles.descriptionText}>هنا نعرض مميزات برنامجنا</Text>

          <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8}
            onPress={() => router.push('/login-selection')}
          >
            <Text style={styles.buttonText}>استمرار</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topSection: {
    flex: 1.2, // Takes up slightly more than half the screen
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  illustration: {
    width: '90%',
    height: '70%',
  },
  bottomCard: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden', // Ensures the pattern doesn't spill out of the rounded corners
  },
  cardPattern: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: '100%',
    opacity: 0.05, // Keeps the pattern faint
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  descriptionText: {
    fontSize: 20,
    color: Colors.whiteText,
    fontFamily: 'Arabic-Bold',
    textAlign: 'center',
    marginBottom: 60,
  },
  button: {
    backgroundColor: Colors.buttonBackground,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: Colors.primaryText,
    fontFamily: 'Arabic-Bold',
  },
});