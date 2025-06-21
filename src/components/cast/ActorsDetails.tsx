/* eslint-disable react-native/no-inline-styles */
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GradientBackground} from '../Common/GradientBackGround';
import {API_KEY} from '@env';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';
import Icon from 'react-native-vector-icons/AntDesign';
import LoadingIndicator from '../Loading/LoadingIndicator';
import Divider from '../Common/Divider';
import {formatDate} from '../../utils/dateUtils';
import {STRINGS} from '../../constans/strings';

const MAX_LENGTH = 250;

type ActorsDetails = {
  biography: string;
  name: string;
  birthday: string;
  place_of_birth: string;
  known_for_department: string;
  popularity: number;
  profile_path: string;
};

const ActorsDetails = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ActorsDetails'>>();
  const {actorId} = route.params;
  const [actorDetails, setActorDetails] = useState<ActorsDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullBiography, setShowFullBiography] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=en-US`,
        );
        const data = await response.json();
        setActorDetails(data);
        console.log('actorDetails data:', data);
      } catch {
        setActorDetails(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [actorId]);

  if (loading) {
    return (
      <GradientBackground>
        <LoadingIndicator />
      </GradientBackground>
    );
  }

  if (!actorDetails) {
    return (
      <GradientBackground>
        <View style={styles.centeredContainer}>
          <Text style={styles.errorText}>{STRINGS.DEFAULT_ERROR_MESSAGE}</Text>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <ScrollView
        contentContainerStyle={{paddingBottom: 85, paddingHorizontal: 15}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.actorNameText}>{actorDetails.name}</Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageURl}
            source={
              actorDetails.profile_path
                ? {
                    uri: `https://image.tmdb.org/t/p/w400/${actorDetails.profile_path}`,
                  }
                : require('../../assets/images/no-image.png')
            }
          />
        </View>
        <View style={styles.textContainer}>
          {actorDetails.biography ? (
            <Text>
              {showFullBiography || actorDetails.biography.length <= MAX_LENGTH
                ? actorDetails.biography
                : actorDetails.biography.substring(0, 250) + '...'}
              {actorDetails.biography.length > MAX_LENGTH && (
                <Text
                  style={styles.readMoreText}
                  onPress={() => setShowFullBiography(!showFullBiography)}>
                  {showFullBiography ? STRINGS.HIDE : STRINGS.READ_MORE}
                </Text>
              )}
            </Text>
          ) : (
            <Text style={styles.errorText}>
              {STRINGS.DEFAULT_ERROR_MESSAGE}
            </Text>
          )}
        </View>
        <Divider />
        <View style={styles.individualInfoContainer}>
          <Text>{STRINGS.SECTION_TITLES.BIRTHDAY}</Text>
          {actorDetails.birthday ? (
            <Text style={styles.rightText}>
              {formatDate(actorDetails.birthday)}
            </Text>
          ) : (
            <Text style={styles.errorText}>
              {STRINGS.DEFAULT_ERROR_MESSAGE}
            </Text>
          )}
        </View>
        <Divider />
        <View style={styles.individualInfoContainer}>
          <Text>{STRINGS.SECTION_TITLES.PLACE_OF_BIRTH}</Text>
          {actorDetails.place_of_birth ? (
            <Text style={styles.rightText}>
              {actorDetails.place_of_birth.length <= 22
                ? actorDetails.place_of_birth
                : actorDetails.place_of_birth.substring(0, 22) + '...'}
            </Text>
          ) : (
            <Text style={styles.errorText}>
              {STRINGS.DEFAULT_ERROR_MESSAGE}
            </Text>
          )}
        </View>
        <Divider />
        <View style={styles.individualInfoContainer}>
          <Text>{STRINGS.SECTION_TITLES.OCCUPATION}</Text>
          <Text style={styles.rightText}>
            {actorDetails.known_for_department}
          </Text>
        </View>
        <Divider />
        <View style={styles.individualInfoContainer}>
          <Text>{STRINGS.SECTION_TITLES.POPULARITY}</Text>
          <Text style={styles.rightText}>
            <Icon name="star" size={14} color="#F7CD2E" />{' '}
            {actorDetails.popularity.toFixed(1)}/10
          </Text>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default ActorsDetails;

const styles = StyleSheet.create({
  actorNameText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  rightText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  errorText: {
    color: 'red',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageURl: {
    margin: 10,
    width: 170,
    height: 220,
    borderRadius: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  imageContainer: {
    alignItems: 'center',
  },
  textContainer: {
    paddingHorizontal: 10,
  },
  readMoreText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#a6adba',
  },
  individualInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
