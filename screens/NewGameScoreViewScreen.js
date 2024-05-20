import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../assets/colors/colors';
import Header from '../components/general/Header';
import Button from '../components/general/Button';
import { AntDesign } from '@expo/vector-icons';

const PlayerRow = ({ player }) => {
    const totalPoints = (
        (player.points * 1)+ 
        (player.red_pot * 2) + 
        ((player.match_stt == 'won' ? 1 : 0) * 3) + 
        (player.special_points * 1) + 
        (player.minus_points * -1) + 
        (player.foul * -2)
    );

    return (
        <View style={styles.rowStyles}>
            <View style={styles.tableBodyStyles}>
                <View>
                    <Image style={styles.playerImageStyles} source={{uri: `data:image/png;base64,${player.image}`}} />
                    {player.match_stt === 'won' && (
                        <View style={styles.trophyStyles}>
                            <AntDesign name="Trophy" size={14} color={colors.gold} />
                        </View>
                    )}
                </View>
                <Text style={styles.tableBodyTextStyles}>{player.name}</Text>
            </View>
            <Text style={styles.tableBodyTextStyles}>{totalPoints.toFixed(2)}</Text>
        </View>
    );
};

const NewGameScoreViewScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { matchDataSent } = route.params;

    const matchData = JSON.parse(matchDataSent)

    const calculateScore = (player) => {
        return (
            player.points * 1 +
            player.red_pot * 2 +
            (player.match_stt === 'won' ? 1 : 0) * 3 +
            (player.special_points || 0) * 1 +
            (player.minus_points || 0) * -1 +
            (player.foul || 0) * -2
        );
    };

    const playersData = matchData.players.sort((a, b) => calculateScore(b) - calculateScore(a));

    const handleNewGame = () => {
        navigation.navigate('New Game');
    };

    const handleLeaderboard = () => {
        navigation.navigate('Home')
    }

    const handleMatchSingle = () => {
        navigation.navigate('Match Single', { matchData: matchData, hideDelete: true })
    }

    return (
        <View style={styles.container}>
            <View>
                <Header text={'Game Scoreboard'} />
                <View>
                    <View style={styles.rowStyles}>
                        <Text style={styles.tableHeaderTextStyles}>Player</Text>
                        <Text style={styles.tableHeaderTextStyles}>Total Points</Text>
                    </View>
                    {playersData.map((player, i) => (
                        <PlayerRow player={player} key={i} />
                    ))}
                </View>
            </View>
            <View style={styles.btnsWrapper}>
                <Button
                    bgColor={colors.bgColor}
                    content={<Text style={{color: colors.textColorPri, fontFamily: 'ms-regular'}}>Match Details</Text>}
                    bdr={colors.textColorPri}
                    func={handleMatchSingle}
                />
                <Button
                    bgColor={colors.bgColor}
                    content={<Text style={{color: colors.textColorPri, fontFamily: 'ms-regular'}}>Leaderboard</Text>}
                    bdr={colors.textColorPri}
                    func={handleLeaderboard}
                />
                <Button
                    bgColor={colors.bgColorSec}
                    content={<Text style={{color: colors.textColorSec, fontFamily: 'ms-regular'}}>New Game</Text>}
                    bdr={colors.textColorPri}
                    func={handleNewGame}
                />
            </View>
        </View>
    )
}

export default NewGameScoreViewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        paddingVertical: 15,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    tableHeaderTextStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 14,
        color: colors.textColorPri,
    },
    rowStyles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    tableBodyStyles: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerImageStyles: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
        borderWidth: 1,
        borderColor: colors.textColorPri,
    },
    tableBodyTextStyles: {
        fontSize: 16,
        fontFamily: 'ms-light',
        marginRight: 10,
        marginLeft: 10,
    },
    trophyStyles: {
        position: 'absolute',
        padding: 5,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bgColorSec,
        bottom: 0,
        right: 0,
    }
})