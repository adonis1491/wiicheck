import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Pill, Package, ChevronDown, Bell, MessageSquareText, Info } from 'lucide-react-native';

import Colors from '@/constants/Colors';
import AppLogo from '@/components/AppLogo';

export default function HomeScreen() {
  const [pharmacy, setPharmacy] = useState('Happy Pharmacy');
  
  const recentCounts = [
    { id: 1, image: 'https://images.pexels.com/photos/159211/headache-pain-pills-medication-159211.jpeg', count: 120 },
    { id: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSMa80XndJurVn9Q4Y2Uigyfp_fUVCGKEFeA&s', count: 45 },
    { id: 3, image: 'https://bsmedia.business-standard.com/_media/bs/img/article/2023-07/12/full/1689175810-294.jpg?im=FitAndFill=(826,465)', count: 78 },
    { id: 4, image: 'https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg', count: 234 },
    { id: 5, image: 'https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg', count: 65 },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <AppLogo />
            <TouchableOpacity style={styles.pharmacySelector}>
              <Text style={styles.pharmacyName}>{pharmacy}</Text>
              <ChevronDown size={20} color={Colors.gray600} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Bell size={24} color={Colors.gray800} />
          </TouchableOpacity>
        </View>

        <View style={styles.actionCards}>
          <Link href="/count" style={styles.actionCard}>
            <Pill size={32} color={Colors.white} />
            <Text style={styles.actionCardText}>Quick Count</Text>
          </Link>
          <Link href="/inventory" style={styles.actionCard}>
            <Package size={32} color={Colors.white} />
            <Text style={styles.actionCardText}>Inventory</Text>
          </Link>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent History</Text>
          <Link href="/history">
            <Text style={styles.viewMoreText}>View More</Text>
          </Link>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.recentHistoryScroll}
        >
          {recentCounts.map(item => (
            <TouchableOpacity key={item.id} style={styles.historyItem}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.historyItemImage} 
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.infoCards}>
          <TouchableOpacity style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Bell size={24} color={Colors.white} />
            </View>
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardTitle}>Introducing New Feature : Live Mode</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.infoCard}>
            <View style={[styles.infoIconContainer, styles.helpIconContainer]}>
              <MessageSquareText size={24} color={Colors.white} />
            </View>
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardTitle}>Discover WiiCheck User Guide</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  logoContainer: {
    flexDirection: 'column',
  },
  pharmacySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  pharmacyName: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    color: Colors.gray700,
    marginRight: 4,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  actionCard: {
    width: '48%',
    height: 160,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  actionCardText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: Colors.white,
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: Colors.gray900,
  },
  viewMoreText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: Colors.gray500,
  },
  recentHistoryScroll: {
    paddingRight: 20,
  },
  historyItem: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  historyItemImage: {
    width: '100%',
    height: '100%',
  },
  infoCards: {
    marginTop: 28,
    marginBottom: 24,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: Colors.gray100,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  helpIconContainer: {
    backgroundColor: Colors.gray400,
  },
  infoCardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  infoCardTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: Colors.gray800,
  },
});