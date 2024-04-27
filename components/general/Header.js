import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'
import MiniButton from './MiniButton'
import { AntDesign } from '@expo/vector-icons'

const Header = ({text, handleGoBack = null, component = null}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        {handleGoBack && (
          <View style={styles.btnWrapper}>
            <MiniButton
              func={handleGoBack}
              content={<AntDesign name="arrowleft" size={24} color={colors.textColorPri} />}
            />
          </View>
        )}
        <Text style={styles.headerTextStyles}>{text}</Text>
      </View>
      {component && component}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnWrapper: {
    marginRight: 10,
  },
  headerTextStyles: {
    fontSize: 24,
    fontFamily: 'ms-semibold',
    color: colors.textColorPri,
  },
})