import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const ContactPreview = (props) => {
    return <TouchableOpacity onPress={props.handlePress} style={styles.contact}>
        <View style={styles.contactContainer}>
            <Image
                source={{ uri: 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png' }}
                style={{ width: 30, height: 30 ,borderRadius:50 }}
            />
            {props.contact.name && <Text style={styles.contactText}> {props.contact.name} </Text>}
        </View>
    </TouchableOpacity>
}
export default ContactPreview

const styles = StyleSheet.create({
    contactText: {
        fontSize: 20,
        color:'white'
    },
    contactContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: 'grey',
        justifyContent: 'space-between'
    }
})