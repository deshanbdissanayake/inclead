import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../assets/colors/colors';
import Header from '../components/general/Header';
import { AntDesign } from '@expo/vector-icons';
import MiniButton from '../components/general/MiniButton';

const PlayersList = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleAddPlayer = () => {
        Alert.alert('Under construction')
    }

    return (
        <View style={styles.container}>
            <Header 
                text={'Players List'} 
                handleGoBack={handleGoBack} 
                component={
                    <MiniButton
                        bgColor={colors.bgColorSec}
                        content={<AntDesign name="plus" size={24} color={colors.textColorSec} />}
                        func={handleAddPlayer}
                    />
                }
            />
            <Text>PlayersList</Text>
        </View>
    )
}

export default PlayersList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        padding: 15,
    },
})