import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingSpinner = ({size}) => (
  <View style={[styles.container]}>
 
    <ActivityIndicator size={size} color="#00ff00" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:'flex',
    justifyContent: 'flex-end',
  },
});

export default LoadingSpinner;