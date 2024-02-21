import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';

const ContactPreview = (props) => {
    return <Pressable onPress={props.handlePress} style={styles.contact}>
        <View style={styles.contactContainer}>
            <Image
                source={require('../assets/profileicon.png')}
                style={{ width: 30, height: 30 ,borderRadius:50 }}
            />
            {props.contact.name && <Text style={styles.contactText}> {props.contact.name} </Text>}
        </View>
    </Pressable>
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