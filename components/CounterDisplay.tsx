import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { HelpCircle } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Colors from '@/constants/Colors';

type CounterDisplayProps = {
  count: number;
};

export default function CounterDisplay({ count }: CounterDisplayProps) {
  // Animated style for number to bounce on change
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(1.05, { damping: 6, stiffness: 100 }, () => {
          'worklet';
          return { transform: [{ scale: withSpring(1) }] };
        })},
      ],
    };
  }, [count]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.countText, animatedStyle]}>
        {count}
      </Animated.Text>
      <TouchableOpacity style={styles.helpButton}>
        <HelpCircle size={24} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 64,
    color: Colors.primary,
  },
  helpButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});