import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Bell, Users as Users2, CreditCard, CircleHelp as HelpCircle, FileText, Chrome as Home } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function SettingsScreen() {
  const version = '3.2.6';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        {/* Profile Section */}
        <TouchableOpacity style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>adonix1014</Text>
            <Text style={styles.profileEmail}>adonix1014@gmail.com</Text>
          </View>
          <ChevronRight size={24} color={Colors.gray400} />
        </TouchableOpacity>

        {/* Team Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Team</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Users2 size={24} color={Colors.gray400} />
            <Text style={styles.menuText}>adonix1014</Text>
            <ChevronRight size={24} color={Colors.gray400} />
          </TouchableOpacity>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <CreditCard size={24} color={Colors.gray400} />
            <Text style={styles.menuText}>Compare Plans</Text>
            <ChevronRight size={24} color={Colors.gray400} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Bell size={24} color={Colors.gray400} />
            <Text style={styles.menuText}>Notifications</Text>
            <ChevronRight size={24} color={Colors.gray400} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <HelpCircle size={24} color={Colors.gray400} />
            <Text style={styles.menuText}>Customer Support</Text>
            <ChevronRight size={24} color={Colors.gray400} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <FileText size={24} color={Colors.gray400} />
            <Text style={styles.menuText}>Terms and Conditions</Text>
            <ChevronRight size={24} color={Colors.gray400} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Home size={24} color={Colors.primary} />
            <Text style={styles.menuText}>Homepage</Text>
            <ChevronRight size={24} color={Colors.gray400} />
          </TouchableOpacity>
        </View>

        {/* Version */}
        <Text style={styles.version}>Ver. {version}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    color: Colors.white,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: Colors.gray900,
  },
  profileEmail: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: Colors.gray600,
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    color: Colors.gray600,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  menuText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    color: Colors.gray800,
    marginLeft: 16,
  },
  version: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: Colors.gray500,
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
});