/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, View} from 'react-native';
import {CarouselRecentReleases} from './CarouselRecentReleases';
import {CarouselUpcomingReleases} from './CarouselUpcomingReleases';
import CarouselPresentationGenres from './CarouselPresentationGenres';

export const MultiCarousel = () => {
  return (
    <View style={styles.container}>
      <CarouselRecentReleases />
      <CarouselUpcomingReleases />
      <CarouselPresentationGenres />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 85,
  },
});
