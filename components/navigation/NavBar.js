import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactsScreen from '../../screens/ContactsScreen';
import ContactProfileScreen from '../../screens/ContactProfileScreen';
import { Colors } from '../../styles';
import BackButton from './BackButton';


const NavBar = () => {
    const Stack = createStackNavigator();

    const renderHeaderBackButton = () => {
        return <BackButton />
    }

    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Contacts"
                component={ContactsScreen}
                options={{
                    headerStyle: {
                        backgroundColor: Colors.bg_primary, // Define header color for ContactsScreen
                        borderBottomWidth: 0,
                        borderBottomColor: 'transparent',
                    },
                    headerTintColor: Colors.icons, // Define header text color for ContactsScreen
                    headerTitleStyle: {
                        fontSize: 15,
                        fontWeight: 'bold',
                    },
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="Profile"
                component={ContactProfileScreen}
                options={{
                    headerStyle: {
                        backgroundColor: Colors.icons, // Define header color for ContactProfileScreen
                        borderBottomWidth: 0,
                    },
                    headerTintColor: Colors.borderBottom, // Define header text color for ContactProfileScreen
                    headerTitleStyle: {
                        fontSize: 15,
                        fontWeight: 'bold',
                    },
                    headerBackTitleVisible: false,
                    headerLeft: () => renderHeaderBackButton(),
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
}

export default NavBar
