import {Dimensions, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';

export const MoviesContent = () => {
  const [data, setData] = useState([]);

  const authToken =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGEzMGFmNTkxMDUxN2VlODBiNWYxMmYwOGFmNmJhMiIsInN1YiI6IjY1ZTY3ZjIxMDk3YzQ5MDE4NjY1YmVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FQXXzyOc7inWSEqLhbzL2oTD6x8COpJwp_T4WzdC9_I';

  const baseURL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const getDataMovies = async () => {
      try {
        const response = await axios.get(
          baseURL +
            '/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc',
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
    getDataMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        vertical={true}
        numColumns={2}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.imgContainer}>
            <Image
              style={styles.imageURl}
              source={{
                uri: `https://image.tmdb.org/t/p/w400/${item.poster_path}`,
              }}
            />
            <View style={styles.headerMovieContainer}>
              <Text style={styles.headerMovieContainerText}>{item.release_date}</Text>
              <Text
                style={[styles.headerMovieContainerText, styles.voteAverage]}>
                <Icon
                  name="star"
                  size={18}
                  color="#F7CD2E"
                  style={styles.icon}
                />{' '}
                {item.vote_average.toFixed(1)}/10
              </Text>
            </View>
            <View>
              <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
          </View>
        )}
        // ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

//const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 6,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  title: {
    fontSize: 25,
    margin: 6,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  imgContainer: {
    flexGrow: 1,
    width: 190,
    height: 360,
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
    // justifyContent: 'space-evenly',
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
  separator: {
    height: 10, // Adjust this value to change the amount of horizontal space
    width: 10,
    backgroundColor: 'white',
  },
});
