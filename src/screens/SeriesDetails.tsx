import {ScrollView} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../components/navigation/types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {GradientBackground} from '../components/Common/GradientBackGround';
import MediaDetailsContent from '../components/Common/MediaDetailsContent';
import TrailerPlayer from '../components/Movies/TrailerPlayer';
import {SimilarCarouselMovies} from '../components/Movies/SimilarCarouselMovies';

const SeriesDetails = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'SeriesDetails'>>();
  const {serie} = route.params;
  return (
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TrailerPlayer id={serie.id} title={serie.title} type="tv" />
        <MediaDetailsContent id={serie.id} type="tv" />
        <SimilarCarouselMovies id={serie.id} type="tv" />
      </ScrollView>
    </GradientBackground>
  );
};

export default SeriesDetails;
