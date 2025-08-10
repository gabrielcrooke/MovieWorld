import React from 'react';
import {GradientBackground} from '../components/Common/GradientBackGround';
import {ContentList} from '../components/Common/ContentList';

export const Movies = () => {
  return (
    <GradientBackground>
      <ContentList
        type="movie"
        navigateTo="MoviesDetails"
        getTitle={item => item.title}
        getName={item => item.title}
        getDate={item => item.release_date}
      />
    </GradientBackground>
  );
};
