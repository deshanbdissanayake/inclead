import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../assets/colors/colors';
import { Feather } from '@expo/vector-icons';

const NoData = ({ text = 'No Data', showImg = true }) => {
  return (
    <View style={styles.container}>
      {showImg && (
        <Feather name="cloud-off" size={80} color={colors.textColorPri} />
      )}
      <Text style={styles.textStyles}>{text}</Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyles: {
    fontWeight: '400',
    fontSize: 18,
    color: colors.textColorPri,
    textAlign: 'center',
    marginTop: 10,
  },
  imageStyles: {
    width: 150,
    height: 150,
  },
});