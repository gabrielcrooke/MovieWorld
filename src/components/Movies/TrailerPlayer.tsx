import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Text} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import {API_KEY} from '@env';
import LoadingIndicator from '../Loading/LoadingIndicator';

type TrailerPlayerProps = {
  movie: {
    id: number;
    title: string;
  };
};

const {width: screenWidth} = Dimensions.get('window');
const VIDEO_WIDTH = Math.min(screenWidth - 15, 400);
const VIDEO_HEIGHT = (VIDEO_WIDTH * 9) / 16;
const TrailerPlayer: React.FC<TrailerPlayerProps> = ({movie}) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`,
        );
        const data = await response.json();
        console.log('title:', movie.title);
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
  }, [movie.id, movie.title]);

  let trailerContent;
  if (!trailerKey && loading) {
    trailerContent = <LoadingIndicator />;
  } else if (trailerKey) {
    trailerContent = (
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
    );
  } else {
    trailerContent = <Text style={styles.errorText}>No trailer available</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>{movie.title}</Text>
      <View style={styles.trailerContainer}>{trailerContent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  trailerContainer: {
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    margin: 8,
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
  },
});

export default TrailerPlayer;
