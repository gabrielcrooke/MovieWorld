import React from 'react';
import TrailerPlayer from '../components/Movies/TrailerPlayer';
import {useRoute, RouteProp} from '@react-navigation/native';
import {GradientBackground} from '../components/Common/GradientBackGround';
import {SimilarCarouselMovies} from '../components/Movies/SimilarCarouselMovies';
import {ScrollView} from 'react-native';
import {RootStackParamList} from '../components/navigation/types';
import MediaDetailsContent from '../components/Common/MediaDetailsContent';

export const MoviesDetails = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MoviesDetails'>>();
  const {movie} = route.params;
  return (
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TrailerPlayer id={movie.id} title={movie.title} type="movie" />
        <MediaDetailsContent id={movie.id} type="movie" />
        <SimilarCarouselMovies />
      </ScrollView>
    </GradientBackground>
  );
};
