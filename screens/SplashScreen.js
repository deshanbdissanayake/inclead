import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors/colors'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.imageStyles} source={require('../assets/images/carrom_logo.jpg')} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
})