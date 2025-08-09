import React from 'react';
import {GradientBackground} from '../components/Common/GradientBackGround';
import {ContentList} from '../components/Common/ContentList';
export const Series = () => {
  return (
    <GradientBackground>
      <ContentList
        type="tv"
        navigateTo="SeriesDetails"
        getTitle={item => item.name}
        getDate={item => item.first_air_date}
      />
    </GradientBackground>
  );
};
