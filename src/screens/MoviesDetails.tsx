import React from 'react';
import TrailerPlayer from '../components/Movies/TrailerPlayer';
import {useRoute, RouteProp} from '@react-navigation/native';
import MoviesDetailsContent from '../components/Movies/MoviesDetailsContent';
import {GradientBackground} from '../components/Common/GradientBackGround';
import {SimilarCarouselMovies} from '../components/Movies/SimilarCarouselMovies';
import {ScrollView} from 'react-native';

type RootStackParamList = {
  MoviesDetails: {movie: any};
};

export const MoviesDetails = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MoviesDetails'>>();
  const {movie} = route.params;
  return (
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TrailerPlayer movie={movie} />
        <MoviesDetailsContent />
        <SimilarCarouselMovies />
      </ScrollView>
    </GradientBackground>
  );
};
