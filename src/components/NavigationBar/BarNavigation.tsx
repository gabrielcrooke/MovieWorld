import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import {Home} from '../../screens/Home';
import {Movies} from '../../screens/Movies';
import {Series} from '../../screens/Series';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{backgroundColor: 'black'}} // Change the background color of the bottom tab bar
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="play" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({color}) => <Icon name="play" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Series"
        component={Series}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => <Icon name="play" color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function BarNavigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: '#000000',
  },
});
