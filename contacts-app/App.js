import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactsScreen from './screens/ContactsScreen';
import ContactProfileScreen from './screens/ContactProfileScreen';

import { Colors } from './styles';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navigatorStyles}>
        <Stack.Screen name="Contacts List" component={ContactsScreen} />
        <Stack.Screen name="Contact Profile" component={ContactProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const navigatorStyles =  {
    headerStyle: {
      backgroundColor: Colors.bg_primary,
      borderBottomWidth: 0
    },
    headerTintColor: Colors.primary_color, 
    headerTitleStyle: {
      fontWeight: 'bold', 
    },
    headerBackTitleVisible: false
  }

export default App;
