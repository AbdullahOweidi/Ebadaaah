import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, Dimensions, Animated, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity is 1

  const handlePress = () => {
    // Trigger the fade-out animation on tap
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade to 0 opacity
      duration: 500, // Duration of the fade in milliseconds
      useNativeDriver: true, // Optimizes performance
    }).start(() => {
      // Once the animation completes, navigate to the onboarding screen
      router.replace('/onboarding');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Pressable wraps the entire screen to detect taps anywhere */}
      <Pressable style={styles.pressableContainer} onPress={handlePress}>
        <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
          <Image
            source={require('../assets/images/pattern.png')}
            style={styles.topPattern}
            resizeMode="cover"
          />

          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/kaaba-icon.png')}
                style={styles.logoIcon}
                resizeMode="contain"
              />
              <Text style={styles.titleArabic}>نطاق</Text>
              <Text style={styles.titleEnglish}>Nitaq</Text>
            </View>

            <Text style={styles.subtitle}>إدارة متكاملة لرحلة حج متكاملة</Text>
          </View>
        </Animated.View>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  pressableContainer: {
    flex: 1, // Ensures the touchable area covers the entire screen
  },
  animatedContainer: {
    flex: 1,
  },
  topPattern: {
    width: width,
    height: 250,
    position: 'absolute',
    top: 0,
    opacity: 0.5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  logoIcon: {
    height: 100,
    marginBottom: -25,
  },
  titleArabic: {
    fontSize: 32,
    color: Colors.primaryText,
    marginBottom: 0,
    fontFamily: 'Arabic-Bold', 
  },
  titleEnglish: {
    fontSize: 24,
    color: Colors.primaryText,
    fontFamily: 'Arabic-Bold', 
  },
  subtitle: {
    position: 'absolute',
    bottom: 80,
    fontSize: 16,
    color: Colors.primaryText,
    fontFamily: 'Arabic-Bold', 
  },
});