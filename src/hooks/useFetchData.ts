import {useState, useEffect} from 'react';
import axios from 'axios';
import {TMDB_AUTH_TOKEN} from '@env';

export function useFetchData(url: string, deps: any[] = []) {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Nuevo estado

  useEffect(() => {
    if (!url) {
      setData([]);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        setError(null); // Limpiar error antes de la petición
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: TMDB_AUTH_TOKEN,
          },
        });
        setData(response.data.results ?? response.data.genres ?? []); // Manejar diferentes tipos de respuesta
      } catch (err: any) {
        setError(err?.message ?? 'Error desconocido');
        setData([]);
      } finally {
        setLoading(false); // Finalizar el estado de carga
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {data, error, loading};
}
