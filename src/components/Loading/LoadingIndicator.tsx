import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {GradientBackground} from '../Common/GradientBackGround';

const LoadingIndicator = () => (
  <GradientBackground>
    <ActivityIndicator size="large" color="#fff" style={styles.activityStyle} />
  </GradientBackground>
);

const styles = StyleSheet.create({
  activityStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
