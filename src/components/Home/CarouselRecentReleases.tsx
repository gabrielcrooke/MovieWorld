import {Text, View} from 'react-native';
import React from 'react';
import Carousel from './Carousel';
import {useFetchData} from '../../hooks/useFetchData';
import {useCurrentDate} from '../../hooks/useCurrentDate';

export const CarouselRecentReleases = () => {
  const date = useCurrentDate();

  const url = date
    ? `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.lte=${date}&sort_by=popularity.desc`
    : '';

  //Obtener los datos utilizando el hook useFetchData
  const {data, error} = useFetchData(url, [url]);

  return (
    <View>
      <Carousel title="Recent Releases" data={data} />
      {error && (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={{color: 'red'}}>
          Ocurrió un error al cargar los datos.
        </Text>
      )}
    </View>
  );
};
