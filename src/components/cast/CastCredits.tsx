/* eslint-disable react-native/no-inline-styles */
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {GradientBackground} from '../Common/GradientBackGround';
import LoadingIndicator from '../Loading/LoadingIndicator';
import {API_KEY} from '@env';

type CastCreditsProps = {
  movieId: number;
};

type MovieCast = {
  original_name: string;
  character: string;
  profile_path: string;
  id: number;
  order: number;
  known_for_department: string;
  name: string;
  adult: boolean;
};

export default CastCredits = ({movieId}: CastCreditsProps) => {
  const [cast, setCast] = React.useState<MovieCast[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
        );
        const data = await response.json();
        setCast(data.cast);
        /**console.log('Cast data:', data.cast);**/
      } catch {
        setCast([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [movieId]);

  if (loading) {
    return (
      <GradientBackground>
        <LoadingIndicator />
      </GradientBackground>
    );
  }

  if (!cast) {
    return (
      <GradientBackground>
        <View>
          <Text>Error loading movie cast</Text>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cast}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={{paddingBottom: 85}}
        renderItem={({item}) => (
          <View style={styles.imgContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                style={styles.profileImage}
                source={
                  item.profile_path
                    ? {
                        uri: `https://image.tmdb.org/t/p/w400/${item.profile_path}`,
                      }
                    : require('../../assets/images/no-image.png')
                }
                resizeMode="cover"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.Text} numberOfLines={1} ellipsizeMode="tail">
                {item.original_name}
              </Text>
              <Text
                style={styles.subText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.known_for_department}
              </Text>
            </View>
          </View>
        )}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    borderRadius: 12,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    overflow: 'hidden',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
  },
  Text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
    maxWidth: 110,
    textAlign: 'center',
  },
  subText: {
    color: '#b0b0b0',
    fontSize: 11,
    maxWidth: 110,
    textAlign: 'center',
  },
});
