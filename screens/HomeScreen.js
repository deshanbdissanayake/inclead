import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../assets/colors/colors'
import { useNavigation } from '@react-navigation/native';
import Leaderboard from './Leaderboard';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MiniButton from '../components/general/MiniButton';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';

const Header = ({userdata}) => {
    const navigation = useNavigation();

    const { setIsLoggedIn } = useAppContext();

    const logout = () => {
        AsyncStorage.clear();
        setIsLoggedIn(false);
    }

    const handleLogout = () => {
        Alert.alert('Logout Confirm', 'Are you sure?',[
            {text: 'cancel', onPress: () => null, style: 'cancel'},
            {text: 'Logout', onPress: () => logout()}
        ])
    }

    const handleSettings = () => {
        navigation.navigate('Settings')
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

    const [loading, setLoading] = useState(true)
    const [userdata, setUserdata] = useState(null);

    useEffect(()=>{
        getData();
    },[])

    const getData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userdata');
        setUserdata(JSON.parse(userData))
      } catch (error) {
        console.error('error at App.js->getData: ', error);
      } finally {
        setLoading(false)
      }
    }

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <Header userdata={userdata} />
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