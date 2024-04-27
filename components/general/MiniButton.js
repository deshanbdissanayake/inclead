import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MiniButton = ({bgColor, func, content, paddingStt = true}) => {
  return (
    <TouchableOpacity onPress={func}>
        <View style={[styles.miniButtonStyles, paddingStt ? styles.paddingStyles : null, {backgroundColor: bgColor}]}>
            {content}
        </View>
    </TouchableOpacity>
  )
}

export default MiniButton

const styles = StyleSheet.create({
    miniButtonStyles: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor: 'red'
    },
    paddingStyles: {
      padding: 5,
      width: 40,
      height: 40,
    },
})