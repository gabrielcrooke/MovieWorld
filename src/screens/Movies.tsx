import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MoviesContent} from '../components/Movies/MoviesContent';

export const Movies = () => {
  return (
    <View style={styles.container}>
      <MoviesContent />
    </View>
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
