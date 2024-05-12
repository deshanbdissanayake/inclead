import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../assets/colors/colors'
import { useNavigation } from '@react-navigation/native';
import Leaderboard from './Leaderboard';
import { getAllAsyncData } from '../assets/data/async_storage';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppContext } from '../context/AppContext';
import MiniButton from '../components/general/MiniButton';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const Header = () => {
    const navigation = useNavigation();

    const { setIsLoggedIn } = useAppContext();

    const [loading, setLoading] = useState(true)
    const [userdata, setUserdata] = useState(null);

    const getData = async () => {
        try {
            let res = await getAllAsyncData()
            let userdata = JSON.parse(res.userdata)
            setUserdata(userdata)
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
    },[])

    const handleLogout = () => {
        Alert.alert('Logout Confirm', 'Are you sure?',[
            {text: 'cancel', onPress: () => null, style: 'cancel'},
            {text: 'Logout', onPress: () => logout()}
        ])
    }

    const handleSettings = () => {
        navigation.navigate('Settings')
    }

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.headerWrapper}>
            <View>
                <Text style={styles.appNameTextStyles}>inclead</Text>
                <Text style={styles.gameNameTextStyles}>Hello {userdata.username} !!</Text>
            </View>
            <TouchableOpacity onPress={handleSettings}>
                {userdata.usertype === 'admin' ? (
                    <MiniButton
                        bgColor={colors.bgColorTer}
                        content={<FontAwesome name="cogs" size={24} color={colors.textColorPri} />}
                        func={handleSettings}
                    />
                ) : (
                    <MiniButton
                        bgColor={colors.bgColorTer}
                        content={<MaterialIcons name="logout" size={24} color={colors.textColorPri} />}
                        func={handleLogout}
                    />
                )}
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