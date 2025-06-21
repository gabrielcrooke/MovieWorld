/* eslint-disable react-native/no-inline-styles */
import {Text} from 'react-native';
import React from 'react';
import Carousel from '../Home/Carousel';
import {useFetchData} from '../../hooks/useFetchData';
import {STRINGS} from '../../constans/strings';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';

export const SimilarCarouselMovies = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MoviesDetails'>>();
  const {movie} = route.params;

  const url = `https://api.themoviedb.org/3/movie/${movie.id}/similar`;

  //Obtener los datos utilizando el hook useFetchData
  const {data, error} = useFetchData(url, [url]);

  return (
    <>
      <Carousel
        title={STRINGS.SIMILAR_MOVIES}
        data={data}
        imageSize={{width: 100, height: 140}}
        titleStyle={{
          fontSize: 15,
          margin: 15,
          fontWeight: 'bold',
          color: '#FFFFFF',
        }}
        containerStyle={{marginBottom: 85}}
      />
      {error && (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={{color: 'red'}}>
          Ocurrió un error al cargar los datos.
        </Text>
      )}
    </>
  );
};
