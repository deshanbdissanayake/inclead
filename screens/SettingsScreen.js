import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors/colors'
import Header from '../components/general/Header'
import { useNavigation } from '@react-navigation/native'
import { useAppContext } from '../context/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome5, FontAwesome6, MaterialIcons } from '@expo/vector-icons'

const SettingsScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

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

    const handlePlayers = () => {
        navigation.navigate('Player List')
    }

    const handleUsers = () => {
        navigation.navigate('User List')
    }

    return (
        <View style={styles.container}>
            <Header text={'Settings'} handleGoBack={handleGoBack} />

            <View style={styles.btnSetWrapper}>
                <TouchableOpacity onPress={handlePlayers} style={[styles.btnWrapper, {borderTopWidth: 1}]}>
                    <FontAwesome5 name="users" size={20} color={colors.textColorPri} />
                    <Text style={styles.btnTextStyles}>Players</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleUsers} style={styles.btnWrapper}>
                    <FontAwesome6 name="users-gear" size={20} color={colors.textColorPri} />
                    <Text style={styles.btnTextStyles}>Users</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={styles.btnWrapper}>
                    <MaterialIcons name="logout" size={24} color={colors.textColorPri} />
                    <Text style={styles.btnTextStyles}>Logout</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    btnSetWrapper: {
        flex: 1,
        marginTop: 20,
    },
    btnWrapper: {
        marginHorizontal: 5,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
    },
    btnTextStyles: {
        fontSize: 16,
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
        paddingHorizontal: 5,
        marginLeft: 15,
    },
})