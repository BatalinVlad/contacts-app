import React from 'react';
import { FlatList, StyleSheet, View, Text, Image } from 'react-native';
import ContactPreview from './ContactPreview';
import { Base } from '../styles';

const ContactsList = ({ contacts }) => {
  const renderItem = ({ item }) => (
    <ContactPreview key={item.id} contact={item} />
  );

  if (contacts.length === 0) {
    return (
      <View style={styles.noContactsFoundContainer}>
        <Image
          source={{ uri: ('https://cdn-icons-png.flaticon.com/512/6134/6134065.png') }}
          style={{ height: 100, width: 100 , marginBottom: 20}}
        ></Image>
        <Text style={{fontSize:20}}>
          no contacts found...
        </Text>
      </View>
    )

  }
  else return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
    />
  );
};

const styles = StyleSheet.create({
  scrollView: {
    ...Base.scrollView
  },
  noContactsFoundContainer: {
    height: '50%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ContactsList;
