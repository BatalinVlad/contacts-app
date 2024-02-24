import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import * as Contacts from 'expo-contacts';
import ContactsList from '../components/ContactsList';
import { Feather } from '@expo/vector-icons';
import { Inputs, Base } from '../styles';

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [filtredContacts, setFilteredContacts] = useState([]);
  const [filterByContactName, setFilterByContactName] = useState('');
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

    const regex = /^\p{Script=Hebrew}/u; // Regular expression to match a Hebrew letter at the beginning of the string

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

  const onChangeText = (inputText) => {
    setFilterByContactName(inputText);
    filterContactsByName(inputText)
  };

  const filterContactsByName = (val) => {
    if (val.length === 0) {
      setFilterMode(false)
    } else if (val.length > 0) {
      setFilterMode(true)
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
      <View>
        <View style={styles.inputTextContainer}>
          <Feather name="search" size={30} color="black" style={styles.searchIcon} />
          <TextInput
            style={styles.inputText}
            value={filterByContactName}
            onChangeText={onChangeText}
            placeholder=" find . . ."
            placeholderTextColor="black"
          />
        </View>
      </View>
      {filtredContacts.length !== 0 && filterMode && <ContactsList contacts={filtredContacts} />}
      {contacts.length !== 0 && !filterMode && <ContactsList contacts={contacts} />}
    </View>
  );
}

const styles = StyleSheet.create({
  appScreen: {
    ...Base.appScreen
  },
  inputTextContainer: {
    ...Inputs.inputTextContainer
  },
  inputText: {
    ...Inputs.inputText
  },
  searchIcon: {
    opacity: 0.4
  },
})


export default ContactsScreen