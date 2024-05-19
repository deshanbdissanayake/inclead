import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors/colors'
import { Feather } from '@expo/vector-icons'

const NoInternetScreen = () => {
  return (
    <View style={styles.container}>
      <Feather name="wifi-off" size={100} color={colors.textColorPri} />
      <View style={styles.textWrapper}>
        <Text style={styles.textStyles}>Check your</Text>
        <Text style={styles.textStyles}>Network Connection!</Text>
      </View>
    </View>
  )
}

export default NoInternetScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bgColor,
    },
    textWrapper: {
      marginTop: 20,
    },
    textStyles: {
      fontSize: 18,
      fontFamily: 'ms-regular',
      color: colors.textColorPri,
      textAlign: 'center',
    },
})