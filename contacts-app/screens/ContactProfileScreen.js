import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Colors, Base } from '../styles';

const ContactProfileScreen = () => {
  const route = useRoute();
  const [contactData, setcontactData] = useState([]);

  useEffect(() => {
    const { contactData } = route.params;
    setcontactData(contactData)
  })

  return (
    <View style={styles.container}>
      <Image
        // source={{
        //   uri: contactData.imageAvailable
        //     ? contactData.imageAvailable
        //     : 'https://www.clipartmax.com/png/middle/434-4349876_profile-icon-vector-png.png'
        // }}

        source={require('../assets/profileicon.png')}
        resizeMode="contain"
        style={styles.profileImage}
      />
      {contactData &&
        <View style={styles.contactDataContainer}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {contactData.lastName && <Text style={styles.contactText}>{contactData.lastName}</Text>}
            {contactData.firstName && <Text style={[styles.contactText, { marginLeft: 10 }]}>{contactData.firstName}</Text>}
          </View>
          <View>
            {contactData.phoneNumbers && contactData.phoneNumbers.map((phoneNumber, idx) => {
              return <View key={idx}>
                <Text style={styles.contactText}>
                  {phoneNumber.number}
                </Text>
                <Text style={styles.contactText}>
                  {phoneNumber.label}
                </Text>
              </View>
            })}
          </View>
        </View>
      }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    ...Base.container,
    justifyContent: 'flex-start',
  },
  contactText: {
    color: Colors.primary_color
  },
  profileImage: {
    marginTop: 30,
    height: '30%',
    width: '80%',
  },
  contactDataContainer: {
    backgroundColor:Colors.bg_secondary,
    marginTop: 40,
    display: 'flex',
    width: '90%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10

  }
});

export default ContactProfileScreen;
