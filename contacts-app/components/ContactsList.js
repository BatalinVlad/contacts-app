import { StyleSheet, ScrollView, Text } from 'react-native';
import ContactPreview from './ContactPreview';
import { Base } from '../styles';

const ContactsList = ({ contacts }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
            {contacts.map((contact) => (
                <ContactPreview key={contact.id} contact={contact} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        ...Base.scrollView
    },
})

export default ContactsList;
