import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';
import PlayersList from '../screens/PlayersList';
import NewGameScreen from '../screens/NewGameScreen';
import PlayerSingle from '../screens/PlayerSingle';

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Player Single" component={PlayerSingle} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default HomeNav