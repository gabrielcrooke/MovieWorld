import {ScrollView} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../components/navigation/types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {GradientBackground} from '../components/Common/GradientBackGround';
import MediaDetailsContent from '../components/Common/MediaDetailsContent';

const SeriesDetails = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'SeriesDetails'>>();
  const {serie} = route.params;
  return (
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MediaDetailsContent id={serie.id} type="tv" />
      </ScrollView>
    </GradientBackground>
  );
};

export default SeriesDetails;
