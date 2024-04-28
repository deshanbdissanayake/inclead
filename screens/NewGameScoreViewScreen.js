import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../assets/colors/colors';
import Header from '../components/general/Header';
import Button from '../components/general/Button';

const NewGameScoreViewScreen = () => {
    const navigation = useNavigation();
    const route = useRoute()

    const { matchData } = route.params;

    console.log('matchData', matchData)

    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header text={'Game Scoreboard'} />
            <Text>NewGameScoreViewScreen</Text>
            <View style={styles.btnsWrapper}>
                <Button
                    bgColor={colors.bgColor}
                    content={<Text style={{color: colors.textColorPri, fontFamily: 'ms-regular'}}>Leaderboard</Text>}
                    bdr={colors.textColorPri}
                />
                <Button
                    bgColor={colors.bgColorSec}
                    content={<Text style={{color: colors.textColorSec, fontFamily: 'ms-regular'}}>New Game</Text>}
                    bdr={colors.textColorPri}
                />
            </View>
        </View>
    )
}

export default NewGameScoreViewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
})