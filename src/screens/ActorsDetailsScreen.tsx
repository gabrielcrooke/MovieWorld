import React from 'react';
import ActorsDetails from '../components/cast/ActorsDetails';
import {MovieCarouselByActor} from '../components/cast/MovieCarouselByActor';
import {GradientBackground} from '../components/Common/GradientBackGround';
import {ScrollView} from 'react-native';

const ActorsDetailsScreen = () => {
  return (
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ActorsDetails />
        <MovieCarouselByActor />
      </ScrollView>
    </GradientBackground>
  );
};

export default ActorsDetailsScreen;
