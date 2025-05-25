import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import BarNavigation from './components/NavigationBar/BarNavigation';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BarNavigation />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
});
