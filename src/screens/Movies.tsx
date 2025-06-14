import React from 'react';
import {MoviesContent} from '../components/Movies/MoviesContent';
import {GradientBackground} from '../components/Common/GradientBackGround';

export const Movies = () => {
  return (
    <GradientBackground>
      <MoviesContent />
    </GradientBackground>
  );
};
