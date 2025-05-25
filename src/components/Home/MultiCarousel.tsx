/* eslint-disable react/react-in-jsx-scope */
import {View} from 'react-native';
import {CarouselRecentReleases} from './CarouselRecentReleases';
import {CarouselUpcomingReleases} from './CarouselUpcomingReleases';
import CarouselPresentationGenres from './CarouselPresentationGenres';

export const MultiCarousel = () => {
  return (
    <View>
      <CarouselRecentReleases />
      <CarouselUpcomingReleases />
      <CarouselPresentationGenres />
    </View>
  );
};
