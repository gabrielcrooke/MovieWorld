import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const Movies = () => {
  return (
    <View>
      <Text style={styles.Text}>Movies</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Text: {
    fontSize: 100,
    color: '#000000',
  },
});
