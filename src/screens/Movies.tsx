import React from 'react';
import {MoviesContent} from '../components/Movies/MoviesContent';
import {GradientBackground} from '../components/Common/GradientBackGround';
import {StyleSheet} from 'react-native';
GradientBackground;

export const Movies = () => {
  return (
    <GradientBackground>
      <MoviesContent />
    </GradientBackground>
  );
};
