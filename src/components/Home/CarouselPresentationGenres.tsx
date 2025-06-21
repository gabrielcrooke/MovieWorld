import React from 'react';
import Carousel from './Carousel';
import {Text, View} from 'react-native';
import {useGenresMoviesData} from '../../hooks/useGenresMoviesData';
import {STRINGS} from '../../constans/strings';

const genres = [
  {id: 28, title: STRINGS.ACTION},
  {id: 35, title: STRINGS.COMEDY},
  {id: 18, title: STRINGS.DRAMA},
  {id: 27, title: STRINGS.HORROR},
  {id: 10749, title: STRINGS.ROMANCE},
  {id: 10770, title: STRINGS.TV_MOVIE},
  // Genres for fetch data
];

const CarouselPresentationGenres = () => {
  const {genreData, error} = useGenresMoviesData(genres);

  return (
    <View>
      {error && (
        <Text style={{color: 'red'}}>
          Ocurrió un error al cargar los géneros.
        </Text>
      )}
      {genres.map(genre => (
        <Carousel
          key={genre.id}
          title={genre.title}
          data={genreData[genre.title] ?? []}
        />
      ))}
    </View>
  );
};

export default CarouselPresentationGenres;
