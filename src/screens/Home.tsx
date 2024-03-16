import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {MultiCarousel} from '../components/Home/MultiCarousel';
import {HeroContent} from '../components/Hero/HeroContent';

export const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor="#111827" />
        <HeroContent />
        <MultiCarousel />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
});