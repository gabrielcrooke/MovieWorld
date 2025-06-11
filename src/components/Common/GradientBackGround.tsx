// filepath: /Users/gcrooke/Documents/GitHub/MovieWorld/src/components/GradientBackground.tsx
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';

export const GradientBackground = ({children}: {children: React.ReactNode}) => (
  <LinearGradient colors={['#111827', '#000000']} style={styles.gradient}>
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
