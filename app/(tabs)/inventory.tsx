import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Modal, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Barcode, Camera, PenLine, ChevronRight, X, Plus, Minus } from 'lucide-react-native';
import { Link, router } from 'expo-router';
import Colors from '@/constants/Colors';
import PageHeader from '@/components/PageHeader';

type MedicationItem = {
  id: string;
  name: string;
  dosage: string;
  count: number;
  countPerBottle: number;
  bottles: number;
  loose: number;
  regDate?: string;
};

export default function InventoryScreen() {
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [selectedMedication, setSelectedMedication] = useState<MedicationItem | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editBottles, setEditBottles] = useState(0);
  const [editLoose, setEditLoose] = useState(0);

  const medicationItems: MedicationItem[] = [
    {
      id: '1',
      name: 'Acetylcysteine Capsule',
      dosage: '200mg',
      count: 107,
      countPerBottle: 100,
      bottles: 1,
      loose: 7,
      regDate: '2024.08.30'
    },
    {
      id: '2',
      name: 'Jikimycin Tablet',
      dosage: '50mg',
      count: 65,
      countPerBottle: 30,
      bottles: 2,
      loose: 5
    },
    {
      id: '3',
      name: 'Levonorgestrel',
      dosage: '1.5mg',
      count: 42,
      countPerBottle: 30,
      bottles: 1,
      loose: 12
    },
    {
      id: '4',
      name: 'Amoxicillin',
      dosage: '500mg',
      count: 180,
      countPerBottle: 60,
      bottles: 3,
      loose: 0
    },
    {
      id: '5',
      name: 'Ibuprofen',
      dosage: '200mg',
      count: 83,
      countPerBottle: 50,
      bottles: 1,
      loose: 33
    },
    {
      id: '6',
      name: 'Loratadine',
      dosage: '10mg',
      count: 24,
      countPerBottle: 24,
      bottles: 1,
      loose: 0
    },
  ];

  const filteredItems = medicationItems.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.dosage.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleMedicationPress = (medication: MedicationItem) => {
    setSelectedMedication(medication);
    setEditBottles(medication.bottles);
    setEditLoose(medication.loose);
    setIsEditModalVisible(true);
  };

  const handleUpdateInventory = () => {
    // Here you would update the medication inventory
    setIsEditModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PageHeader
        title="My Inventory"
      />

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.gray500} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medications..."
            placeholderTextColor={Colors.gray400}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <TouchableOpacity style={styles.barcodeButton}>
          <Barcode size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.sortContainer}>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortButtonText}>
            {sortOption === 'newest' ? 'Newest First' : 'Alphabetical'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.medicationCard}
            onPress={() => handleMedicationPress(item)}
          >
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>
                {item.name} {item.dosage}
              </Text>

              <View style={styles.medicationDetails}>
                <Text style={styles.medicationDetailText}>
                  {item.countPerBottle} tablets/bottle
                </Text>
                <Text style={styles.medicationDetailText}>
                  {item.bottles} {item.bottles === 1 ? 'bottle' : 'bottles'}
                </Text>
                {item.loose > 0 && (
                  <Text style={styles.medicationDetailText}>
                    {item.loose} loose
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.countContainer}>
              <Text style={styles.countText}>{item.count}</Text>
              <ChevronRight size={20} color={Colors.gray400} />
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/count')}
        >
          <Camera size={20} color={Colors.white} style={{ marginRight: 8 }} />
          <Text style={styles.actionButtonText}>Take A Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/inventory/add')}
        >
          <PenLine size={20} color={Colors.white} style={{ marginRight: 8 }} />
          <Text style={styles.actionButtonText}>Add Inventory</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.scanBarcodeButton}>
          <Barcode size={20} color={Colors.white} style={{ marginRight: 8 }} />
          <Text style={styles.scanBarcodeText}>Scan barcode</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isEditModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Medication Inventory</Text>
              <TouchableOpacity
                onPress={() => setIsEditModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color={Colors.gray700} />
              </TouchableOpacity>
            </View>

            <Text style={styles.medicationTitle}>
              {selectedMedication?.name} {selectedMedication?.dosage}
            </Text>
            {selectedMedication?.regDate && (
              <Text style={styles.regDateText}>
                Reg Date {selectedMedication.regDate}
              </Text>
            )}

            <View style={styles.countTotal}>
              <Text style={styles.countTotalText}>
                {(editBottles * (selectedMedication?.countPerBottle || 0)) + editLoose}
              </Text>
            </View>

            <View style={styles.editSection}>
              <Text style={styles.editLabel}>
                {selectedMedication?.countPerBottle} tablets/bottle
              </Text>
              <View style={styles.editControls}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setEditBottles(Math.max(0, editBottles - 1))}
                >
                  <Minus size={20} color={Colors.gray700} />
                </TouchableOpacity>
                <Text style={styles.editValue}>{editBottles}</Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setEditBottles(editBottles + 1)}
                >
                  <Plus size={20} color={Colors.gray700} />
                </TouchableOpacity>
                <Text style={styles.editUnit}>bottle</Text>
              </View>

              <View style={styles.editControls}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setEditLoose(Math.max(0, editLoose - 1))}
                >
                  <Minus size={20} color={Colors.gray700} />
                </TouchableOpacity>
                <Text style={styles.editValue}>{editLoose}</Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setEditLoose(editLoose + 1)}
                >
                  <Plus size={20} color={Colors.gray700} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton}>
                  <Camera size={20} color={Colors.white} />
                </TouchableOpacity>
              </View>

              <View style={styles.quickAddContainer}>
                <TouchableOpacity style={styles.quickAddButton}>
                  <Text style={styles.quickAddText}>Half tablet</Text>
                  <Plus size={16} color={Colors.gray600} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickAddButton}>
                  <Text style={styles.quickAddText}>One tablet</Text>
                  <Plus size={16} color={Colors.gray600} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickAddButton}>
                  <Text style={styles.quickAddText}>Example</Text>
                  <Plus size={16} color={Colors.gray600} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleUpdateInventory}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  searchInputContainer: {
    flex: 1,
    height: 48,
    backgroundColor: Colors.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginRight: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: Colors.gray800,
  },
  barcodeButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sortButton: {
    alignSelf: 'flex-start',
  },
  sortButtonText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: Colors.gray600,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  medicationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  medicationInfo: {
    flex: 1,
    marginRight: 8,
  },
  medicationName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: Colors.gray900,
    marginBottom: 4,
  },
  medicationDetails: {
    flexDirection: 'column',
  },
  medicationDetailText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: Colors.gray600,
    marginTop: 2,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    color: Colors.primary,
    marginRight: 8,
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  actionButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
  scanBarcodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  scanBarcodeText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    color: Colors.gray900,
  },
  closeButton: {
    padding: 4,
  },
  medicationTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: Colors.gray800,
    marginBottom: 4,
  },
  regDateText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: Colors.gray600,
    marginBottom: 16,
  },
  countTotal: {
    alignItems: 'center',
    marginBottom: 24,
  },
  countTotalText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 36,
    color: Colors.primary,
  },
  editSection: {
    gap: 16,
  },
  editLabel: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    color: Colors.gray700,
  },
  editControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editValue: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: Colors.gray800,
    minWidth: 30,
    textAlign: 'center',
  },
  editUnit: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: Colors.gray600,
    marginLeft: 8,
  },
  cameraButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAddContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  quickAddButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray100,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  quickAddText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: Colors.gray700,
  },
  registerButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  registerButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
});
