import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Carousel from './Carousel';
import {TMDB_AUTH_TOKEN} from '@env';

export const CarouselUpcomingReleases = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState('2024');

  const authToken = TMDB_AUTH_TOKEN;

  const baseURL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const getUpcomingMovies = async () => {
      try {
        const response = await axios.get(
          baseURL +
            `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${date}&sort_by=popularity.desc`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: authToken,
            },
          },
        );
        //console.log(response.data); //NOSONAR
        setData(response.data.results);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    getUpcomingMovies();
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
  };

  useEffect(() => {
    getDate();
  }, []);

  return (
    <View>
      <Carousel title="Upcoming Releases" data={data} />
      {/* Add additional Carousels for other genres */}
    </View>
  );
};
