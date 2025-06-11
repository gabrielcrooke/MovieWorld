import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  page: number;
  setPage: (p: number) => void;
  isFirstPage: boolean;
  isLastPage: boolean;
};

const Pagination = ({page, setPage, isFirstPage, isLastPage}: Props) => (
  <View style={styles.paginationContainer}>
    <TouchableOpacity
      style={[styles.pageButton, isFirstPage && styles.disabledButton]}
      onPress={() => !isFirstPage && setPage(page - 1)}
      disabled={isFirstPage}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
    <Text style={styles.pageNumber}>{page}</Text>
    <TouchableOpacity
      style={[styles.pageButton, isLastPage && styles.disabledButton]}
      onPress={() => !isLastPage && setPage(page + 1)}
      disabled={isLastPage}>
      <Icon name="chevron-right" size={20} color="#fff" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    marginBottom: 85,
  },
  pageButton: {
    backgroundColor: '#1f2937',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  disabledButton: {
    backgroundColor: '#6b7280',
  },
  pageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pageNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Pagination;
