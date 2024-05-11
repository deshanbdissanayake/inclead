import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import Header from '../components/general/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../assets/colors/colors'
import MiniButton from '../components/general/MiniButton'
import { Entypo } from '@expo/vector-icons'
import BottomSheet from '@gorhom/bottom-sheet';

const PlayerSingle = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [1, '30%'], []);

  const { playerData } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  }

  const handleInstructions = () => {
    bottomSheetRef.current.expand();
  }

  return (
    <View style={styles.container}>
    
      <Header 
        text={'Player Stats'} 
        handleGoBack={handleGoBack} 
        component={
          <MiniButton
              func={handleInstructions}
              content={<Entypo name="info-with-circle" size={24} color={colors.textColorPri} />}
          />
        }
      />
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
            <Text style={styles.dataTextStyles}>{(playerData.total_points + (playerData.total_red_pots * 2) + (playerData.total_wins * 3) - playerData.total_minus_points - (playerData.total_foul * 2))}</Text>
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
      <BottomSheet 
          ref={bottomSheetRef} 
          index={0} 
          snapPoints={snapPoints} 
          backgroundStyle={{backgroundColor: colors.bgColorSec}}
          handleIndicatorStyle={{backgroundColor: colors.textColorSec}}
      >
          <View style={styles.bottomSheetContainer}>
              <Text style={styles.bottomSheetTitleTextStyles}>How Total Points are Calculated</Text>
              <Text style={styles.instructionsTextStyles}>* If your own carromman is pocketed 1 point. If red is pocketed 2 points.</Text>
              <Text style={styles.instructionsTextStyles}>** If your opponents carromman is pocketed -1 points. Foul -2 points.</Text>
              <Text style={styles.instructionsTextStyles}>*** If your team wins 3 points.</Text>
          </View>
      </BottomSheet>
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
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: colors.bgColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bottomSheetTitleTextStyles: {
    fontSize: 14,
    fontFamily: 'ms-semibold',
    color: colors.textColorPri,
    marginBottom: 10,
  },
  instructionsTextStyles: {
      fontSize: 12,
      fontFamily: 'ms-regular',
      color: colors.textColorPri,
      textAlign: 'justify',
      marginBottom: 10,
  },
})