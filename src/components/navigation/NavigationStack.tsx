/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';

import {Home} from '../../screens/Home';
import {Movies} from '../../screens/Movies';
import {MoviesDetails} from '../../screens/MoviesDetails';
import {Series} from '../../screens/Series';

// Stack para Movies
const MoviesStack = createNativeStackNavigator();
function MoviesStackScreen() {
  return (
    <MoviesStack.Navigator>
      <MoviesStack.Screen
        name="MoviesScreen"
        component={Movies}
        options={{headerShown: false}}
      />
      <MoviesStack.Screen
        name="MoviesDetails"
        component={MoviesDetails}
        options={{headerShown: false}}
      />
    </MoviesStack.Navigator>
  );
}

// Stack para Home (puedes agregar más screens si lo necesitas)
const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function NavigationStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      sceneAnimationEnabled={true}
      activeColor="#FFFFFF"
      inactiveColor="gray"
      barStyle={{backgroundColor: 'black'}}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: <Text style={styles.labelText}>Home</Text>,
          tabBarIcon: ({focused}) => (
            <Icon name="home" color={focused ? 'black' : 'gray'} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Movies"
        component={MoviesStackScreen}
        options={{
          tabBarLabel: <Text style={styles.labelText}>Movies</Text>,
          tabBarIcon: ({focused}) => (
            <Icon name="play" color={focused ? 'black' : 'gray'} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Series"
        component={Series}
        options={{
          tabBarLabel: <Text style={styles.labelText}>Series</Text>,
          tabBarIcon: ({focused}) => (
            <Icon name="film" color={focused ? 'black' : 'gray'} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
