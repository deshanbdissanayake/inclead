import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NewGameScreen from '../screens/NewGameScreen';
import NewGameScoreScreen from '../screens/NewGameScoreScreen';
import NewGameScoreViewScreen from '../screens/NewGameScoreViewScreen';

const Stack = createStackNavigator();

const GameNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="New Game" component={NewGameScreen} options={{headerShown: false}} />
        <Stack.Screen name="New Game Score" component={NewGameScoreScreen} options={{headerShown: false}} />
        <Stack.Screen name="New Game Score Board" component={NewGameScoreViewScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default GameNav