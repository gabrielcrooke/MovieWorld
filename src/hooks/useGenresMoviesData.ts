import {useEffect, useState} from 'react';
import axios from 'axios';
import {TMDB_AUTH_TOKEN} from '@env';

const baseURL = 'https://api.themoviedb.org/3';

export function useGenresMoviesData(genres: {id: number, title: string}[]) {
  const [genreData, setGenreData] = useState<{[key: string]: any[]}>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchAll = async () => {
      try {
        setError(null);
        const promises = genres.map(async genre => {
          const url = `${baseURL}/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=vote_count.desc&with_genres=${genre.id}`;
          const response = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: TMDB_AUTH_TOKEN,
            },
          });
          return {[genre.title]: response.data.results};
        });
        const results = await Promise.all(promises);
        if (isMounted) {
          setGenreData(Object.assign({}, ...results));
        }
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
      }
    };
    fetchAll();
    return () => {
      isMounted = false;
    };
  }, [genres]);

  return {genreData, error};
}
