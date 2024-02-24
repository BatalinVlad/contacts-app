import React, { useState, useEffect } from 'react';
import { ImageBackground, Image, View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Colors, Icons, ContactProfileScreenStyle } from '../styles';
import ActionsButtons from '../components/ActionsButtons';

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
    <ImageBackground source={{ uri: ('https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700346402.jpg') }}
      style={styles.profileScreen}
    >
      <View style={{ flex: 1 }}>
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
          <ActionsButtons contact={contact} />
        </View>
        <View styles={styles.contactDataPhonesContainer}>
          {contact && contact.phoneNumbers && contact.phoneNumbers.map((phoneNumber, idx) => (
            <View key={idx} style={[styles.contactDataPhonesContainer, { justifyContent: 'flex-end' }]}>
              <Text style={styles.label}>{phoneNumber.label}</Text>
              <Text onPress={() => callNumber(phoneNumber.number)} style={styles.phone}>{phoneNumber.number}</Text>
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  profileScreen: {
    ...ContactProfileScreenStyle.profileScreen
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
  },
  contactText: {
    color: Colors.secandery_color,
    letterSpacing: 1.5,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  contactDataPhonesContainer: {
    backgroundColor: Colors.bg_text,
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
