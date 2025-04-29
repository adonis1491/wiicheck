import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { X, Camera, Plus, Minus } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import PageHeader from '@/components/PageHeader';

type DrugFormData = {
  name: string;
  barcode: string;
};

export default function AddInventoryScreen() {
  const [step, setStep] = useState<'name' | 'inventory'>('name');
  const [formData, setFormData] = useState<DrugFormData>({
    name: '',
    barcode: '',
  });
  const [inventory, setInventory] = useState({
    halfTablets: 0,
    singleTablets: 0,
    bottles: 30,
    pieces: 0,
  });

  const handleSave = () => {
    // Here you would save the inventory data
    router.back();
  };

  const renderDrugNameForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.drugIconContainer}>
        <View style={styles.drugIcon} />
      </View>
      <Text style={styles.startText}>Start a quick and easy inventory.</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Drug Name<Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Drug Name"
          value={formData.name}
          onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
        />
        
        <Text style={styles.inputLabel}>No. or barcode</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter barcode number"
          value={formData.barcode}
          onChangeText={(text) => setFormData(prev => ({ ...prev, barcode: text }))}
        />
      </View>

      <TouchableOpacity 
        style={[styles.button, !formData.name && styles.buttonDisabled]}
        onPress={() => setStep('inventory')}
        disabled={!formData.name}
      >
        <Text style={styles.buttonText}>Add Drug Name</Text>
      </TouchableOpacity>
    </View>
  );

  const renderInventoryForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.drugName}>{formData.name}</Text>
      <Text style={styles.regDate}>Registration Date {new Date().toISOString().split('T')[0]}</Text>
      
      <View style={styles.totalCount}>
        <Text style={styles.totalCountText}>
          {inventory.halfTablets * 0.5 + inventory.singleTablets + (inventory.bottles * 30) + inventory.pieces}
        </Text>
      </View>

      <View style={styles.inventoryControls}>
        <Text style={styles.controlLabel}>0.5 Tablet</Text>
        <View style={styles.controlRow}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setInventory(prev => ({ ...prev, halfTablets: Math.max(0, prev.halfTablets - 1) }))}
          >
            <Minus size={20} color={Colors.gray700} />
          </TouchableOpacity>
          <Text style={styles.countText}>{inventory.halfTablets}</Text>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setInventory(prev => ({ ...prev, halfTablets: prev.halfTablets + 1 }))}
          >
            <Plus size={20} color={Colors.gray700} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton}>
            <Camera size={20} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton}>
            <Minus size={20} color={Colors.gray700} />
          </TouchableOpacity>
        </View>

        <Text style={styles.controlLabel}>1 Tablet</Text>
        <View style={styles.controlRow}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setInventory(prev => ({ ...prev, singleTablets: Math.max(0, prev.singleTablets - 1) }))}
          >
            <Minus size={20} color={Colors.gray700} />
          </TouchableOpacity>
          <Text style={styles.countText}>{inventory.singleTablets}</Text>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setInventory(prev => ({ ...prev, singleTablets: prev.singleTablets + 1 }))}
          >
            <Plus size={20} color={Colors.gray700} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton}>
            <Camera size={20} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton}>
            <Minus size={20} color={Colors.gray700} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottleRow}>
          <View style={styles.bottleControl}>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={() => setInventory(prev => ({ ...prev, bottles: Math.max(0, prev.bottles - 1) }))}
            >
              <Minus size={20} color={Colors.gray700} />
            </TouchableOpacity>
            <Text style={styles.countText}>{inventory.bottles}</Text>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={() => setInventory(prev => ({ ...prev, bottles: prev.bottles + 1 }))}
            >
              <Plus size={20} color={Colors.gray700} />
            </TouchableOpacity>
          </View>
          <Text style={styles.bottleLabel}>Tablet (T)</Text>
          <View style={styles.bottleControl}>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={() => setInventory(prev => ({ ...prev, pieces: Math.max(0, prev.pieces - 1) }))}
            >
              <Minus size={20} color={Colors.gray700} />
            </TouchableOpacity>
            <Text style={styles.countText}>{inventory.pieces}</Text>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={() => setInventory(prev => ({ ...prev, pieces: prev.pieces + 1 }))}
            >
              <Plus size={20} color={Colors.gray700} />
            </TouchableOpacity>
          </View>
          <Text style={styles.bottleLabel}>Pieces (pcs)</Text>
          <TouchableOpacity style={styles.removeButton}>
            <Minus size={20} color={Colors.gray700} />
          </TouchableOpacity>
        </View>

        <View style={styles.presetContainer}>
          <TouchableOpacity style={styles.presetButton}>
            <Text style={styles.presetText}>0.5 Tablet</Text>
            <Plus size={16} color={Colors.gray600} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.presetButton}>
            <Text style={styles.presetText}>1 Tablet</Text>
            <Plus size={16} color={Colors.gray600} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.presetButton}>
            <Text style={styles.presetText}>Preset</Text>
            <Plus size={16} color={Colors.gray600} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PageHeader 
        title="Inventory"
        showBackButton
        rightElement={
          <TouchableOpacity onPress={() => router.back()}>
            <X size={24} color={Colors.gray800} />
          </TouchableOpacity>
        }
      />
      {step === 'name' ? renderDrugNameForm() : renderInventoryForm()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  drugIconContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  drugIcon: {
    width: 80,
    height: 80,
    backgroundColor: Colors.gray200,
    borderRadius: 40,
  },
  startText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 24,
    color: Colors.gray800,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 40,
  },
  inputLabel: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    color: Colors.gray700,
    marginBottom: 8,
  },
  required: {
    color: Colors.danger,
  },
  input: {
    height: 56,
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: Colors.gray800,
    marginBottom: 20,
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
  button: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
  drugName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 24,
    color: Colors.gray900,
    marginBottom: 4,
  },
  regDate: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: Colors.gray600,
    marginBottom: 24,
  },
  totalCount: {
    alignItems: 'center',
    marginBottom: 32,
  },
  totalCountText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 48,
    color: Colors.primary,
  },
  inventoryControls: {
    gap: 16,
  },
  controlLabel: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    color: Colors.gray700,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: Colors.gray800,
    minWidth: 30,
    textAlign: 'center',
  },
  cameraButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  bottleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bottleControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bottleLabel: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: Colors.gray600,
    marginRight: 12,
  },
  presetContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  presetButton: {
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
  presetText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: Colors.gray700,
  },
});