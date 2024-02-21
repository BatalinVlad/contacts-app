import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactsScreen from './screens/ContactsScreen';
import ContactProfileScreen from './screens/ContactProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: 'rgb(142 142 142)',
        },
        headerTintColor: 'white', // Change text color of header buttons
        headerTitleStyle: {
          fontWeight: 'bold', // Customize header title style   
        },
      }}>
        <Stack.Screen name="Contacts List" component={ContactsScreen} />
        <Stack.Screen name="Contact Profile" component={ContactProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
