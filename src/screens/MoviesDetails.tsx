import React from 'react';
import TrailerPlayer from '../components/Movies/TrailerPlayer';
import {useRoute, RouteProp} from '@react-navigation/native';
import MoviesDetailsContent from '../components/Movies/MoviesDetailsContent';
import {GradientBackground} from '../components/Common/GradientBackGround';

type RootStackParamList = {
  MoviesDetails: {movie: any};
};

export const MoviesDetails = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MoviesDetails'>>();
  const {movie} = route.params;
  return (
    <GradientBackground>
      <TrailerPlayer movie={movie} />
      <MoviesDetailsContent />
    </GradientBackground>
  );
};
