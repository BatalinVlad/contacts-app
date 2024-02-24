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
                        backgroundColor: Colors.navbar,
                        borderBottomWidth: 0,
                        borderBottomColor: 'transparent',
                    },
                    headerTintColor: Colors.icons, 
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
                        backgroundColor: Colors.icons, 
                        borderBottomWidth: 0,
                    },
                    headerTintColor: Colors.borderBottom, 
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
