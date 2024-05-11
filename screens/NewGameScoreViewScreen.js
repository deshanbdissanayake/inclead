import { StyleSheet, Text, View, BackHandler, Alert, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../assets/colors/colors';
import Header from '../components/general/Header';
import Button from '../components/general/Button';

const PlayerRow = ({ player }) => {
    console.log('hi')
    console.log('player', player)
    return (
        <View style={styles.rowStyles}>
            <View style={styles.tableBodyStyles}>
                <Image style={styles.playerImageStyles} source={{uri: `data:image/png;base64,${player.image}`}} />
                <Text style={styles.tableBodyTextStyles}>{player.name}</Text>
            </View>
            <Text style={styles.tableBodyTextStyles}>
                {(parseInt(player.points) + (parseInt(player.red_pot) * 2)) - (parseInt(player.minus_points) + (parseInt(player.foul) * 2))}
            </Text>
        </View>
    );
};

const NewGameScoreViewScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { matchData } = route.params;

    //console.log('matchData', matchData);

    const handleNewGame = () => {
        navigation.navigate('New Game');
    };

    const handleLeaderboard = () => {
        navigation.navigate('Home')
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
        );

        return () => {
            backHandler.remove();
        };
    }, []);

    const handleBackPress = () => {
        Alert.alert('Alert', 'You cannot go back to scoring! Start a new game!')
        return true;
    };

    return (
        <View style={styles.container}>
            <View>
                <Header text={'Game Scoreboard'} />
                <View style={styles.tableStyles}>
                    <View style={styles.rowStyles}>
                        <Text style={styles.tableHeaderTextStyles}>Player</Text>
                        <Text style={styles.tableHeaderTextStyles}>Total Points</Text>
                    </View>
                    {matchData.players.map((player, i) => (
                        <PlayerRow player={player} key={i} />
                    ))}
                </View>
            </View>
            <View style={styles.btnsWrapper}>
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
    tableStyles: {

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
        fontFamily: 'ms-regular',
        marginRight: 10,
    },
})