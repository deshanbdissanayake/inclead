import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { colors } from '../assets/colors/colors'
import Header from '../components/general/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import Subtitle from '../components/general/Subtitle'
import ScoreCard from '../components/app/ScoreCard'
import Button from '../components/general/Button'
import MiniButton from '../components/general/MiniButton'
import { Entypo } from '@expo/vector-icons'
import BottomSheet from '@gorhom/bottom-sheet';

const NewGameScoreScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { teamWhite, teamBlack } = route.params;

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => [1, '25%'], []);

    const [matchData, setMatchData] = useState({
        players: [],
        type: 'carrom',
        dateTime: Date.now(),
        handledBy: 'Desh',
        status: 'active'
    });

    const setMatchDataFunc = () => {
        const match = {
            players: [],
            type: 'carrom',
            dateTime: Date.now(),
            handledBy: 'Desh',
            status: 'active'
        };
    
        const addPlayersToMatch = (team, teamName) => {
            team.forEach(player => {
                match.players.push({
                    id: player.id,
                    name: player.name,
                    image: player.image,
                    team: teamName,
                    match_stt: null,
                    points: 0,
                    minus_points: 0,
                    red_pot: 0,
                    foul: 0
                });
            });
        };
    
        addPlayersToMatch(teamWhite, 'white');
        addPlayersToMatch(teamBlack, 'black');
    
        setMatchData(match); 
    };
    

    useEffect(()=>{
        setMatchDataFunc()
    },[])

    const changePlayerData = (newValue, player_id, type) => {
        let playerIndex = matchData.players.findIndex((e) => e.id === player_id);

        if (playerIndex === -1) {
            console.log("Player not found");
            return;
        }

        let updatedPlayers = [...matchData.players];

        if(type == 'white'){
            if(matchData.players[playerIndex].team == 'white'){
                updatedPlayers[playerIndex].points = newValue;
            }else{
                updatedPlayers[playerIndex].minus_points = newValue;
            }
        }else if(type == 'black'){
            if(matchData.players[playerIndex].team == 'black'){
                updatedPlayers[playerIndex].points = newValue;
            }else{
                updatedPlayers[playerIndex].minus_points = newValue;
            }
        }else if(type == 'red'){
            // Check if any other player already has red_pot = 1
            const hasOtherPlayerRedPot = matchData.players.some((player) => player.id !== player_id && player.red_pot == 1);
            if (hasOtherPlayerRedPot) {
                Alert.alert('Error', 'Cannot update red pot because another player already has red pot')
                return;
            }
            updatedPlayers[playerIndex].red_pot = newValue;
        }else if(type == 'foul'){
            updatedPlayers[playerIndex].foul = newValue;
        } else {
            console.log("Invalid type");
            return;
        }

        setMatchData(prevData => ({ ...prevData, players: updatedPlayers }));
    };

    const handleResetClick = () => {
        const updatedPlayers = matchData.players.map((player) => ({
            ...player,
            points: 0,
            minus_points: 0,
            red_pot: 0,
            foul: 0
        }));
    
        setMatchData(prevData => ({
            ...prevData,
            players: updatedPlayers
        }));
    };

    const updateWinningTeam = (type) => {
        const updatedPlayers = matchData.players.map((player) => ({
            ...player,
            match_stt: player.team == type ? 'won' : 'lost'
        }));
    
        setMatchData(prevData => ({
            ...prevData,
            players: updatedPlayers
        }));
    };

    useEffect(() => {
        // Navigate to the 'New Game Score Board' after match data is updated
        if (matchData.players && matchData.players.length > 0) {
            if(matchData.players[0].match_stt){
                navigation.navigate('New Game Score Board', { matchData });
            }
        }
    }, [matchData]);

    const handleFinishClick = () => {
        const checkRedPot = matchData.players.some((player) => player.red_pot === 1);
        const checkGameFinishWhite = matchData.players.some((player) => player.team === 'white' && player.points >= 9);
        const checkGameFinishBlack = matchData.players.some((player) => player.team === 'black' && player.points >= 9);

        if (checkRedPot && (checkGameFinishWhite || checkGameFinishBlack)) {
            Alert.alert('Confirm', 'Who won the game?', [
                { text: 'Cancel', style: 'cancel', onPress: () => null },
                { text: 'Black', onPress: () => updateWinningTeam('black') },
                { text: 'White', onPress: () => updateWinningTeam('white') },
            ]);
        } else {
            Alert.alert('Error', 'Please enter scores to continue!');
            return;
        }
    }
    
    const handleGoBack = () => {
        navigation.goBack();
    }
    
    const handleInstructions = () => {
        bottomSheetRef.current.expand();
    }

    return (
        <View style={styles.container}>
            <Header 
                text={'Game Score'} 
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
                <View style={styles.teamWrapper}>
                    <Subtitle text={'Team White'} />
                    {matchData.players && matchData.players.length > 0 && 
                        matchData.players.map((player, index)=> player.team == 'white' && (
                            <View style={[styles.scoreWrapper]} key={player.id}>
                                <View style={styles.nameWrapper}>
                                    <Image style={styles.imageStyles} source={{ uri: player.image }} />
                                    <Text style={styles.nameTextStyles}>{player.name}</Text>
                                </View>
                                <View style={styles.playerScoreWrapper}>
                                    <ScoreCard type={'white'} player_id={player.id} value={player.points} setValue={changePlayerData} />
                                    <ScoreCard type={'black'} player_id={player.id} value={player.minus_points} setValue={changePlayerData} />
                                    <ScoreCard type={'red'} player_id={player.id} value={player.red_pot} setValue={changePlayerData} />
                                    <ScoreCard type={'foul'} player_id={player.id} value={player.foul} setValue={changePlayerData} />
                                </View>
                            </View>
                        ))
                    }
                </View>
                <View style={styles.teamWrapper}>
                    <Subtitle text={'Team Black'} />
                    {matchData.players && matchData.players.length > 0 && 
                        matchData.players.map((player, index)=> player.team == 'black' && (
                            <View style={[styles.scoreWrapper]} key={player.id}>
                                <View style={styles.nameWrapper}>
                                    <Image style={styles.imageStyles} source={{ uri: player.image }} />
                                    <Text style={styles.nameTextStyles}>{player.name}</Text>
                                </View>
                                <View style={styles.playerScoreWrapper}>
                                    <ScoreCard type={'white'} player_id={player.id} value={player.minus_points} setValue={changePlayerData} />
                                    <ScoreCard type={'black'} player_id={player.id} value={player.points} setValue={changePlayerData} />
                                    <ScoreCard type={'red'} player_id={player.id} value={player.red_pot} setValue={changePlayerData} />
                                    <ScoreCard type={'foul'} player_id={player.id} value={player.foul} setValue={changePlayerData} />
                                </View>
                            </View>
                        ))
                    }
                </View>
                <View style={styles.btnsWrapper}>
                    <Button
                        bgColor={colors.bgColor}
                        content={<Text style={{color: colors.textColorPri, fontFamily: 'ms-regular'}}>Reset</Text>}
                        bdr={colors.textColorPri}
                        func={handleResetClick}
                    />
                    <Button
                        bgColor={colors.bgColorSec}
                        content={<Text style={{color: colors.textColorSec, fontFamily: 'ms-regular'}}>Finish</Text>}
                        bdr={colors.textColorPri}
                        func={handleFinishClick}
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
                    <Text style={styles.instructionsTextStyles}>
                        <View style={styles.instructionCarrommenWrapper}>
                            <View style={[styles.instructionCarrommanStyles, {backgroundColor: colors.gold}]}></View><Text style={styles.instructionCarrommanTextStyles}> - White</Text>
                            <View style={[styles.instructionCarrommanStyles, {backgroundColor: colors.black}]}></View><Text style={styles.instructionCarrommanTextStyles}> - Black</Text>
                            <View style={[styles.instructionCarrommanStyles, {backgroundColor: colors.danger}]}></View><Text style={styles.instructionCarrommanTextStyles}> - Red</Text>
                            <View style={[styles.instructionCarrommanStyles, {backgroundColor: colors.disabled}]}></View><Text style={styles.instructionCarrommanTextStyles}> - Foul</Text>
                        </View>
                    </Text>

                    <Text style={styles.instructionsTextStyles}>** If your own carromman is pocketed 1 point. If red is pocketed 2 points.</Text>
                    <Text style={styles.instructionsTextStyles}>*** If your opponents carromman is pocketed -1 points. Foul -2 points.</Text>
                </View>
            </BottomSheet>
        </View>
    )
}

export default NewGameScoreScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        paddingVertical: 15,
        paddingHorizontal: 15,
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
    contentContainer: {
        flexGrow: 1,
    },
    teamWrapper: {
        marginBottom: 20,
        backgroundColor: colors.bgColorTer,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    nameWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyles: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: colors.textColorPri,
        borderRadius: 50,
    },
    scoreWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: colors.bgColor,
    },
    nameTextStyles: {
        fontSize: 14,
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
    },
    playerScoreWrapper: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    instructionCarrommenWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    instructionCarrommanStyles: {
        width: 20,
        height: 10,
        borderRadius: 50,
        borderWidth: 1,
        marginLeft: 15,
    },
    instructionCarrommanTextStyles: {
        fontSize: 12,
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
    },
})