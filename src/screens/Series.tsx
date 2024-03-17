import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const Series = () => {
  return (
    <View>
      <Text style={styles.Text}>Series</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Text: {
    fontSize: 100,
    color: '#000000',
  },
});
