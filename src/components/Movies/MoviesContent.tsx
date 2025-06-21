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

export const MoviesContent = () => {
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>('');
  const [selectedOrder, setSelectedOrder] = useState<string>('most_popular');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Construye la URL dinámicamente según el género seleccionado
  let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

  // Aplica el filtro de orden
  if (selectedOrder === 'most_popular') {
    url += '&sort_by=popularity.desc';
  } else if (selectedOrder === 'less_popular') {
    url += '&sort_by=popularity.asc';
  } else if (selectedOrder === 'top_rated') {
    url +=
      '&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200';
  } else if (selectedOrder === 'lowest_rated') {
    url +=
      '&sort_by=vote_average.asc&without_genres=99,10755&vote_count.gte=200';
  }
  //Aplica el filtro de género si se ha seleccionado uno
  if (selectedGenre && selectedGenre !== '') {
    url += `&with_genres=${selectedGenre}`;
  }

  const {data, loading, error} = useFetchData(url, [url]);

  const getOverviewText = (overview: string | undefined) => {
    if (!overview || overview === '') {
      return {text: 'No description available', isError: true};
    }
    return {
      text:
        overview.length > 130 ? overview.substring(0, 130) + '...' : overview,
      isError: false,
    };
  };

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
          const {text, isError} = getOverviewText(item.overview);

          return (
            <View style={styles.imgContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MoviesDetails', {movie: item})
                }>
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
                    {!item.release_date || item.release_date === '' ? (
                      <Text style={styles.errorText}>Not available</Text>
                    ) : (
                      item.release_date
                    )}{' '}
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
                <View>
                  <Text style={styles.movieTitle}>{item.title}</Text>
                </View>
                <View>
                  <Text
                    style={!isError ? styles.movieOverview : styles.errorText}>
                    {text}
                  </Text>
                </View>
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
  title: {
    fontSize: 25,
    margin: 6,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 1,
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
