import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const HeroContent = () => {
  const [dataHero, setDataHero] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const authToken =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGEzMGFmNTkxMDUxN2VlODBiNWYxMmYwOGFmNmJhMiIsInN1YiI6IjY1ZTY3ZjIxMDk3YzQ5MDE4NjY1YmVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FQXXzyOc7inWSEqLhbzL2oTD6x8COpJwp_T4WzdC9_I';

  const baseURL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const response = await axios.get(
          baseURL + '/trending/movie/week?language=en-US',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: authToken,
            },
          },
        );
        //return response.data;
        //console.log(response.data);
        setDataHero(response.data.results);
        if (response.data.results.length > 0) {
          setSelectedMovie(response.data.results[0]); // Set the first movie as the selected one
        }
        //getDate();
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    getTrendingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to handle movie press
  const handleMoviePress = movie => {
    setSelectedMovie(movie); // Set the selected movie
  };

  const renderItem = ({item}) => (
    <Pressable onPress={() => handleMoviePress(item)}>
      <Image
        style={[
          styles.imageURl,
          selectedMovie === item && styles.selectedMovie,
        ]}
        source={{
          uri: `https://image.tmdb.org/t/p/w400/${item.poster_path}`,
        }}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {selectedMovie && (
        <View style={styles.heroContainer}>
          <View>
            <Image
              style={[styles.selectedMovie, styles.imageURl]}
              source={{
                uri: `https://image.tmdb.org/t/p/w400/${selectedMovie.poster_path}`,
              }}
            />
          </View>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>{selectedMovie.title}</Text>
            <Text style={styles.heroOverview}>
              {selectedMovie.overview.length > 250
                ? selectedMovie.overview.substring(0, 250) + '...'
                : selectedMovie.overview}
            </Text>
            <View style={styles.buttonContainer}>
              <View style={styles.btnContainerPlay}>
                <TouchableOpacity style={styles.btnStyle}>
                  <Text style={styles.btnText}>
                    <Icon
                      name="play"
                      size={15}
                      color="#F7CD2E"
                      style={styles.icon}
                    />{' '}
                    Play
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnContainerInfo}>
                <TouchableOpacity style={styles.btnStyle}>
                  <Text style={styles.btnText}>
                    <Icon
                      name="info"
                      size={16}
                      color="#F7CD2E"
                      style={styles.icon}
                    />{' '}
                    More Info
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        //numColumns={3}
        data={dataHero}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
  },
  heroContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  heroTextContainer: {
    flex: 1,
    margin: 4,
    marginTop: 10,
    width: 240,
    height: 200,
  },
  heroTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
    color: '#FFFFFF',
  },
  heroOverview: {
    textAlign: 'justify',
    color: '#a6adba',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btnContainerPlay: {
    /*flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 160,
    left: 6,*/
  },
  btnContainerInfo: {
    /*flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 160,
    left: 126,*/
  },
  btnStyle: {
    backgroundColor: '#1d4ed8',
    width: 110,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  icon: {
    color: '#FFFFFF',
  },
  imageURl: {
    marginTop: 12,
    margin: 6,
    width: 140,
    height: 220,
    //borderRadius: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selectedMovie: {
    width: 150,
    height: 230,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
});
