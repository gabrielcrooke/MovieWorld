import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const Series = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Series</Text>
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