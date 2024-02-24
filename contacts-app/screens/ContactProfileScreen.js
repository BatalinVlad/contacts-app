import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Colors, Icons } from '../styles';

const ContactProfileScreen = () => {
  const route = useRoute();
  const [contact, setcontact] = useState([]);

  useEffect(() => {
    const { contactData } = route.params;
    setcontact(contactData)
  }, [])

  const renderProfileIcon = () => {
    if (contact && contact.imageAvailable) {
      return (
        <Image
          source={{ uri: contact.rawImage.uri }}
          resizeMode="cover"
          style={styles.profileIconImage}
        />
      );
    } else {
      return (
        <Text style={styles.profileIcon}>
          {contact.name ? contact.name[0] : ':('}
        </Text>
      );
    }
  };

  return (
    <View style={styles.profileScreen}>
      <View style={styles.profileIconContainer}>
        <View style={styles.profileIconWrapper}>
          {renderProfileIcon()}
        </View>
        <View style={styles.contactDataContainer}>
          <Text style={styles.contactText}>
            {contact && contact.lastName}
          </Text>
          <Text style={[styles.contactText, { marginLeft: 10 }]}>
            {contact && contact.firstName}
          </Text>
        </View>
      </View>
      <View styles={styles.contactDataPhonesContainer}>
        {contact && contact.phoneNumbers && contact.phoneNumbers.map((phoneNumber, idx) => (
          <View key={idx} style={[styles.contactDataPhonesContainer, { justifyContent: 'flex-end' }]}>
            <Text style={styles.label}>{phoneNumber.label}</Text>
            <Text style={styles.phone}>{phoneNumber.number}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileScreen: {
    flex: 1,
    backgroundColor: Colors.bg_secondary,
  },
  profileIconContainer: {
    ...Icons.profileIconContainer
  },
  profileIconWrapper: {
    ...Icons.profileIconWrapper
  },
  profileIcon: {
    ...Icons.profileIcon
  },
  profileIconImage: {
    ...Icons.profileIconImage
  },
  contactDataContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15
  },
  contactText: {
    fontSize: 35,
    color: Colors.secandery_color,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contactDataPhonesContainer: {
    backgroundColor: Colors.bg_text,
    marginVertical: 10,
    marginHorizontal: 8,
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 10,
    display: 'flex',
    borderRadius: 10
  },
  phone: {
    fontSize: 16,
    textAlign: 'right',
    color: Colors.link
  },
  label: {
    marginBottom: 5,
    color: Colors.secandery_color,
    fontSize: 14,
    textAlign: 'right'
  }

});

export default ContactProfileScreen;
