import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MatchList from '../screens/MatchList';
import MatchSingle from '../screens/MatchSingle';

const Stack = createStackNavigator();

const MatchNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Match List" component={MatchList} options={{headerShown: false}} />
        <Stack.Screen name="Match Single" component={MatchSingle} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default MatchNav