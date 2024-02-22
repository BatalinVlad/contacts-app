import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';

import { Colors } from '../styles';

const ContactPreview = (props) => {
    return <Pressable onPress={() => props.handleOpenProfile(props.contact)}>
        <View style={styles.contactContainer}>
            <Image
                // source={{
                //     uri: props.contact.imageAvailable
                //         ? props.contact.imageAvailable
                //         : 'https://www.clipartmax.com/png/middle/434-4349876_profile-icon-vector-png.png'
                // }}
                source={require('../assets/profileicon.png')}
                resizeMode="cover"
                style={styles.previewProfileImage}
            />
            {props.contact.name && <Text style={styles.contactText}> {props.contact.name} </Text>}
        </View>
    </Pressable>
}
export default ContactPreview

const styles = StyleSheet.create({
    contactText: {
        fontSize: 20,
        color: Colors.secandery_color
    },
    contactContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: Colors.bg_primary,
        justifyContent: 'space-between'
    },
    previewProfileImage: {
        width: 30,
        height: 30,
        borderRadius: 50,
        shadowColor: 'white', // Add shadow (iOS)
        shadowOffset: { width: 0, height: 2 }, // Add shadow (iOS)
        shadowOpacity: 0.8, // Add shadow (iOS)
        shadowRadius: 4, // Add shadow (iOS)
    }
})