/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {API_KEY} from '@env';
import LoadingIndicator from '../Loading/LoadingIndicator';
import Icon from 'react-native-vector-icons/AntDesign';
import Divider from '../Common/Divider';

type RootStackParamList = {
  MoviesDetails: {movie: any};
};

const MAX_LENGTH = 250;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

type MovieDetails = {
  overview: string;
  status: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: {id: number; name: string}[];
  title: string;
};
const MoviesDetailsContent: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MoviesDetails'>>();
  const {movie} = route.params;
  const [details, setDetails] = React.useState<MovieDetails | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [activeTab, setActiveTab] = useState<'Details' | 'Preview'>('Details');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`,
        );
        const data = await response.json();
        setDetails(data);
      } catch {
        setDetails(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [movie.id]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LoadingIndicator />
      </View>
    );
  }

  if (!details) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.errorText}>Error loading movie details</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 6,
        }}>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', paddingVertical: 12}}
          onPress={() => setActiveTab('Details')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Details' && styles.activeTabText,
            ]}>
            Details
          </Text>
          {activeTab === 'Details' && (
            <View
              style={{
                height: 2,
                backgroundColor: '#fff',
                width: '100%',
                marginTop: 4,
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', paddingVertical: 12}}
          onPress={() => setActiveTab('Preview')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Preview' && styles.activeTabText,
            ]}>
            Cast
          </Text>
          {activeTab === 'Preview' && (
            <View
              style={{
                height: 2,
                backgroundColor: '#fff',
                width: '100%',
                marginTop: 4,
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      {activeTab === 'Details' ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.Text}>
              {showFullOverview || details.overview.length <= MAX_LENGTH
                ? details.overview
                : details.overview.substring(0, MAX_LENGTH) + '...'}
              {details.overview.length > MAX_LENGTH && (
                <Text
                  style={styles.overviewOptionText}
                  onPress={() => setShowFullOverview(!showFullOverview)}>
                  {showFullOverview ? ' Hide' : ' Read more'}
                </Text>
              )}
            </Text>
          </View>
          <Divider />
          <View style={styles.statusContainer}>
            <Text style={styles.Text}>Status:</Text>
            <Text style={styles.rightText}>{details.status}</Text>
          </View>
          <Divider />
          <View style={styles.releaseDateContainer}>
            <Text style={styles.Text}>Release Date:</Text>
            <Text style={styles.rightText}>
              {formatDate(details.release_date)}
            </Text>
          </View>
          <Divider />
          <View style={styles.durationContainer}>
            <Text style={styles.Text}>Duration:</Text>
            <Text style={styles.rightText}>{details.runtime} min</Text>
          </View>
          <Divider />
          <View style={styles.ratingContainer}>
            <Text style={styles.Text}>Rating:</Text>
            <Text style={styles.rightText}>
              <Icon name="star" size={14} color="#F7CD2E" />{' '}
              {details.vote_average.toFixed(1)}/10
            </Text>
          </View>
          <Divider />
          <View style={styles.genresContainer}>
            {details.genres.map(g => (
              <View key={g.id} style={styles.genreTag}>
                <Text style={styles.genreText}>{g.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.overViewContainer}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.Text}>Cast details will be displayed here.</Text>
          {/* Placeholder for cast details */}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
    flex: 1,
    padding: 15,
  },
  overViewContainer: {
    flex: 1,
  },
  Text: {
    color: '#a6adba',
  },
  overviewOptionText: {
    color: '#a6adba',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  rightText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  tabText: {
    color: '#a6adba',
    fontWeight: 'bold',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  releaseDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  genreTag: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  genreText: {
    color: '#fff',

    fontSize: 13,
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MoviesDetailsContent;
