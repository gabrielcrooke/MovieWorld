import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {GradientBackground} from '../components/Common/GradientBackGround';

export const Series = () => {
  return (
    <GradientBackground>
      <Text style={styles.Text}>Series</Text>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
    flex: 1,
  },
  Text: {
    fontSize: 50,
    color: '#FFF',
  },
});
