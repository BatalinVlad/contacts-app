import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Inputs } from '../styles';

const FilterNav = ({ filterByContactsNameValue , onChangeText}) => {
    return (
        <View style={styles.inputTextContainer}>
            <Feather name="search" size={30} color="black" style={styles.searchIcon} />
            <TextInput
                style={styles.inputText}
                value={filterByContactsNameValue}
                onChangeText={onChangeText}
                placeholder=" find . . ."
                placeholderTextColor="black"
            />
        </View>
    )
}
const styles = StyleSheet.create({
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


export default FilterNav