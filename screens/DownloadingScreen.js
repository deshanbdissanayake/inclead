import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors/colors'

const DownloadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>DownloadingScreen</Text>
    </View>
  )
}

export default DownloadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bgColor,
    }
})