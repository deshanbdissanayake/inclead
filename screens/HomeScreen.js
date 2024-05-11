import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors/colors'
import { useNavigation } from '@react-navigation/native';
import Leaderboard from './Leaderboard';

const Header = () => {
    const navigation = useNavigation();

    const handleMatches = () => {
        navigation.navigate('Match List')
    }

    return (
        <View style={styles.headerWrapper}>
            <View style={styles.nameWrapper}>
                <Text style={styles.appNameTextStyles}>inclead</Text>
                <Text style={styles.gameNameTextStyles}>carrom</Text>
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