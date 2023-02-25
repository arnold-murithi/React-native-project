import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../screens/ChatsScreens/ChatScreen'
import Contacts from '../screens/ChatsScreens/ContactsList';
//import ChatsScreen from '../screens/ChatsScreens/ChatsScreen';
import MainTabNavigator from './MainTabNavigator';
import React from 'react'

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerStyle : {backgroundColor:"whitesmoke"}}}>
          
        <Stack.Screen name='Home' component={MainTabNavigator} options={{headerShown:false}}/>{/*prevent home screen from showing*/}
        <Stack.Screen name='Chat' component={ChatScreen}/>
        <Stack.Screen name='Contacts' component={Contacts}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}