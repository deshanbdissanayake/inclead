import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';
import PlayersList from '../screens/PlayersList';
import PlayerSingle from '../screens/PlayerSingle';
import MatchList from '../screens/MatchList';
import MatchSingle from '../screens/MatchSingle';
import SettingsScreen from '../screens/SettingsScreen';
import UsersList from '../screens/UsersList';

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Player List" component={PlayersList} options={{headerShown: false}} />
        <Stack.Screen name="Player Single" component={PlayerSingle} options={{headerShown: false}} />
        <Stack.Screen name="Match List" component={MatchList} options={{headerShown: false}} />
        <Stack.Screen name="Match Single" component={MatchSingle} options={{headerShown: false}} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}} />
        <Stack.Screen name="User List" component={UsersList} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default HomeNav