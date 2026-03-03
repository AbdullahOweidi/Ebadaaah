import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('../../assets/images/bottom-pattern.png')} style={styles.bottomPattern} resizeMode="cover" />

        {/* Custom Header */}
        <View style={styles.header}>
          <Image source={require('../../assets/images/kaaba-icon.png')} style={styles.logo} resizeMode="contain" />
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Feather name="menu" size={28} color={Colors.primaryText} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.card}>
            <Image source={require('../../assets/images/kaaba-card.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>نبذة{'\u00A0'}عن{'\u00A0'}نطاق</Text>
          </View>
        </View>

        {/* Floating Bottom Nav */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navIcon}>
            <Feather name="settings" size={24} color={Colors.primaryText} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIcon}>
            <Ionicons name="chatbubble-outline" size={24} color={Colors.primaryText} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIconActive}>
            <Feather name="home" size={20} color={Colors.primaryText} />
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  logo: { width: 50, height: 50 },
  content: { flex: 1, padding: 20, marginTop: 20 },
  card: { backgroundColor: Colors.inputBackground, borderRadius: 20, flexDirection: 'row', alignItems: 'center', padding: 12, justifyContent: 'space-between' },
  cardImage: { width: 100, height: 100, borderRadius: 12 },
  cardText: { fontSize: 18, fontFamily: 'Arabic-Bold', color: Colors.primaryText, marginRight: 16 },
  
  // Floating Bottom Navigation
  bottomNav: { position: 'absolute', bottom: 30, alignSelf: 'center', width: '80%', height: 60, backgroundColor: 'rgba(253, 234, 200, 0.9)', borderRadius: 30, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(108, 74, 45, 0.2)' },
  navIcon: { padding: 10 },
  navIconActive: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.buttonBackground, justifyContent: 'center', alignItems: 'center' },
});