import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, StyleSheet} from 'react-native';

interface OrderMoviesFilterProps {
  selectedOrder: string;
  setSelectedOrder: (order: string) => void;
}

const orderOptions = [
  {label: 'Most popular', value: 'most_popular'},
  {label: 'Less popular', value: 'less_popular'},
  {label: 'Top rated', value: 'top_rated'},
  {label: 'Lowest rated', value: 'lowest_rated'},
];

export const OrderMoviesFilter: React.FC<OrderMoviesFilterProps> = ({
  selectedOrder,
  setSelectedOrder,
}) => (
  <View style={styles.container}>
    <Picker
      selectedValue={selectedOrder}
      onValueChange={itemValue => setSelectedOrder(itemValue)}
      style={styles.picker}
      dropdownIconColor="#fff">
      {orderOptions.map(option => (
        <Picker.Item
          key={option.value}
          label={option.label}
          value={option.value}
        />
      ))}
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    margin: 8,
    borderWidth: 1,
    borderColor: '#4a4e69',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'flex-start',
  },
  picker: {
    color: '#fff',
    width: 180,
    backgroundColor: 'transparent',
  },
});
