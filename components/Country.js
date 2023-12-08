import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Country = ({ item }) => {
  const handlePress = () => {
    console.log('Selected Country:', item.name);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>{item.name} ({item.code})</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardContent: {
    padding: 16,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Country;
