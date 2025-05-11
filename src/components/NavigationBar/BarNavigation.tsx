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
      shifting={true}
      sceneAnimationEnabled={true}
      activeColor="#FFFFFF"
      inactiveColor="gray"
      barStyle={{backgroundColor: 'black'}}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: <Text style={styles.labelText}>Home</Text>,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color}) => (
            <Icon
              name="home"
              {...{color: focused ? 'black' : 'gray'}}
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarLabel: <Text style={styles.labelText}>Movies</Text>,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color}) => (
            <Icon
              name="play"
              {...{color: focused ? 'black' : 'gray'}}
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Series"
        component={Series}
        options={{
          tabBarLabel: <Text style={styles.labelText}>Series</Text>,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color}) => (
            <Icon
              name="film"
              {...{color: focused ? 'black' : 'gray'}}
              size={28}
            />
          ),
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
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
