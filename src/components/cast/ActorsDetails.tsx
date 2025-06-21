import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GradientBackground} from '../Common/GradientBackGround';
import {API_KEY} from '@env';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';
import LoadingIndicator from '../Loading/LoadingIndicator';

type ActorsDetails = {
  biography: string;
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
          <Text style={styles.errorText}>Error loading person details</Text>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <Text>ActorsDetails</Text>
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
    </GradientBackground>
  );
};

export default ActorsDetails;

const styles = StyleSheet.create({
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
  imageURl: {
    marginTop: 12,
    margin: 6,
    marginLeft: 10,
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
});
