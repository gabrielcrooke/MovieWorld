import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Movies} from '../../screens/Movies';
import {MoviesDetails} from '../../screens/MoviesDetails';

const Stack = createNativeStackNavigator();

const NavigationStack = () => (
  <Stack.Navigator initialRouteName="Movies">
    <Stack.Screen name="MoviesScreen" component={Movies} options={{headerShown: false}} />
    <Stack.Screen name="MoviesDetails" component={MoviesDetails} options={{headerShown: false}} />
  </Stack.Navigator>
);

export default NavigationStack;
