/*eslint-disable prettier/prettier*/
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

type CarouselProps = {
  title: string;
  data: Array<{
    id: number | string;
    poster_path: string;
    [key: string]: any;
  }>;
};

type RootStackParamList = {
  Movies: undefined | {screen: string; params?: any};
  MoviesDetails: {movie: any};
};

const MoviesCarousel: React.FC<CarouselProps> = ({title, data}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Movies', {
                screen: 'MoviesScreen',
              });
              setTimeout(() => {
                navigation.navigate('Movies', {
                  screen: 'MoviesDetails',
                  params: {movie: item},
                });
              }, 100); // pequeño delay para asegurar que el stack se monte
            }}>
            <Image
              style={styles.imageURl}
              source={{
                uri: `https://image.tmdb.org/t/p/w400/${item.poster_path}`,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop: 6,
    marginBottom: 85,
  },
  title: {
    fontSize: 15,
    margin: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  imageURl: {
    margin: 6,
    width: 100,
    height: 140,
    borderRadius: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
});

export default MoviesCarousel;
