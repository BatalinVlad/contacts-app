import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import * as Contacts from 'expo-contacts';
import ContactsList from '../components/ContactsList';
import { Base } from '../styles';
import FilterNav from '../components/FilterNav';

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [filtredContacts, setFilteredContacts] = useState([]);
  const [filterByContactsNameValue, setFilterByContactsNameValue] = useState('');
  const [filterMode, setFilterMode] = useState(false)

  useEffect(() => {
    setData()
  }, []);

  const setData = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission not granted');
      }
      const { data } = await Contacts.getContactsAsync({});
      if (data.length === 0) {
        throw new Error('No contacts found');
      }
      const sortedContactsData = data.sort((a, b) => {
        if (a.firstName && b.firstName) {
          return a.firstName.localeCompare(b.firstName);
        }
        return 0;
      });
      const clearedAndSortedData = clearContactsData(sortedContactsData)

      setContacts(clearedAndSortedData);

    } catch (error) {
      console.error('Error setting data:', error);
    }
  };

  const clearContactsData = (contacts) => {
    let unclearedContactsData = [];
    let clearedContactsData = [];

    const regex = /^\p{Script=Hebrew}/u;

    for (const contact of contacts) {
      if (regex.test(contact.name)) {
        unclearedContactsData.push(contact);
      } else if (regex.test(contact.firstName)) {
        unclearedContactsData.push(contact);
      } else if (regex.test(contact.lastName)) {
        unclearedContactsData.push(contact);
      } else {
        clearedContactsData.push(contact);
      }
    }

    return [...unclearedContactsData, ...clearedContactsData];
  };

  const onChangeTextHandler = (inputText) => {
    setFilterByContactsNameValue(inputText);
    onFilterContactsByNameHandler(inputText);
  };

  const onFilterContactsByNameHandler = (val) => {
    if (val.length === 0) {
      setFilterMode(false);
    } else if (val.length > 0) {
      setFilterMode(true);
      const filteredContacts = contacts.filter((contact) => {
        if (contact.name && val) {
          return contact.name.toLowerCase().includes(val.toLowerCase());
        }
        return false;
      });
      setFilteredContacts(filteredContacts);
    }
  }

  return (

    <View style={styles.appScreen}>
      <ImageBackground
        source={{ uri: ('https://img.freepik.com/premium-vector/soft-gray-white-wave-background-design_41084-352.jpg') }}
        style={{flex: 1}}
      >
      <FilterNav onChangeText={onChangeTextHandler} filterContactsByNameValue={filterByContactsNameValue} />
        {filtredContacts  && filterMode && <ContactsList contacts={filtredContacts} />}
        {contacts && !filterMode && <ContactsList contacts={contacts} />}
      </ImageBackground>
    </View >
  );
}

const styles = StyleSheet.create({
  appScreen: {
    ...Base.appScreen
  },
})

export default ContactsScreen