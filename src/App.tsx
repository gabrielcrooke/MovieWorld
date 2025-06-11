import React from 'react';
import NavigationStack from './components/navigation/NavigationStack';
import {NavigationContainer} from '@react-navigation/native';
import {GradientBackground} from './components/Common/GradientBackGround';

const App = () => {
  return (
    <NavigationContainer>
      <GradientBackground>
        <NavigationStack />
      </GradientBackground>
    </NavigationContainer>
  );
};

export default App;
