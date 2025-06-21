/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {API_KEY} from '@env';
import LoadingIndicator from '../Loading/LoadingIndicator';
import Icon from 'react-native-vector-icons/AntDesign';
import Divider from '../Common/Divider';
import {GradientBackground} from '../Common/GradientBackGround';
import CastCredits from '../cast/CastCredits';
import {RootStackParamList} from '../navigation/types';
import {formatDate} from '../../utils/dateUtils';
import {STRINGS} from '../../constans/strings';

const MAX_LENGTH = 250;

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
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
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
      <GradientBackground>
        <LoadingIndicator />
      </GradientBackground>
    );
  }

  if (!details) {
    return (
      <GradientBackground>
        <View style={styles.centeredContainer}>
          <Text style={styles.errorText}>Error loading movie details</Text>
        </View>
      </GradientBackground>
    );
  }

  return (
    <>
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('Details')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Details' && styles.activeTabText,
            ]}>
            {STRINGS.DETAILS}
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
            {STRINGS.CAST}
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
        <View style={styles.container}>
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
          <View style={styles.individualInfoContainer}>
            <Text style={styles.Text}>
              {STRINGS.SECTION_MOVIES_TITLES.STATUS}
            </Text>
            <Text style={styles.rightText}>{details.status}</Text>
          </View>
          <Divider />
          <View style={styles.individualInfoContainer}>
            <Text style={styles.Text}>
              {STRINGS.SECTION_MOVIES_TITLES.RELEASE_DATE}
            </Text>
            <Text style={styles.rightText}>
              {formatDate(details.release_date)}
            </Text>
          </View>
          <Divider />
          <View style={styles.individualInfoContainer}>
            <Text style={styles.Text}>
              {STRINGS.SECTION_MOVIES_TITLES.DURATION}
            </Text>
            <Text style={styles.rightText}>{details.runtime} min</Text>
          </View>
          <Divider />
          <View style={styles.individualInfoContainer}>
            <Text style={styles.Text}>
              {STRINGS.SECTION_MOVIES_TITLES.RATING}
            </Text>
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
        </View>
      ) : (
        <CastCredits movieId={movie.id} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingHorizontal: 15,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
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
  individualInfoContainer: {
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
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MoviesDetailsContent;
