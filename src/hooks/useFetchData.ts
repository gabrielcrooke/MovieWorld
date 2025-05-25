import {useState, useEffect} from 'react';
import axios from 'axios';
import {TMDB_AUTH_TOKEN} from '@env';

export function useFetchData(url: string, deps: any[] = []) {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setData([]);
      setError(null);
      return;
    }

    const fetchData = async () => {
      try {
        setError(null); // Limpiar error antes de la petición
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: TMDB_AUTH_TOKEN,
          },
        });
        setData(response.data.results);
      } catch (err: any) {
        setError(err?.message ?? 'Error desconocido');
        setData([]);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {data, error};
}
