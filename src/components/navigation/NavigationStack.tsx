/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {Home} from '../../screens/Home';
import {Movies} from '../../screens/Movies';
import {MoviesDetails} from '../../screens/MoviesDetails';
import {Series} from '../../screens/Series';
import ActorsDetailsScreen from '../../screens/ActorsDetailsScreen';
import {STRINGS} from '../../constans/strings';
import SeriesDetails from '../../screens/SeriesDetails';

// Stacks
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
      <MoviesStack.Screen
        name="ActorsDetails"
        component={ActorsDetailsScreen}
        options={{headerShown: false}}
      />
    </MoviesStack.Navigator>
  );
}

const SeriesStack = createNativeStackNavigator();
function SeriesStackScreen() {
  return (
    <SeriesStack.Navigator>
      <SeriesStack.Screen
        name="SeriesScreen"
        component={Series}
        options={{headerShown: false}}
      />
      <SeriesStack.Screen
        name="SeriesDetails"
        component={SeriesDetails}
        options={{headerShown: false}}
      />
    </SeriesStack.Navigator>
  );
}

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

const Tab = createBottomTabNavigator();

export default function NavigationStack() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: styles.tabBar,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.labelText,
                  {color: focused ? '#FFFFFF' : '#94a3b8'},
                ]}>
                {STRINGS.HOME}
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Icon
                name="home"
                color={focused ? '#FFFFFF' : '#94a3b8'}
                size={20}
                style={styles.icon}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Movies"
          component={MoviesStackScreen}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.labelText,
                  {color: focused ? '#FFFFFF' : '#94a3b8'},
                ]}>
                {STRINGS.MOVIES}
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Icon
                name="play"
                color={focused ? '#FFFFFF' : '#94a3b8'}
                size={20}
                style={styles.icon}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Series"
          component={SeriesStackScreen}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.labelText,
                  {color: focused ? '#fff' : '#94a3b8'},
                ]}>
                {STRINGS.SERIES}
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <Icon
                name="tv"
                color={focused ? '#FFFFFF' : '#94a3b8'}
                size={20}
                style={styles.icon}
              />
            ),
          }}
        />
      </Tab.Navigator>
      {/* Gradiente flotante detrás de la barra */}
      <LinearGradient
        colors={['#111827', '#000000']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradientBar}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tabBar: {
    backgroundColor: 'rgba(17,24,39,0.65)',
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 10,
    borderRadius: 12,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#111827',
    height: 60,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    paddingBottom: 8,
  },
  gradientBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    borderRadius: 24,
    zIndex: -1,
  },
  labelText: {
    fontSize: 10,
    fontWeight: '500',
    color: 'gray',
    textAlign: 'center',
  },
  icon: {
    marginBottom: -10,
  },
});
