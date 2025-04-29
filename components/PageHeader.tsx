import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

type PageHeaderProps = {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
};

export default function PageHeader({ 
  title, 
  showBackButton = false, 
  onBack,
  rightElement
}: PageHeaderProps) {
  const router = useRouter();
  
  const handleBackPress = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <ArrowLeft size={24} color={Colors.gray800} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      {rightElement && (
        <View style={styles.rightContainer}>
          {rightElement}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    color: Colors.gray900,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});