import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../components/general/Input'
import Button from '../components/general/Button'
import { colors } from '../assets/colors/colors'
import { getAllAsyncData, storeData } from '../assets/data/async_storage'
import { useAppContext } from '../context/AppContext'
import LoadingScreen from './LoadingScreen'
import { getAllUsers, saveUser } from '../assets/data/users'

const LoginScreen = () => {
  const { setIsLoggedIn } = useAppContext();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async () => {
    try {
        // Fetch user data only if needed
        const users = await getAllUsers();

        // Check username availability directly in the query
        const userAuth = users.some((user) => user.username === username);
        
        if (userAuth) {
            const userCheck = users.some((user) => user.username === username && user.password === password);
            
            if(!userCheck){
              Alert.alert('Error', 'Username or Password is incorrect!');
              return;
            }
        }else{
          // save in db
          await saveUser({username: username, password: password})
        }

        // Store username only if it's available
        const res = await storeData('username', username);
        
        if (res) {
            setIsLoggedIn(true);
        }
    } catch (error) {
        console.error('Error at login screen async save: ', error);
    }
  }

  const getData = async () => {
    try {
      let res = await getAllAsyncData();
      if(res && res.username){
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('error at login screen async get: ', error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    getData()
  },[])

  if(loading){
    return <LoadingScreen/>
  }

  return (
    <View style={styles.container}>
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
          secureTextEntry={true}
        />
      </View>
      <View style={styles.formItemWrapper}>
        <Button
          bgColor={colors.bgColorSec}
          content={<Text style={styles.btnTextStyles}>Let's Go !!</Text>}
          func={handleSubmit}
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
    color: colors.textColorSec,
  },
  welcomeWrapper: {
    marginBottom: 50,
    alignItems: 'center'
  },
  welcomeTextStyles: {
    marginBottom: 10,
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
})