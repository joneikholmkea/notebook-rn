import { StatusBar } from 'expo-status-bar';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ListView from './screens/ListView';
import DetailView from './screens/DetailView';

export default function App() {
  
 const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
          name="ListView"
          component={ListView}
          options={{title: 'ListView'}}
        />
        <Stack.Screen name="DetailView" component={DetailView} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// sources: Good ones at that!
// https://firebase.google.com/docs/web/setup#add-sdk-and-initialize
// https://firebase.google.com/docs/storage/web/upload-files