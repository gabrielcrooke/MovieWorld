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
  imageSize?: {
    width: number;
    height: number;
  };
  titleStyle?: object;
  containerStyle?: object;
};

type RootStackParamList = {
  Movies: undefined | {screen: string; params?: any};
  MoviesDetails: {movie: any};
};

const Carousel: React.FC<CarouselProps> = ({
  title,
  data,
  imageSize = {width: 140, height: 220},
  titleStyle,
  containerStyle,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
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
              style={[
                styles.imageURl,
                {
                  width: imageSize.width,
                  height: imageSize.height,
                },
              ]}
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
    marginTop: 6,
  },
  title: {
    fontSize: 25,
    margin: 6,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  imageURl: {
    marginTop: 12,
    margin: 6,
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

export default Carousel;
