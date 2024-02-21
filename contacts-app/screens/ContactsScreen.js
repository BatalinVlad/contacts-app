import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView } from 'react-native';
import * as Contacts from 'expo-contacts';

import ContactPreview from '../components/ContactPreview';

const DummyData = [{
  name: 'vlad',
  id: 'jhkb223'
}, {
  name: 'danny',
  id: 'sad231'
}, {
  name: 'jhonny',
  id: 'erwrw233'
}]

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [filtredContacts, setFiltredContacts] = useState([]);
  const [filterByContactName, setFilterByContactName] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.Name],
        });
        if (data.length > 0) {
          setContacts(data)
        }
      }
    })();
    // setContacts(DummyData)
  }, []);

  const handlePress = () => {
    console.log('contact touched');
  }

  const onChangeText = (inputText) => {
    setFilterByContactName(inputText);
    filterContactsByName(inputText)
  };

  const filterContactsByName = (val) => {
    const filtredContact = contacts.filter((contact) => {
      if(contact.name) return contact.name.includes(val)
    })
    setFiltredContacts(filtredContact);
  }

  return (
    <View style={styles.appScreen}>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.inputStyle }
          value={filterByContactName}
          onChangeText={onChangeText}
          placeholder="find.."
          placeholderTextColor="white"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        {filtredContacts.length !== 0 && contacts ?
          filtredContacts.map((contact) => {
            return <ContactPreview key={contact.id} contact={contact} handlePress={handlePress} />
          })
          :
          contacts.map((contact) => {
            return <ContactPreview key={contact.id} contact={contact} handlePress={handlePress} />
          })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appScreen:{
    backgroundColor: 'rgb(142 142 142)',
    flex:'1'
  },
  filterContainer: {
    backgroundColor: 'rgb(142 142 142)',
    fontSize: 50,
    fontWeight: 600,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    color: 'white',
    padding: 5,
    fontSize: 15,
    textAlign:'center'
  }
});

export default ContactsScreen