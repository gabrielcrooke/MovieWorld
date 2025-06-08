import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Text} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import {API_KEY} from '@env';
import LoadingIndicator from '../Loading/LoadingIndicator';

type Props = {
  movie: any;
};

const {width: screenWidth} = Dimensions.get('window');
const VIDEO_WIDTH = Math.min(screenWidth - 15, 400);
const VIDEO_HEIGHT = (VIDEO_WIDTH * 9) / 16;
const TrailerPlayer: React.FC<Props> = ({movie}) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`,
        );
        const data = await response.json();
        const youtubeTrailer = data.results.find(
          (vid: any) => vid.site === 'YouTube' && vid.type === 'Trailer',
        );
        setTrailerKey(youtubeTrailer ? youtubeTrailer.key : null);
        setLoading(false);
      } catch {
        setTrailerKey(null);
        setLoading(false);
      }
    };
    fetchTrailer();
  }, [movie.id]);

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>{movie.title}</Text>
      <View style={styles.trailerContainer}>
        {!trailerKey && loading ? (
          <LoadingIndicator />
        ) : trailerKey ? (
          <>
            {loading && <LoadingIndicator />}
            <WebView
              javaScriptEnabled
              source={{uri: `https://www.youtube.com/embed/${trailerKey}`}}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              style={styles.webview}
            />
          </>
        ) : (
          <Text style={styles.errorText}>No trailer available</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
  },
  trailerContainer: {
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    backgroundColor: '#111827',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    margin: 16,
    overflow: 'hidden',
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    // Sombra para Android
    elevation: 6,
  },
  Text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  webview: {
    width: '100%',
    height: '100%',
    backgroundColor: '#111827',
  },
});

export default TrailerPlayer;
