/* eslint-disable react/react-in-jsx-scope */
import {View} from 'react-native';
import {CarouselRecentReleases} from './CarouselRecentReleases';
import {CarouselUpcomingReleases} from './CarouselUpcomingReleases';
import {CarouselActionMovies} from './CarouselActionMovies';
import {CarouselComedyMovies} from './CarouselComedyMovies';
import {CarouselDramaMovies} from './CarouselDramaMovies';
import {CarouselRomanceMovies} from './CarouselRomanceMovies';
import {CarouselTvMovies} from './CarouselTvMovies';
import {CarouselHorrorMovies} from './CarouselHorrorMovies';
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
