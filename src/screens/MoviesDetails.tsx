import {StyleSheet, View} from 'react-native';
import React from 'react';
import TrailerPlayer from '../components/Movies/TrailerPlayer';
import {useRoute, RouteProp} from '@react-navigation/native';
import MoviesDetailsContent from '../components/Movies/MoviesDetailsContent';

type RootStackParamList = {
  MoviesDetails: {movie: any};
};

export const MoviesDetails = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MoviesDetails'>>();
  const {movie} = route.params;
  return (
    <View style={styles.container}>
      <TrailerPlayer movie={movie} />
      <MoviesDetailsContent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
    flex: 1,
  },
  Text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
