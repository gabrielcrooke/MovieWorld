import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export const CarouselComedyMovies = () => {
  const [data, setData] = useState([]);

  const authToken =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGEzMGFmNTkxMDUxN2VlODBiNWYxMmYwOGFmNmJhMiIsInN1YiI6IjY1ZTY3ZjIxMDk3YzQ5MDE4NjY1YmVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FQXXzyOc7inWSEqLhbzL2oTD6x8COpJwp_T4WzdC9_I';

  const baseURL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const getComedyMovies = async () => {
      try {
        const response = await axios.get(
          baseURL +
            '/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=vote_count.desc&with_genres=35',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: authToken,
            },
          },
        );
        //return response.data;
        //console.log(response.data);
        setData(response.data.results);
        //getDate();
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    getComedyMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comedy</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        //numColumns={3}
        data={data}
        keyExtractor={item => item.id}
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
