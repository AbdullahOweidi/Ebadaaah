import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { Colors } from '../../constants/Colors';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();
  const pathname = usePathname(); // Gets the current active route

  // Helper functions to determine the correct style based on the current path
  const isRouteActive = (route: string) => pathname.includes(route);
  const getContainerStyle = (route: string) => isRouteActive(route) ? styles.activeLink : styles.link;
  const getTextStyle = (route: string) => isRouteActive(route) ? styles.activeLinkText : styles.linkText;

  return (
    <DrawerContentScrollView {...props} style={styles.drawerStyle}>
      <View style={styles.drawerHeader}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Feather name="chevron-left" size={28} color={Colors.primaryText} />
        </TouchableOpacity>
        <View style={styles.campaignTag}>
          <Text style={styles.campaignText}>حملة الفرقان</Text>
          <View style={styles.campaignIcon}><Text style={styles.campaignIconText}>ح ف</Text></View>
        </View>
      </View>

      <View style={styles.drawerLinks}>
        <Text style={styles.sectionTitle}>الإدارة</Text>
        
        {/* Dashboard Link */}
        <TouchableOpacity 
          style={getContainerStyle('dashboard')} 
          onPress={() => router.push('./organization_dashboard')}
        >
          <Text style={getTextStyle('dashboard')}>لوحة{'\u00A0'}التحكم</Text>
        </TouchableOpacity>
        
        {/* Supervisors Link */}
        <TouchableOpacity 
          style={getContainerStyle('supervisors')} 
          onPress={() => router.push('./organization_supervisors')}
        >
          <Text style={getTextStyle('supervisors')}>المشرفين</Text>
        </TouchableOpacity>
        
        {/* Future Links (Update the onPress routing as you build them) */}
        <TouchableOpacity style={getContainerStyle('transportation')}>
          <Text style={getTextStyle('transportation')}>المواصلات</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={getContainerStyle('pilgrims')}>
          <Text style={getTextStyle('pilgrims')}>الحجاج</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={getContainerStyle('medical')}>
          <Text style={getTextStyle('medical')}>الطاقم{'\u00A0'}الطبي</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, 
        drawerPosition: 'right', 
        drawerType: 'front',
        drawerStyle: {
          width: '70%',
          backgroundColor: Colors.background,
        },
      }}
    >
      <Drawer.Screen name="dashboard" />
      <Drawer.Screen name="supervisors" />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerStyle: { flex: 1, backgroundColor: Colors.background },
  drawerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 20 },
  campaignTag: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  campaignText: { fontSize: 14, fontFamily: 'Arabic-Bold', color: Colors.primaryText },
  campaignIcon: { width: 30, height: 30, backgroundColor: Colors.cardBackground, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  campaignIconText: { color: Colors.whiteText, fontSize: 10, fontFamily: 'Arabic-Bold' },
  drawerLinks: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { fontSize: 12, color: Colors.secondaryText, fontFamily: 'Arabic-Bold', textAlign: 'right', marginBottom: 16 },
  
  // Base link styles
  link: { paddingVertical: 12, paddingHorizontal: 16, marginBottom: 8 },
  linkText: { fontSize: 16, color: Colors.primaryText, fontFamily: 'Arabic-Bold', textAlign: 'right' },
  
  // Active link styles
  activeLink: { backgroundColor: Colors.inputBackground, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, marginBottom: 8, borderRightWidth: 4, borderRightColor: Colors.primaryText },
  activeLinkText: { fontSize: 16, color: Colors.primaryText, fontFamily: 'Arabic-Bold', textAlign: 'right' },
});