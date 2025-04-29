import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';

export default function AppLogo() {
  return (
    <View style={styles.container}>
      <Text style={styles.pill}>Wii</Text>
      <Text style={styles.eye}>Check</Text>
      <View style={styles.dot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pill: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    color: Colors.gray900,
  },
  eye: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    color: Colors.primary,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginLeft: 2,
    marginTop: -14,
  },
});