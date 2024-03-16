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

export const MultiCarousel = () => {
  return (
    <View>
      <CarouselRecentReleases />
      <CarouselUpcomingReleases />
      <CarouselActionMovies />
      <CarouselComedyMovies />
      <CarouselDramaMovies />
      <CarouselHorrorMovies />
      <CarouselRomanceMovies />
      <CarouselTvMovies />
    </View>
  );
};
