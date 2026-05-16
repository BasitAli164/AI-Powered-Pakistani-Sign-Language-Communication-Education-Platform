import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EducationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Education</Text>
      <Text style={styles.text}>Learn Pakistani Sign Language</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

// Made with Bob
