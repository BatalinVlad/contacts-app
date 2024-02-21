import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Contact Profile Screen</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactProfileScreen;
