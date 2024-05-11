import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/general/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../assets/colors/colors'

const PlayerSingle = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { playerData } = route.params;


  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
    
      <Header text={'Player Stats'} handleGoBack={handleGoBack} />
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image style={styles.imageStyles} source={{uri: `data:image/png;base64,${playerData.image}`}} />
        <Text style={styles.nameTextStyles}>{playerData.name}</Text>
        <View style={styles.tableStyles}>
          <View style={styles.rowStyles}>
            <Text style={styles.headerTextStyles}>Ranking</Text>
            <Text style={styles.dataTextStyles}>{playerData.place}</Text>
          </View>
          <View style={styles.rowStyles}>
            <Text style={styles.headerTextStyles}>Avg Points Per Match</Text>
            <Text style={styles.dataTextStyles}>{playerData.value}</Text>
          </View>
          <View style={styles.rowStyles}>
            <Text style={styles.headerTextStyles}>Total Points</Text>
            <Text style={styles.dataTextStyles}>{(playerData.total_points + (playerData.total_red_pots * 2) - playerData.total_minus_points - (playerData.total_foul * 2))}</Text>
          </View>
          <View style={styles.rowStyles}>
            <Text style={styles.headerTextStyles}>Total Matches</Text>
            <Text style={styles.dataTextStyles}>{playerData.total_matches}</Text>
          </View>
          <View style={styles.rowStyles}>
            <Text style={styles.headerTextStyles}>Total Wins</Text>
            <Text style={styles.dataTextStyles}>{playerData.total_wins}</Text>
          </View>
          <View style={styles.rowStyles}>
            <Text style={styles.headerTextStyles}>Total Loses</Text>
            <Text style={styles.dataTextStyles}>{parseInt(playerData.total_matches) - parseInt(playerData.total_wins)}</Text>
          </View>
          <View style={styles.rowStyles}>
            <Text style={styles.headerTextStyles}>Total Plus Points</Text>
            <Text style={styles.dataTextStyles}>{playerData.total_points}</Text>
          </View>
          <View style={styles.rowStyles}>
            <Text style={styles.headerTextStyles}>Total Minus Points</Text>
            <Text style={styles.dataTextStyles}>-{playerData.total_minus_points}</Text>
          </View>
          <View style={styles.rowStyles}>
            <Text style={styles.headerTextStyles}>Total Red Pots</Text>
            <Text style={styles.dataTextStyles}>{playerData.total_red_pots}</Text>
          </View>
          <View style={styles.rowStyles}>
            <Text style={styles.headerTextStyles}>Total Fouls</Text>
            <Text style={styles.dataTextStyles}>{playerData.total_foul}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default PlayerSingle

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  contentContainer: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
  },
  imageStyles: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 100,
    backgroundColor: colors.textColorPri,
    borderWidth: 1,
    borderColor: colors.textColorPri,
  },
  nameTextStyles: {
    fontFamily: 'ms-semibold',
    fontSize: 16,
    color: colors.textColorPri,
    marginVertical: 15,
  },
  tableStyles: {
    borderTopWidth: 1,
    borderTopColor: colors.bgColorTer,
    width: '100%',
  },
  rowStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.bgColorTer,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  headerTextStyles: {
    fontFamily: 'ms-regular',
    fontSize: 14,
    color: colors.textColorPri,
  },
  dataTextStyles: {
    fontFamily: 'ms-semibold',
    fontSize: 14,
    color: colors.textColorPri,
  },
})