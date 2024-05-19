import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { colors } from '../assets/colors/colors'
import Header from '../components/general/Header'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Subtitle from '../components/general/Subtitle'
import { getPlayers } from '../assets/data/players'
import NoData from '../components/general/NoData'
import LoadingScreen from './LoadingScreen'
import Button from '../components/general/Button'
import { Entypo } from '@expo/vector-icons';
import MiniButton from '../components/general/MiniButton'
import BottomSheet from '@gorhom/bottom-sheet';
import { getMatchStats } from '../assets/data/matches'

const NewGameScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [playersOriginal, setPlayersOriginal] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerNum, setPlayerNum] = useState(0);
  const [teamWhite, setTeamWhite] = useState([]);
  const [teamBlack, setTeamBlack] = useState([]);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [1, '25%'], []);

  const getPlayersFunc = async () => {
    try {
      let playersData = await getPlayers();
      setPlayersOriginal(playersData);
      await getMatchesFunc(playersData);
    } catch (error) {
        console.error('error at NewGameScreen.js -> getPlayersFunc: ', error);
    }
  };

  const getMatchesFunc = async (playersData) => {
    try {
      let matchesData = await getMatchStats();
  
      const playersDict = {};
  
      matchesData.forEach((match) => {
          match.players.forEach((player) => {
              if (!playersDict[player.id]) {
                  playersDict[player.id] = {
                      total_matches: 1,
                      total_wins: player.match_stt === 'won' ? 1 : 0,
                      total_plus_points: player.points ?? 0,
                      total_minus_points: player.minus_points ?? 0,
                      total_red_pots: player.red_pot ? 1 : 0,
                      total_foul: player.foul ?? 0,
                      total_special: player.special_points ?? 0,
                  };
              } else {
                  let existingPlayer = playersDict[player.id];
                  existingPlayer.total_matches++;
                  if (player.match_stt === 'won') {
                      existingPlayer.total_wins++;
                  }
                  existingPlayer.total_plus_points += player.points ?? 0;
                  existingPlayer.total_minus_points += player.minus_points ?? 0;
                  if (player.red_pot) {
                      existingPlayer.total_red_pots++;
                  }
                  existingPlayer.total_foul += player.foul ?? 0;
                  existingPlayer.total_special += player.special_points ?? 0;
              }
          });
      });
  
      // Calculate total points and value
      for (const playerId in playersDict) {
          const player = playersDict[playerId];
          const totalPoints = (player.total_plus_points * 1) + (player.total_red_pots * 2) + (player.total_wins * 3) + (player.total_special * 1) + (player.total_minus_points * -1) + (player.total_foul * -2);
          const value = (totalPoints / player.total_matches).toFixed(2);
          
          player.total_points = totalPoints.toFixed(2);
          player.value = parseFloat(value) >= 0 ? value : '0';
      }
  
      // Map the calculated stats back to playersData
      playersData = playersData.map((p) => ({
        ...p,
        total_points: playersDict[p.id] ? playersDict[p.id].total_points : 0,
        total_matches: playersDict[p.id] ? playersDict[p.id].total_matches : 0,
        avg_points: playersDict[p.id] ? playersDict[p.id].value : 0,
      }));
    
  
      // Sort players by name
      playersData.sort((a, b) => a.name.localeCompare(b.name));
      setPlayers(playersData);
    } catch (error) {
        console.error('error at NewGameScreen.js -> getMatchesFunc: ', error);
    } finally {
        setLoading(false);
        console.log('refreshed')
    }
  }

  useEffect(()=>{
    getPlayersFunc();
  },[])

  useFocusEffect(
    useCallback(()=>{
      resetFunc();
    },[])
  )
  
  const handlePlayerNum = (num) => {
    setPlayerNum(num);
  }

  const handlePlayer = (type, id) => {
    const playerIndex = players.findIndex((player) => player.id === id);
  
    if (playerIndex !== -1) {
      if (type === 'white') {
        const isSelected = teamWhite && teamWhite.some((player) => player.id === id);
        if (isSelected) {
          setTeamWhite((prevData) => prevData.filter((player) => player.id !== id));
        } else {
          setTeamWhite((prevData) => [...(prevData || []), players[playerIndex]]);
        }
      } else if (type === 'black') {
        const isSelected = teamBlack && teamBlack.some((player) => player.id === id);
        if (isSelected) {
          setTeamBlack((prevData) => prevData.filter((player) => player.id !== id));
        } else {
          setTeamBlack((prevData) => [...(prevData || []), players[playerIndex]]);
        }
      }
    }
  };

  const handleInstructions = () => {
    bottomSheetRef.current.expand();
  }

  const handleResetClick = () => {
    resetFunc()
  }

  const handleNextClick = () => {
    if(playerNum === 2){
        if(!teamWhite || teamWhite.length !== 1 || !teamBlack || teamBlack.length !== 1){
            Alert.alert('Error', 'Each team must have only one player for a two-player game!');
            return;
        }
    } else if(playerNum === 4){
        if(!teamWhite || teamWhite.length !== 2 || !teamBlack || teamBlack.length !== 2){
            Alert.alert('Error', 'Each team must have only two players for a four-player game!');
            return;
        }
    } else {
        Alert.alert('Error', 'Select Number of Players!');
        return;
    }

    const currentDateTime = JSON.stringify(new Date());

    navigation.navigate('New Game Score', { teamWhite, teamBlack, currentDateTime });
  }

  const resetFunc = () => {
    setPlayerNum(0);
    setTeamWhite(null);
    setTeamBlack(null);
    getMatchesFunc(playersOriginal);
  }

  if(loading){
    return <LoadingScreen/>
  }

  return (
    <View style={styles.container}>
        <Header 
          text={'New Game'} 
          component={
            <MiniButton
              func={handleInstructions}
              content={<Entypo name="info-with-circle" size={24} color={colors.textColorPri} />}
            />
          } 
        />
        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          
          <View>
            <View style={styles.sectionWrapper}>
              <Subtitle text={'Number of Players'} />
              <View style={styles.btnWrapper}>
                {[2, 4].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.numberBtnStyles,
                      playerNum == num ? styles.selectedNumberStyles : null,
                    ]}
                    onPress={() => handlePlayerNum(num)}
                  >
                    <Text
                      style={[
                        styles.numberBtnTextStyles,
                        playerNum == num ? styles.selectedNumberTextStyles : null,
                      ]}
                    >
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {playerNum > 0 ? (
              <>
                <View style={styles.sectionWrapper}>
                  <Subtitle text={'Select Team White'} />
                  <View style={styles.btnWrapper}>
                    {players.map((player) => 
                    teamBlack && teamBlack.some(blackPlayer => blackPlayer.id === player.id) ? null : (
                      <TouchableOpacity
                        key={player.id}
                        style={[
                          styles.playerBtnStyles,
                          teamWhite && teamWhite.length > 0 && teamWhite.some(whitePlayer => whitePlayer.id === player.id)
                            ? styles.selectedPlayerStyles
                            : null,
                        ]}
                        onPress={() => handlePlayer('white', player.id)}
                      >
                        <Text
                          style={[
                            styles.playerBtnTextStyles,
                            teamWhite && teamWhite.length > 0 && teamWhite.some(whitePlayer => whitePlayer.id === player.id)
                              ? styles.selectedPlayerTextStyles
                              : null,
                          ]}
                        >
                          {player.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={styles.sectionWrapper}>
                  <Subtitle text={'Select Team Black'} />
                  <View style={styles.btnWrapper}>
                    {players.map((player) => 
                      teamWhite && teamWhite.some(whitePlayer => whitePlayer.id === player.id) ? null : (
                        <TouchableOpacity
                          key={player.id}
                          style={[
                            styles.playerBtnStyles,
                            teamBlack && teamBlack.length > 0 && teamBlack.some(blackPlayer => blackPlayer.id === player.id)
                              ? styles.selectedPlayerStyles
                              : null,
                          ]}
                          onPress={() => handlePlayer('black', player.id)}
                        >
                          <Text
                            style={[
                              styles.playerBtnTextStyles,
                              teamBlack && teamBlack.length > 0 && teamBlack.some(blackPlayer => blackPlayer.id === player.id)
                                ? styles.selectedPlayerTextStyles
                                : null,
                            ]}
                          >
                            {player.name}
                          </Text>
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                </View>
              </>
            ) : (
              <NoData text={'Select Number of Players Players'} showImg={false} />
            )}
          </View>

          <View>
            <Button
              bgColor={colors.bgColor}
              content={<Text style={{color: colors.textColorPri, fontFamily: 'ms-regular'}}>Reset</Text>}
              bdr={colors.textColorPri}
              func={handleResetClick}
            />
            <Button
              bgColor={colors.bgColorSec}
              content={<Text style={{color: colors.textColorSec, fontFamily: 'ms-regular'}}>Next</Text>}
              bdr={colors.textColorPri}
              func={handleNextClick}
            />
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
              <Text style={styles.instructionsTextStyles}>* Press once to select team members. Press again to un-select team members.</Text>
              <Text style={styles.instructionsTextStyles}>** If the number of players is 2, then Team White and Team Black must each have one player. If the number of players is 4, then each team must have two players.</Text>
            </View>
        </BottomSheet>
    </View>
    
  )
}

export default NewGameScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: colors.bgColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  instructionsTextStyles: {
    fontSize: 12,
    fontFamily: 'ms-regular',
    color: colors.textColorPri,
    textAlign: 'justify',
    marginBottom: 10,
  },
  sectionWrapper: {
    marginBottom: 20,
  },
  btnWrapper: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  numberBtnStyles: {
    padding: 10,
    backgroundColor: colors.bgColorTer,
    borderRadius: 10,
    marginHorizontal: 2,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.textColorPri,
  },
  numberBtnTextStyles: {
    fontFamily: 'ms-bold',
    fontSize: 24,
    color: colors.textColorPri,
    textAlign: 'center'
  },
  selectedNumberStyles:{
    backgroundColor: colors.bgColorSec,
  },
  selectedNumberTextStyles:{
    color: colors.textColorSec,
  },
  playerBtnStyles: {
    padding: 10,
    backgroundColor: colors.bgColorTer,
    borderRadius: 10,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: colors.textColorPri,
    width: '32%',
    marginBottom: 10,
  },
  playerBtnTextStyles: {
    fontFamily: 'ms-regular',
    fontSize: 14,
    color: colors.textColorPri,
    textAlign: 'center'
  },
  selectedPlayerStyles: {
    backgroundColor: colors.bgColorSec,
  },
  selectedPlayerTextStyles: {
    color: colors.textColorSec,
  },
})