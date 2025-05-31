import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  View,
} from 'react-native';
import {MultiCarousel} from '../components/Home/MultiCarousel';
import {HeroContent} from '../components/Hero/HeroContent';
import LoadingIndicator from '../components/Loading/LoadingIndicator';

export const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando la carga de datos, pendireemplaza con tu lógica real
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <LoadingIndicator />
        </View>
      ) : (
        <ScrollView>
          <StatusBar backgroundColor="#111827" />
          <HeroContent />
          <MultiCarousel />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
});
