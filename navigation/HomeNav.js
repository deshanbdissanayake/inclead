import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';
import PlayersList from '../screens/PlayersList';
import NewGameScreen from '../screens/NewGameScreen';

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Players List" component={PlayersList} options={{headerShown: false}} />
        <Stack.Screen name="New Game" component={NewGameScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default HomeNav