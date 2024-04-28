import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors/colors'
import Header from '../components/general/Header'
import { useNavigation, useRoute } from '@react-navigation/native'

const NewGameScoreScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { teamWhite, teamBlack } = route.params;


    console.log('teamWhite', teamWhite)
    console.log('teamBlack', teamBlack)

    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header text={'Game Score'} handleGoBack={handleGoBack} />
            <Text>NewGameScoreScreen</Text>
        </View>
    )
}

export default NewGameScoreScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
})