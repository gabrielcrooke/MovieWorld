import React, {useState, useEffect} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {MultiCarousel} from '../components/Home/MultiCarousel';
import {HeroContent} from '../components/Hero/HeroContent';
import LoadingIndicator from '../components/Loading/LoadingIndicator';
import {GradientBackground} from '../components/Common/GradientBackGround';

export const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando la carga de datos, pendireemplaza con tu lógica real
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GradientBackground>
      {loading ? (
        <GradientBackground>
          <LoadingIndicator />
        </GradientBackground>
      ) : (
        <ScrollView>
          <StatusBar backgroundColor="#111827" />
          <HeroContent />
          <MultiCarousel />
        </ScrollView>
      )}
    </GradientBackground>
  );
};
