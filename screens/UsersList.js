import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors/colors'
import Header from '../components/general/Header'
import { useNavigation } from '@react-navigation/native'

const UsersList = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Header
                text={'Users List'}
                handleGoBack={handleGoBack}
            />
            <Text>UsersList</Text>
        </View>
    )
}

export default UsersList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        padding: 15,
    },
})