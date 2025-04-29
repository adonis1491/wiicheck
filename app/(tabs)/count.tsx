import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { BlurView } from 'expo-blur';
import { X, Info, HelpCircle, Pill, Loader2 } from 'lucide-react-native';
import { Link, router } from 'expo-router';
import * as Haptics from 'expo-haptics';

import Colors from '@/constants/Colors';
import CounterDisplay from '@/components/CounterDisplay';

type CountMode = 'photo' | 'live';

export default function CountScreen() {
  const [countMode, setCountMode] = useState<CountMode>('photo');
  const [isCountingActive, setIsCountingActive] = useState(false);
  const [pillCount, setPillCount] = useState(0);
  const [pillType, setPillType] = useState('');
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);
  
  const animatedValue = useRef(new Animated.Value(0)).current;
  const cameraRef = useRef(null);

  useFocusEffect(() => {
    // Reset state when screen comes into focus
    return () => {
      if (!isCountingActive) {
        setPillCount(0);
        setPillType('');
      }
    };
  });

  // Simulated count increases for live mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (countMode === 'live' && isCountingActive) {
      interval = setInterval(() => {
        setPillCount(count => {
          const newCount = count + Math.floor(Math.random() * 3) + 1;
          
          // Vibrate on certain count milestones
          if (Platform.OS !== 'web' && newCount % 10 === 0) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          
          return newCount;
        });
      }, 500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [countMode, isCountingActive]);

  const toggleCountMode = () => {
    const newMode = countMode === 'photo' ? 'live' : 'photo';
    setCountMode(newMode);
    
    // Reset count when switching modes
    setPillCount(0);
    setIsCountingActive(false);
  };

  const handleCapture = async () => {
    if (countMode === 'photo') {
      if (!cameraRef.current) return;
      
      setIsLoading(true);
      
      try {
        // Simulate photo processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate random count between 20 and 400
        const randomCount = Math.floor(Math.random() * 380) + 20;
        setPillCount(randomCount);
        setPillType('Aldactone 25mg');
        
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      } catch (e) {
        console.error('Error capturing photo:', e);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Toggle live counting
      setIsCountingActive(!isCountingActive);
      
      if (!isCountingActive) {
        setPillType('Aldactone 25mg');
      }
      
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    }
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to use the camera
        </Text>
        <TouchableOpacity 
          style={styles.permissionButton} 
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        ref={cameraRef}
        style={styles.camera} 
        facing={facing}
        enableZoomGesture
      >
        {/* Header */}
        <SafeAreaView edges={['top']} style={styles.headerContainer}>
          <BlurView intensity={100} tint="dark" style={styles.headerBlur}>
            <View style={styles.header}>
              <TouchableOpacity 
                onPress={() => router.back()}
                style={styles.closeButton}
              >
                <X size={24} color={Colors.white} />
              </TouchableOpacity>
              
              {/* Mode toggle */}
              <View style={styles.modeToggleContainer}>
                <TouchableOpacity 
                  style={[
                    styles.modeToggleButton, 
                    countMode === 'photo' && styles.modeToggleButtonActive
                  ]}
                  onPress={() => setCountMode('photo')}
                >
                  <Text style={[
                    styles.modeToggleText,
                    countMode === 'photo' && styles.modeToggleTextActive
                  ]}>
                    Photo
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.modeToggleButton, 
                    countMode === 'live' && styles.modeToggleButtonActive
                  ]}
                  onPress={() => setCountMode('live')}
                >
                  <Text style={[
                    styles.modeToggleText,
                    countMode === 'live' && styles.modeToggleTextActive
                  ]}>
                    Live
                  </Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.infoButton}>
                <HelpCircle size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </BlurView>
        </SafeAreaView>
        
        {/* Pill type info */}
        {pillType ? (
          <View style={styles.pillInfoContainer}>
            <BlurView intensity={100} tint="dark" style={styles.pillInfoBlur}>
              <View style={styles.pillInfo}>
                <Text style={styles.pillInfoText}>{pillType}</Text>
                <TouchableOpacity 
                  style={styles.pillInfoCloseBtn}
                  onPress={() => setPillType('')}
                >
                  <X size={18} color={Colors.white} />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.pillInfoSubtext}>
                EXP 2024.08.30 • LOT 013486543
              </Text>
            </BlurView>
          </View>
        ) : null}
        
        {/* Count result display at bottom */}
        {pillCount > 0 && (
          <View style={styles.countResultContainer}>
            <BlurView intensity={100} tint="dark" style={styles.countResultBlur}>
              <CounterDisplay count={pillCount} />
            </BlurView>
          </View>
        )}
        
        {/* Capture button */}
        <View style={styles.captureContainer}>
          <TouchableOpacity 
            style={[
              styles.captureButton, 
              countMode === 'live' && isCountingActive && styles.captureButtonActive
            ]}
            onPress={handleCapture}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 size={32} color={Colors.white} style={{ opacity: 0.9 }} />
            ) : countMode === 'live' ? (
              <Pill size={32} color={Colors.white} style={{ opacity: 0.9 }} />
            ) : (
              <View style={styles.captureButtonInner} />
            )}
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  permissionButtonText: {
    fontFamily: 'PlusJakartaSans-Medium',
    color: Colors.white,
    fontSize: 16,
  },
  headerContainer: {
    width: '100%',
  },
  headerBlur: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeToggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 4,
  },
  modeToggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  modeToggleButtonActive: {
    backgroundColor: Colors.primary,
  },
  modeToggleText: {
    fontFamily: 'PlusJakartaSans-Medium',
    color: Colors.white,
    fontSize: 14,
  },
  modeToggleTextActive: {
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillInfoContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 120 : 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  pillInfoBlur: {
    borderRadius: 16,
    padding: 16,
    width: '90%',
  },
  pillInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pillInfoText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: Colors.white,
    fontSize: 18,
  },
  pillInfoCloseBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillInfoSubtext: {
    fontFamily: 'PlusJakartaSans-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 4,
  },
  countResultContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  countResultBlur: {
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 30,
  },
  captureContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.white,
  },
  captureButtonActive: {
    backgroundColor: Colors.danger,
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.white,
  },
});