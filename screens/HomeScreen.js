import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../assets/colors/colors'
import { useNavigation } from '@react-navigation/native';
import Leaderboard from './Leaderboard';
import { getAllAsyncData } from '../assets/data/async_storage';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppContext } from '../context/AppContext';

const Header = () => {
    const navigation = useNavigation();

    const { setIsLoggedIn } = useAppContext();

    const handleMatches = () => {
        navigation.navigate('Match List')
    }

    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null);

    const getData = async () => {
        try {
            let res = await getAllAsyncData()
            setUsername(res.username)
        } catch (error) {
            console.error('error at home screen async get: ', error)
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        AsyncStorage.clear();
        setIsLoggedIn(false);
    }

    useEffect(()=>{
        getData();
        //logout()
    },[])

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.headerWrapper}>
            <View style={styles.nameWrapper}>
                <Text style={styles.appNameTextStyles}>inclead</Text>
                <Text style={styles.gameNameTextStyles}>Hello {username} !!</Text>
            </View>
            <TouchableOpacity onPress={handleMatches}>
                <Image
                    style={styles.logoStyles}
                    source={require('../assets/images/carrom_logo.jpg')}
                />
            </TouchableOpacity>
        </View>
    )
}

const HomeScreen = () => {
  return (
    <View style={styles.container}>
        <Header/>
        <Leaderboard/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    headerWrapper : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.bgColorSec,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    logoStyles: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    nameWrapper: {
        //alignItems: 'flex-end',
    },
    appNameTextStyles : {
        color: colors.textColorSec,
        textTransform: 'uppercase',
        fontSize: 20,
        fontFamily: 'ms-bold'
    },
    gameNameTextStyles : {
        color: colors.textColorSec,
        textTransform: 'capitalize',
        fontSize: 14,
        fontFamily: 'ms-regular',
    },
})