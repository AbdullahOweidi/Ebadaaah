import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, Platform, StatusBar, TextInput, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function SupervisorsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Background Pattern */}
        <Image source={require('../../assets/images/bottom-pattern.png')} style={styles.bottomPattern} resizeMode="cover" />

        {/* Custom Header */}
        <View style={styles.header}>
          <Image source={require('../../assets/images/kaaba-icon.png')} style={styles.logo} resizeMode="contain" />
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Feather name="menu" size={28} color={Colors.primaryText} />
          </TouchableOpacity>
        </View>

        {/* Main Content Area */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Page Title */}
          <Text style={styles.pageTitle}>المشرفين</Text>

          {/* Search and Add Action Row */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
              <Feather name="user-plus" size={16} color={Colors.whiteText} />
              <Text style={styles.addButtonText}>إضافة مشرف جديد</Text>
            </TouchableOpacity>

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="بحث"
                placeholderTextColor={Colors.secondaryText}
              />
              <Feather name="search" size={20} color={Colors.primaryText} style={styles.searchIcon} />
            </View>
          </View>

          {/* Supervisor Card */}
          <View style={styles.card}>
            {/* Left Side: Action Icons and Badge */}
            <View style={styles.cardLeft}>
              <View style={styles.actionIconsRow}>
                <TouchableOpacity style={styles.circleIcon}>
                  <Ionicons name="chatbubble-ellipses-outline" size={14} color={Colors.whiteText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circleIcon}>
                  <Feather name="info" size={14} color={Colors.whiteText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circleIcon}>
                  <Feather name="heart" size={14} color={Colors.whiteText} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.badge}>
                <Text style={styles.badgeText}>الحجاج</Text>
              </View>
            </View>

            {/* Right Side: Name, Role, and Avatar */}
            <View style={styles.cardRight}>
              <View style={styles.textContainer}>
                <Text style={styles.supervisorName}>مشاعل العوفي</Text>
                <Text style={styles.supervisorRole}>مشرف مجموعة أ</Text>
              </View>
              
              <View style={styles.avatarContainer}>
                <Feather name="user" size={24} color={Colors.primaryText} />
              </View>
            </View>
          </View>

          {/* You can duplicate the <View style={styles.card}> block above to render more supervisors */}

        </ScrollView>

        {/* Floating Bottom Nav */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navIcon}>
            <Feather name="settings" size={24} color={Colors.primaryText} />
          </TouchableOpacity>
          {/* The chat icon is highlighted as active in this screen based on the design */}
          <TouchableOpacity style={styles.navIconActive}>
            <Ionicons name="chatbubble-outline" size={20} color={Colors.primaryText} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIcon} onPress={() => navigation.navigate('dashboard' as never)}>
            <Feather name="home" size={24} color={Colors.primaryText} />
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
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100, paddingTop: 20 },
  
  pageTitle: { fontSize: 24, fontFamily: 'Arabic-Bold', color: Colors.primaryText, textAlign: 'right', marginBottom: 20 },
  
  // Search and Action Row
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, gap: 10 },
  addButton: { backgroundColor: Colors.cardBackground, flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 8, flex: 0.45, justifyContent: 'center', gap: 6 },
  addButtonText: { color: Colors.whiteText, fontFamily: 'Arabic-Bold', fontSize: 12 },
  searchContainer: { flex: 0.55, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.inputBackground, borderRadius: 8, paddingHorizontal: 12, height: 44 },
  searchInput: { flex: 1, textAlign: 'right', fontFamily: 'Arabic-Bold', color: Colors.primaryText, paddingRight: 8 },
  searchIcon: { marginLeft: 8 },

  // Supervisor Card
  card: { backgroundColor: Colors.inputBackground, borderRadius: 16, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  cardLeft: { justifyContent: 'space-between', height: 60, alignItems: 'flex-start' },
  actionIconsRow: { flexDirection: 'row', gap: 6 },
  circleIcon: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.cardBackground, justifyContent: 'center', alignItems: 'center' },
  badge: { backgroundColor: Colors.cardBackground, paddingVertical: 4, paddingHorizontal: 16, borderRadius: 12, marginTop: 10 },
  badgeText: { color: Colors.whiteText, fontFamily: 'Arabic-Bold', fontSize: 10 },
  
  cardRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  textContainer: { alignItems: 'flex-end' },
  supervisorName: { fontSize: 16, fontFamily: 'Arabic-Bold', color: Colors.primaryText, marginBottom: 4 },
  supervisorRole: { fontSize: 12, fontFamily: 'Arabic-Bold', color: Colors.secondaryText },
  avatarContainer: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: Colors.cardBackground, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(97, 67, 42, 0.1)' },

  // Floating Bottom Navigation
  bottomNav: { position: 'absolute', bottom: 30, alignSelf: 'center', width: '80%', height: 60, backgroundColor: 'rgba(253, 234, 200, 0.9)', borderRadius: 30, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(108, 74, 45, 0.2)' },
  navIcon: { padding: 10 },
  navIconActive: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.buttonBackground, justifyContent: 'center', alignItems: 'center' },
});