import React from 'react'
import { View, Text, StyleSheet, Linking, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as SMS from 'expo-sms';

import { Colors } from '../styles';

const ActionsButtons = ({contact}) => {

    const callNumber = () => {
        if (!contact.phoneNumbers) return
        Linking.openURL(`tel:${contact.phoneNumbers[0].number}`)
    }

    const handleSendSMS = async () => {
        if (!contact.phoneNumbers) return
        const recipients = [contact.phoneNumbers[0].number];
        const message = '';

        try {
            const { result } = await SMS.sendSMSAsync(recipients, message);
        } catch (error) {
            console.error('Error sending SMS:', error);
        }
    };

    return (
        <View style={styles.actionButtonsContainer}>
            <Pressable
                onPress={callNumber}
                style={styles.actionButtons}>
                <Feather name="phone-call" size={24} color="white" />
                <Text style={styles.actionButtonsText}>call</Text>
            </Pressable>
            <Pressable
                onPress={handleSendSMS}
                style={styles.actionButtons}>
                <Feather name="message-square" size={24} color="white" />
                <Text style={styles.actionButtonsText}>sms</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({

    actionButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        paddingBottom: 10
    },
    actionButtons: {
        height: 80,
        width: 90,
        backgroundColor: Colors.pressable,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 5,
    },
    actionButtonsText: {
        marginTop: 4,
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16
    },
    
})

export default ActionsButtons