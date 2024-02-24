import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, Linking, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import * as SMS from 'expo-sms';

import { Colors, Icons } from '../styles';

const ContactProfileScreen = () => {
  const route = useRoute();
  const [contact, setcontact] = useState([]);

  useEffect(() => {
    const { contactData } = route.params;
    setcontact(contactData)
  }, [])

  const callNumber = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`)
  }

  const handleSendSMS = async () => {
    if (!contact.phoneNumbers) return
    const recipients = [contact.phoneNumbers[0].number]; // Replace with the recipient's phone number
    const message = ''; // Your message here

    try {
      const { result } = await SMS.sendSMSAsync(recipients, message);
      console.log(result);
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

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

          <View style={styles.actionButtonsContainer}>
            <Pressable
              onPress={handleSendSMS}
              style={styles.actionButtons}>
              <Feather name="message-circle" size={24} color="white" />
              <Text style={styles.actionButtonsText}>sms</Text>
            </Pressable>
            <Pressable
              onPress={handleSendSMS}
              style={styles.actionButtons}>
              <Feather name="phone-call" size={24} color="white" />
              <Text style={styles.actionButtonsText}>call</Text>
            </Pressable>
          </View>
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

    </View>
  );
};

const styles = StyleSheet.create({
  profileScreen: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  actionButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    paddingBottom: 10
  },
  actionButtons: {
    backgroundColor: Colors.pressable,
    width: 90,
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
  },
  actionButtonsText: {
    marginTop: 3,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16
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
