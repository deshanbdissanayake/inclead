import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'

const Subtitle = ({ text }) => {
  return (
    <Text style={styles.textStyles}>{text}</Text>
  )
}

export default Subtitle

const styles = StyleSheet.create({
    textStyles: {
        fontSize: 16,
        fontFamily: 'ms-semibold',
        color: colors.textColorPri,
        marginBottom: 10,
    }
})