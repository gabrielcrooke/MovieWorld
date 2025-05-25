import React from 'react';
import Carousel from './Carousel';
import {Text, View} from 'react-native';
import {useGenresMoviesData} from '../../hooks/useGenresMoviesData';

const genres = [
  {id: 28, title: 'Action'},
  {id: 35, title: 'Comedy'},
  {id: 18, title: 'Drama'},
  {id: 27, title: 'Horror'},
  {id: 10749, title: 'Romance'},
  {id: 10770, title: 'TV Movie'},
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
