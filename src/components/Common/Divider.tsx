import React from 'react';
import {View, StyleSheet} from 'react-native';

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#2d3748',
    marginVertical: 12,
    width: '100%',
    opacity: 0.5,
    borderRadius: 1,
  },
});

export default Divider;
