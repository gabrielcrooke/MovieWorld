// components/ContentList.tsx

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useFetchData} from '../../hooks/useFetchData';
import LoadingIndicator from '../Loading/LoadingIndicator';
import Paginador from '../pagination/Paginador';
import {GenreMoviesFilter} from '../Filters/GenreMoviesFilter';
import {OrderMoviesFilter} from '../Filters/OrderMoviesFilter';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {buildUrl} from '../../utils/buildUrl';
import {formatOverview} from '../../utils/formatOverview';

interface ContentListProps {
  type: 'movie' | 'tv';
  getTitle: (item: any) => string;
  getDate: (item: any) => string;
  navigateTo: keyof RootStackParamList;
}

export const ContentList: React.FC<ContentListProps> = ({
  type,
  getTitle,
  getDate,
  navigateTo,
}) => {
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>('');
  const [selectedOrder, setSelectedOrder] = useState<string>('most_popular');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const url = buildUrl({
    type,
    page,
    selectedOrder: selectedOrder as any,
    selectedGenre,
  });

  const {data, loading, error} = useFetchData(url, [url]);

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickersContainer}>
        <GenreMoviesFilter
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
        <OrderMoviesFilter
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      </View>
      {error && (
        <Text style={styles.errorText}>
          Ocurrió un error al cargar los datos.
        </Text>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          const {text, isError} = formatOverview(item.overview);

          return (
            <View style={styles.imgContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate(navigateTo, {movie: item})}>
                <Image
                  style={styles.imageURl}
                  source={
                    item.poster_path
                      ? {
                          uri: `https://image.tmdb.org/t/p/w400/${item.poster_path}`,
                        }
                      : require('../../assets/images/no-image.png')
                  }
                />
                <View style={styles.headerMovieContainer}>
                  <Text style={styles.headerMovieContainerText}>
                    {getDate(item) || (
                      <Text style={styles.errorText}>Not available</Text>
                    )}
                  </Text>
                  <Text
                    style={[
                      styles.headerMovieContainerText,
                      styles.voteAverage,
                    ]}>
                    <Icon name="star" size={14} color="#F7CD2E" />{' '}
                    {typeof item.vote_average === 'number'
                      ? `${item.vote_average.toFixed(1)}/10`
                      : 'N/A'}
                  </Text>
                </View>
                <Text style={styles.movieTitle}>{getTitle(item)}</Text>
                <Text
                  style={!isError ? styles.movieOverview : styles.errorText}>
                  {text}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListFooterComponent={
          <Paginador
            page={page}
            setPage={setPage}
            isFirstPage={page === 1}
            isLastPage={page === 500}
          />
        }
      />
    </View>
  );
};

// (Reutiliza los mismos styles que tenías antes, sin cambio)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickersContainer: {
    flexDirection: 'row',
  },
  imgContainer: {
    flexGrow: 1,
    width: 195,
    height: 410,
    backgroundColor: '#1f2937',
    margin: 3,
    borderRadius: 10,
    marginBottom: 20,
  },
  imageURl: {
    marginTop: 12,
    margin: 6,
    marginLeft: 10,
    width: 170,
    height: 220,
    borderRadius: 10,
  },
  headerMovieContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  headerMovieContainerText: {
    color: '#a6adba',
    fontWeight: '700',
    fontSize: 14,
  },
  voteAverage: {
    marginLeft: 29,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 2,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  movieOverview: {
    color: '#a6adba',
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    marginLeft: 8,
  },
});
