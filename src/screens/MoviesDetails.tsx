import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

export const MoviesDetails = () => {
  return (
    <View style={styles.container}>
      <Text style = {styles.Text}>Movies Details</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
    flex: 1,
  },
  Text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
