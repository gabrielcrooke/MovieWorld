import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type CarouselProps = {
  title: string;
  data: Array<{
    id: number | string;
    poster_path: string;
    [key: string]: any;
  }>;
};

const Carousel: React.FC<CarouselProps> = ({title, data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Image
            style={styles.imageURl}
            source={{
              uri: `https://image.tmdb.org/t/p/w400/${item.poster_path}`,
            }}
          />
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
    width: 140,
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
});

export default Carousel;
