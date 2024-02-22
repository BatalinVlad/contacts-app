import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Contacts from 'expo-contacts';
import ContactPreview from '../components/ContactPreview';
import { Inputs, Base } from '../styles';

// const DummyData = [{
//   firstName: 'vlad',
//   id: 'jhkb223'
// }, {
//   firstName: 'danny',
//   id: 'sad231'
// }, {
//   firstName: 'jhonny',
//   id: 'erwrw233'
// }]

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [filtredContacts, setFiltredContacts] = useState([]);
  const [filterByContactName, setFilterByContactName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({});
        if (data.length > 0) {
          const sortedData = data.sort((a,b) => a.name > b.name)
          setContacts(sortedData)
        }
      }
    })();
    // setContacts(DummyData)
  }, []);

  const handleOpenProfile = (contactData) => {
    navigation.navigate('Contact Profile', { contactData });
  }

  const onChangeText = (inputText) => {
    setFilterByContactName(inputText);
    filterContactsByName(inputText)
  };

  const filterContactsByName = (val) => {
    const filtredContact = contacts.filter((contact) => {
      if (contact.name) return contact.name.includes(val)
    })
    setFiltredContacts(filtredContact);
  }

  return (
    <View style={styles.appScreen}>
      <View>
        <TextInput
          style={styles.inputText}
          value={filterByContactName}
          onChangeText={onChangeText}
          placeholder="find.."
          placeholderTextColor="white"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        {filtredContacts.length !== 0 && contacts ?
          filtredContacts.map((contact) => {
            return <ContactPreview key={contact.id} contact={contact} handleOpenProfile={handleOpenProfile} />
          })
          :
          contacts.map((contact) => {
            return <ContactPreview key={contact.id} contact={contact} handleOpenProfile={handleOpenProfile} />
          })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appScreen: {
    ...Base.appScreen
  },
  inputText: {
    ...Inputs.inputText
  },
  scrollView: {
    ...Base.scrollView
  },
})


export default ContactsScreen