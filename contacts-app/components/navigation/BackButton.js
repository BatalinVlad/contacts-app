import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../styles/index';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.backNavButtonWrapper} onPress={() => navigation.goBack()}>
      <Feather style={styles.backNavButtonIcon} name="chevron-left" />
    </TouchableOpacity >
  );
};

const styles = StyleSheet.create({
  backNavButtonWrapper: {
    marginLeft: 20,
    backgroundColor: Colors.borderBottom,
    opacity: 0.5,
    borderRadius: 100,
  },
  backNavButtonIcon: {
    fontSize: 30,
    color: Colors.white
  }
})

export default BackButton;
