import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors, Icons, ContactPreviewStyle } from '../styles';
import { Feather } from '@expo/vector-icons';

const ContactPreview = ({ contact }) => {
    const navigation = useNavigation();

    const handleOpenProfile = (contactData) => {
        navigation.navigate('Profile', { contactData });
    }

    return <Pressable onPress={() => handleOpenProfile(contact)}>
        <View style={styles.contactContainer}>
            {contact.rawImage ? (
                <Image
                    source={{ uri: contact.rawImage.uri }}
                    resizeMode="cover"
                    style={styles.previewProfileImage}
                />
            ) : (
                <View style={styles.profileIconByName}>
                    <Text style={styles.profileIconText}>
                        {contact.name ? contact.name[0] : ':('}
                    </Text>
                </View>
            )}
            <View style={styles.contacntData}>
                <View>
                    {contact.name && <Text style={[[styles.contactText], { fontWeight: 'bold' }]}> {contact.name} </Text>}
                    {contact.phoneNumbers ? <Text style={[[styles.contactText], { fontSize: 14 }]}> {contact.phoneNumbers[0].number} </Text> : ''}
                    {!contact.name && !contact.phoneNumbers && <Text style={[styles.contactText]}> {'no info :('} </Text>}
                </View>
                <Feather name="chevron-right" size={30} color="black" style={styles.featherIcon} />
            </View>
        </View>
    </Pressable>
}

export default ContactPreview

const styles = StyleSheet.create({
    contactContainer: {
        ...ContactPreviewStyle.contactContainer
    },
    contactText: {
        fontSize: 16,
        color: Colors.primary_color
    },
    previewProfileImage: {
        ...Icons.previewProfileImage
    },
    profileIconByName: {
        ...Icons.profileIconByName
    },
    profileIconText: {
        ...Icons.profileIconText
    },
    contacntData: {
        ...ContactPreviewStyle.contacntData
    },
    featherIcon: {
        opacity: 0.2
    }
})