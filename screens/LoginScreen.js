import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../components/general/Input'
import Button from '../components/general/Button'
import { colors } from '../assets/colors/colors'
import { getAllAsyncData, storeData } from '../assets/data/async_storage'
import { useAppContext } from '../context/AppContext'
import LoadingScreen from './LoadingScreen'
import { getAllUsers } from '../assets/data/users'
import { Feather } from '@expo/vector-icons'

const LoginScreen = () => {
  const { setIsLoggedIn } = useAppContext();

  const [btnLoading, setBtnLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePw, setHidePw] = useState(true)

  const handleSubmit = async () => {
    setBtnLoading(true)
    try {
      // Fetch user data only if needed
      const users = await getAllUsers();
  
      // Check if username exists
      const user = users.find((user) => user.username === username);
  
      if (!user || user.password !== password) {
        Alert.alert('Error', 'Username or Password is incorrect!');
        return;
      }
  
      // Store user data and set logged in status
      const res = await storeData('userdata', JSON.stringify(user));
  
      if (res) {
          setIsLoggedIn(true);
      }
    
    } catch (error) {
        console.error('Error at login screen async save: ', error);
    } finally {
      setBtnLoading(false)
    }
  }

  const handleGuest = async () => {
    try {
      const user = { username: 'Guest', usertype: 'guest', password: null };
      // Store user data and set logged in status
      const res = await storeData('userdata', JSON.stringify(user));
    
      if (res) {
          setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('error at LoginScreen.js => handleGuest: ', error)
    }
  }

  return (
      <View style={styles.container} >
        <View style={styles.welcomeWrapper}>
          <Text style={styles.welcomeTextStyles}>Welcome</Text>
          <Text style={styles.welcomeSubTextStyles}>to INCLEAD</Text>
          <Text style={styles.welcomeDescTextStyles}>Introps Carrom Leaderboard</Text>
          <Image style={styles.welcomeImageStyles} source={require('../assets/images/carrom_logo.jpg')} />
        </View>
        <View style={styles.formItemWrapper}>
          <Input
            keyboardType={'default'}
            placeholder={'Enter Your Name'}
            value={username}
            onChangeText={(text) => setUsername(text)}
            textCenter={true}
          />
        </View>
        <View style={styles.formItemWrapper}>
          <Input
            keyboardType={'default'}
            placeholder={'Enter Your Password'}
            value={password}
            onChangeText={(text) => setPassword(text)}
            textCenter={true}
            secureTextEntry={hidePw}
          />
          {(<TouchableOpacity style={styles.pwShowStyles} onPress={() => setHidePw(prevData => (!prevData))}>
              {hidePw ? (
                  <Feather name="eye" size={24} color={colors.textColorPri} />
              ) : (
                  <Feather name="eye-off" size={24} color={colors.textColorPri} />
              )}
          </TouchableOpacity>)}
        </View>
        <View style={styles.formItemWrapper}>
          <Button
            bgColor={colors.bgColorSec}
            content={<Text style={[styles.btnTextStyles, {color: colors.textColorSec}]}>Let's Go !!</Text>}
            func={handleSubmit}
            loading={btnLoading}
            loaderIconColor={colors.textColorSec}
            bdr={colors.bgColorSec}
          />
          <Button
            bgColor={colors.bgColor}
            content={<Text style={[styles.btnTextStyles, {color: colors.textColorPri}]}>Login as a Guest</Text>}
            func={handleGuest}
            loading={btnLoading}
            loaderIconColor={colors.textColorPri}
            bdr={colors.textColorPri}
          />
        </View>
      </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    paddingHorizontal: 25,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formItemWrapper: {
    width: '100%',
    marginVertical: 5,
  },
  btnTextStyles: {
    fontFamily: 'ms-regular',
  },
  welcomeWrapper: {
    marginBottom: 50,
    alignItems: 'center'
  },
  welcomeTextStyles: {
    marginBottom: 5,
    fontSize: 36,
    fontFamily: 'ms-semibold',
    color: colors.textColorPri,
  },
  welcomeSubTextStyles: {
    marginBottom: 10,
    fontSize: 20,
    fontFamily: 'ms-regular',
    color: colors.textColorPri,
  },
  welcomeDescTextStyles: {
    marginBottom: 50,
    fontSize: 14,
    fontFamily: 'ms-light',
    color: colors.textColorPri,
  },
  welcomeImageStyles: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  pwShowStyles: {
    position: 'absolute',
    bottom: 12,
    right: 15,
  },
})