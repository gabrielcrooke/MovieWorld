/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
// components/Common/PopularityStars.tsx
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
  popularity: number;
};

const calculateStarCount = (popularity: number): number => {
  if (popularity >= 150) return 5;
  if (popularity >= 90) return 4;
  if (popularity >= 40) return 3;
  if (popularity >= 15) return 2;
  return 1;
};

const PopularityStars: React.FC<Props> = ({popularity}) => {
  const starCount = calculateStarCount(popularity);

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {[...Array(starCount)].map((_, i) => (
        <Icon
          key={`star-${popularity}-${i}`}
          name="star"
          size={14}
          color="#F7CD2E"
          style={{marginRight: 2}}
        />
      ))}
    </View>
  );
};

export default PopularityStars;
