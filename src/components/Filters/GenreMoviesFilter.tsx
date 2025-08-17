import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, StyleSheet} from 'react-native';
import {useFetchData} from '../../hooks/useFetchData';

interface GenreFilterProps {
  selectedGenre: string | undefined;
  setSelectedGenre: (genreId: string) => void;
  type: 'movie' | 'tv';
}

export const GenreMoviesFilter: React.FC<GenreFilterProps> = ({
  selectedGenre,
  setSelectedGenre,
  type,
}) => {
  const url = `https://api.themoviedb.org/3/genre/${type}/list?language=en`;
  const {data: genres} = useFetchData(url, [url]);
  /**console.log('Fetched genres:', genres);**/

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedGenre}
          onValueChange={itemValue => setSelectedGenre(itemValue)}
          style={styles.picker}
          dropdownIconColor="#fff">
          <Picker.Item label="Filters" value="" enabled={false} />
          <Picker.Item label="All" value="" />
          {genres?.map((genre: any) => (
            <Picker.Item
              key={genre.id}
              label={genre.name}
              value={genre.id.toString()}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  pickerContainer: {
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
