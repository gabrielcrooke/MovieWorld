/* eslint-disable react-native/no-inline-styles */
import {Text} from 'react-native';
import React from 'react';
import Carousel from '../Home/Carousel';
import {useFetchData} from '../../hooks/useFetchData';
import {STRINGS} from '../../constans/strings';

type Props = {
  id: number;
  type: 'movie' | 'tv';
};

export const SimilarCarouselMovies: React.FC<Props> = ({id, type}) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/similar`;

  //Obtener los datos utilizando el hook useFetchData
  const {data, error} = useFetchData(url, [url]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <>
      <Carousel
        title={
          type === 'movie' ? STRINGS.SIMILAR_MOVIES : STRINGS.SIMILAR_SERIES
        }
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
