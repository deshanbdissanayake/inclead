import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const LoginNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Login Screen" component={LoginScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default LoginNav