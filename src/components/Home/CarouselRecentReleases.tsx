import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Carousel from './Carousel';

export const CarouselRecentReleases = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState('2024');

  const authToken =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGEzMGFmNTkxMDUxN2VlODBiNWYxMmYwOGFmNmJhMiIsInN1YiI6IjY1ZTY3ZjIxMDk3YzQ5MDE4NjY1YmVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FQXXzyOc7inWSEqLhbzL2oTD6x8COpJwp_T4WzdC9_I';

  const baseURL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const getRecentMovies = async () => {
      try {
        const response = await axios.get(
          baseURL +
            `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.lte=${date}&sort_by=popularity.desc`,
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
    getRecentMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  //Get the date in format string (YYYY-MM-DD) to pass to the API URL.
  const getDate = () => {
    // Create a new Date object representing the current date and time
    const fullDate = new Date();
    // Get the current year
    const year = fullDate.getFullYear().toString();
    // Get the current month (returns a value between 0 and 11, where 0 represents January)
    // Add 1 to the result to get the actual month number (1 to 12)
    const getMonth = fullDate.getMonth() + 1;
    // If the month is less than 10, prepend a '0' to it, otherwise use the original month value
    const month = getMonth > 9 ? getMonth.toString() : `0${getMonth}`;
    // Get the current day of the month
    const getDay = fullDate.getDate();
    // If the day is less than 10, prepend a '0' to it, otherwise use the original day value
    const day = getDay > 9 ? getDay.toString() : `0${getDay}`;

    // Return the formatted date string (YYYY-MM-DD format)
    setDate(`${year}-${month}-${day}`);
    //console.log(date);
  };

  useEffect(() => {
    getDate();
  }, []);

  return (
    <View>
      <Carousel title="Recent Releases" data={data} />
      {/* Add additional Carousels for other genres */}
    </View>
  );
};
