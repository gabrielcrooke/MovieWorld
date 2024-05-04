import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from './Carousel';
import {View} from 'react-native';

const baseURL = 'https://api.themoviedb.org/3';

const authToken =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGEzMGFmNTkxMDUxN2VlODBiNWYxMmYwOGFmNmJhMiIsInN1YiI6IjY1ZTY3ZjIxMDk3YzQ5MDE4NjY1YmVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FQXXzyOc7inWSEqLhbzL2oTD6x8COpJwp_T4WzdC9_I';

const genres = [
  {id: 28, title: 'Action'},
  {id: 35, title: 'Comedy'},
  {id: 18, title: 'Drama'},
  {id: 27, title: 'Horror'},
  {id: 10749, title: 'Romance'},
  {id: 10770, title: 'TV Movie'},
  // Genres for fetch data
];

const CarouselPresentationGenres = () => {
  const [genreData, setGenreData] = useState({});

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const genreDataPromises = genres.map(async genre => {
          const response = await axios.get(
            `${baseURL}/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=vote_count.desc&with_genres=${genre.id}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
              },
            },
          );
          return {[genre.title]: response.data.results};
        });
        const genreDataArray = await Promise.all(genreDataPromises);
        const combinedGenreData = Object.assign({}, ...genreDataArray);
        setGenreData(combinedGenreData);
      } catch (error) {
        console.error('Error fetching genre data: ', error);
      }
    };

    fetchGenreData();
  }, []);

  return (
    <View>
      {genres.map(genre => (
        <Carousel
          key={genre.id}
          title={genre.title}
          data={genreData[genre.title] || []}
        />
      ))}
    </View>
  );
};

export default CarouselPresentationGenres;
