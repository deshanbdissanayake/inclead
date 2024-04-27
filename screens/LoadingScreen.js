import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors/colors'

const LoadingScreen = ({bgColor = colors.bgColor}) => {
  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <ActivityIndicator size={50} color={colors.textColorPri} />
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})