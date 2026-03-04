import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, 
  SafeAreaView, Platform, StatusBar, TextInput, ScrollView, 
  Modal, KeyboardAvoidingView, Alert, ActivityIndicator
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { Colors } from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

// Verify this matches your current npx localtunnel output
const BASE_URL = 'https://light-bananas-sip.loca.lt';

export default function SupervisorsScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Form States
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [nationalId, setNationalId] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [age, setAge] = useState<string>('');
  const [licenseId, setLicenseId] = useState<string>('');
  const [experience, setExperience] = useState<string>('');

  const handleAddSupervisor = async (): Promise<void> => {
    if (!name || !email || !password || !nationalId) {
      Alert.alert('تنبيه', 'يرجى ملء الاسم، البريد، كلمة المرور، ورقم الهوية');
      return;
    }

    setIsLoading(true);

    try {
      const token = await SecureStore.getItemAsync('userToken');
      
      // Constructing Payload based strictly on your SQL schema (int(11) vs text)
      const payload = {
        name: name, // Matches 'text' type
        email: email.trim(),
        password: password,
        phone_number: phone ? parseInt(phone, 10) : 0, // Matches 'int(11)'
        national_id: parseInt(nationalId, 10),        // Matches 'int(11)'
        gender: gender,                               // Matches 'varchar(10)'
        age: age ? parseInt(age, 10) : 0,             // Matches 'int(11)'
        license_id: licenseId ? parseInt(licenseId, 10) : 0, // Matches 'int(11)'
        years_of_experience: experience ? parseInt(experience, 10) : 0, // Matches 'int(11)'
        group_ID: 1, // Required 'int(11)' - Using 1 as a placeholder since it cannot be NULL
        type: 'supervisor'
      };

      const response = await fetch(`${BASE_URL}/api/supervisors`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Bypass-Tunnel-Reminder': 'true',
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        if (response.ok) {
          Alert.alert('نجاح', 'تمت إضافة المشرف بنجاح');
          setModalVisible(false);
          // Reset states
          setName(''); setEmail(''); setPassword(''); setPhone(''); 
          setNationalId(''); setAge(''); setLicenseId(''); setExperience('');
        } else {
          Alert.alert('خطأ', data.message || 'فشل في الإضافة');
        }
      } else {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        Alert.alert('خطأ في الخادم', `تحقق من الـ Terminal الخاص بـ Laravel. كود الخطأ: ${response.status}`);
      }
    } catch (error) {
      Alert.alert('خطأ في الاتصال', 'تعذر الوصول إلى الخادم');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('../../assets/images/bottom-pattern.png')} style={styles.bottomPattern} resizeMode="cover" />

        <View style={styles.header}>
          <Image source={require('../../assets/images/kaaba-icon.png')} style={styles.logo} resizeMode="contain" />
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Feather name="menu" size={28} color={Colors.primaryText} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>المشرفين</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={() => setModalVisible(true)}>
              <Feather name="user-plus" size={16} color={Colors.whiteText} />
              <Text style={styles.addButtonText}>إضافة مشرف جديد</Text>
            </TouchableOpacity>

            <View style={styles.searchContainer}>
              <TextInput style={styles.searchInput} placeholder="بحث" placeholderTextColor={Colors.secondaryText} />
              <Feather name="search" size={20} color={Colors.primaryText} style={styles.searchIcon} />
            </View>
          </View>

          {/* Supervisor Card Display */}
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <View style={styles.actionIconsRow}>
                <TouchableOpacity style={styles.circleIcon}><Ionicons name="chatbubble-ellipses-outline" size={14} color={Colors.whiteText} /></TouchableOpacity>
                <TouchableOpacity style={styles.circleIcon}><Feather name="info" size={14} color={Colors.whiteText} /></TouchableOpacity>
                <TouchableOpacity style={styles.circleIcon}><Feather name="heart" size={14} color={Colors.whiteText} /></TouchableOpacity>
              </View>
              <View style={styles.badge}><Text style={styles.badgeText}>الحجاج</Text></View>
            </View>
            <View style={styles.cardRight}>
              <View style={styles.textContainer}>
                <Text style={styles.supervisorName}>مشاعل العوفي</Text>
                <Text style={styles.supervisorRole}>مشرف مجموعة أ</Text>
              </View>
              <View style={styles.avatarContainer}><Feather name="user" size={24} color={Colors.primaryText} /></View>
            </View>
          </View>
        </ScrollView>

        {/* Modal Section */}
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}><Feather name="x" size={24} color={Colors.primaryText} /></TouchableOpacity>
                  <Text style={styles.modalTitle}>إضافة مشرف جديد</Text>
                </View>

                <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
                  <Text style={styles.modalLabel}>الاسم الكامل</Text>
                  <TextInput style={styles.modalInput} value={name} onChangeText={setName} placeholder="ادخل الاسم" textAlign="right" />

                  <Text style={styles.modalLabel}>البريد الإلكتروني</Text>
                  <TextInput style={styles.modalInput} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="example@mail.com" textAlign="right" />

                  <Text style={styles.modalLabel}>كلمة المرور</Text>
                  <TextInput style={styles.modalInput} value={password} onChangeText={setPassword} secureTextEntry placeholder="********" textAlign="right" />

                  <Text style={styles.modalLabel}>رقم الهوية (أرقام فقط)</Text>
                  <TextInput style={styles.modalInput} value={nationalId} onChangeText={setNationalId} keyboardType="numeric" placeholder="10xxxxxxxx" textAlign="right" />

                  <Text style={styles.modalLabel}>رقم الهاتف (أرقام فقط)</Text>
                  <TextInput style={styles.modalInput} value={phone} onChangeText={setPhone} keyboardType="numeric" placeholder="962xxxxxxx" textAlign="right" />

                  <View style={styles.modalRow}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <Text style={styles.modalLabel}>العمر</Text>
                      <TextInput style={styles.modalInput} value={age} onChangeText={setAge} keyboardType="numeric" placeholder="30" textAlign="right" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.modalLabel}>الجنس</Text>
                      <View style={styles.genderContainer}>
                        <TouchableOpacity style={[styles.genderButton, gender === 'female' && styles.genderButtonActive]} onPress={() => setGender('female')}>
                          <Text style={[styles.genderText, gender === 'female' && styles.genderTextActive]}>أنثى</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.genderButton, gender === 'male' && styles.genderButtonActive]} onPress={() => setGender('male')}>
                          <Text style={[styles.genderText, gender === 'male' && styles.genderTextActive]}>ذكر</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <Text style={styles.modalLabel}>رقم الرخصة</Text>
                  <TextInput style={styles.modalInput} value={licenseId} onChangeText={setLicenseId} keyboardType="numeric" placeholder="رقم الرخصة" textAlign="right" />

                  <Text style={styles.modalLabel}>سنوات الخبرة</Text>
                  <TextInput style={styles.modalInput} value={experience} onChangeText={setExperience} keyboardType="numeric" placeholder="مثال: 5" textAlign="right" />

                  <TouchableOpacity style={styles.modalSubmitButton} onPress={handleAddSupervisor} disabled={isLoading}>
                    {isLoading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.modalSubmitText}>إضافة المشرف</Text>}
                  </TouchableOpacity>
                  <View style={{ height: 20 }} />
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
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
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, gap: 10 },
  addButton: { backgroundColor: Colors.cardBackground, flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 8, flex: 0.45, justifyContent: 'center', gap: 6 },
  addButtonText: { color: Colors.whiteText, fontFamily: 'Arabic-Bold', fontSize: 12 },
  searchContainer: { flex: 0.55, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.inputBackground, borderRadius: 8, paddingHorizontal: 12, height: 44 },
  searchInput: { flex: 1, textAlign: 'right', fontFamily: 'Arabic-Bold', color: Colors.primaryText, paddingRight: 8 },
  searchIcon: { marginLeft: 8 },
  card: { backgroundColor: Colors.inputBackground, borderRadius: 16, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardLeft: { justifyContent: 'space-between', height: 60, alignItems: 'flex-start' },
  actionIconsRow: { flexDirection: 'row', gap: 6 },
  circleIcon: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.cardBackground, justifyContent: 'center', alignItems: 'center' },
  badge: { backgroundColor: Colors.cardBackground, paddingVertical: 4, paddingHorizontal: 16, borderRadius: 12, marginTop: 10 },
  badgeText: { color: Colors.whiteText, fontFamily: 'Arabic-Bold', fontSize: 10 },
  cardRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  textContainer: { alignItems: 'flex-end' },
  supervisorName: { fontSize: 16, fontFamily: 'Arabic-Bold', color: Colors.primaryText },
  supervisorRole: { fontSize: 12, fontFamily: 'Arabic-Bold', color: Colors.secondaryText },
  avatarContainer: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: Colors.cardBackground, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(97, 67, 42, 0.1)' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' },
  modalContainer: { paddingHorizontal: 20, maxHeight: height * 0.8 },
  modalContent: { backgroundColor: Colors.background, borderRadius: 20, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  modalTitle: { fontSize: 18, fontFamily: 'Arabic-Bold', color: Colors.primaryText },
  modalForm: { width: '100%' },
  modalLabel: { fontSize: 14, fontFamily: 'Arabic-Bold', color: Colors.primaryText, textAlign: 'right', marginBottom: 6 },
  modalInput: { backgroundColor: Colors.inputBackground, borderRadius: 12, height: 48, paddingHorizontal: 16, marginBottom: 12, color: Colors.primaryText, fontFamily: 'Arabic-Bold' },
  modalRow: { flexDirection: 'row', marginBottom: 4 },
  genderContainer: { flexDirection: 'row', backgroundColor: Colors.inputBackground, borderRadius: 12, height: 48, padding: 4 },
  genderButton: { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  genderButtonActive: { backgroundColor: Colors.cardBackground },
  genderText: { fontFamily: 'Arabic-Bold', fontSize: 12, color: Colors.primaryText },
  genderTextActive: { color: Colors.whiteText },
  modalSubmitButton: { backgroundColor: Colors.cardBackground, borderRadius: 12, height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 15 },
  modalSubmitText: { color: '#FFF', fontSize: 16, fontFamily: 'Arabic-Bold' }
});