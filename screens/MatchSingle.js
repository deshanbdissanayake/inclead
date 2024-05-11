import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react'
import Header from '../components/general/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../assets/colors/colors'
import { AntDesign } from '@expo/vector-icons';

const MatchSingle = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { matchData } = route.params;

    const teamData = {
        white: matchData.players.filter(player => player.team === 'white'),
        black: matchData.players.filter(player => player.team === 'black')
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const renderTeam = (team) => {
        return (
            <View style={styles.teamWrapper}>
                <View style={styles.teamTitleWrapper}>
                    <Text style={styles.teamTitleTextStyles}>{team === 'white' ? 'White' : 'Black'}</Text>
                    {teamData[team][0].match_stt === 'won' && (
                        <>
                            <Text style={styles.wonTextStyles}> - Winners</Text>
                            <View style={styles.trophyStyles}>
                                <AntDesign name="Trophy" size={14} color={colors.gold} />
                            </View>
                        </>
                    )}
                </View>

                <View style={styles.teamPlayersWrapper}>
                    {teamData[team].map((player, i) => (
                        <View style={styles.playerDataWrapper} key={i}>
                            <View style={styles.playerWrapper}>
                                <Image style={styles.playerImageStyles} source={{uri: `data:image/png;base64,${player.image}`}} />
                                <Text style={styles.playerNameStyles}>{player.name}</Text>
                            </View>
                            <View style={styles.summaryWrapper}>
                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleTextStyles}>Plus Points</Text>
                                    <Text style={styles.dataTextStyles}>{player.points}</Text>
                                </View>
                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleTextStyles}>Red Pot</Text>
                                    <Text style={styles.dataTextStyles}>{player.red_pot}</Text>
                                </View>
                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleTextStyles}>Minus Points</Text>
                                    <Text style={styles.dataTextStyles}>{player.minus_points}</Text>
                                </View>
                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleTextStyles}>Foul</Text>
                                    <Text style={styles.dataTextStyles}>{player.foul}</Text>
                                </View>
                                <View style={[styles.rowWrapper, styles.totalBgWrapper]}>
                                    <Text style={styles.titleTextStyles}>Total Score</Text>
                                    <Text style={styles.dataTextStyles}>{(player.points) + (player.red_pot * 2) + ((player.match_stt === 'won' ? 1 : 0) * 3 ) - (player.minus_points) - (player.foul * 2)}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Header text={matchData.dateTime} handleGoBack={handleGoBack} />
            <ScrollView 
                contentContainerStyle={styles.teamsWrapper}
                showsVerticalScrollIndicator={false}
            >
                {renderTeam('white')}
                {renderTeam('black')}
            </ScrollView>
        </View>
    );
};


export default MatchSingle

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    teamsWrapper: {
        flexGrow: 1,
    },
    teamWrapper: {
        backgroundColor: colors.bgColorTer,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    teamTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 5,
    },
    teamTitleTextStyles: {
        fontSize: 16,
        fontFamily: 'ms-semibold',
        color: colors.textColorPri,
    },
    wonTextStyles: {
        fontSize: 16,
        fontFamily: 'ms-semibold',
        color: colors.success,
        marginRight: 10,
    },
    trophyStyles: {
        backgroundColor: colors.bgColorSec,
        borderRadius: 50,
        padding: 5,
    },
    teamPlayersWrapper: {},
    playerDataWrapper: {
        backgroundColor: colors.bgColor,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    playerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    playerImageStyles: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 50,
        marginRight: 15,
    },
    playerNameStyles: {
        fontSize: 14,
        fontFamily: 'ms-semibold',
        color: colors.textColorPri,
    },
    summaryWrapper: {
        borderBottomWidth: 2,
        borderBottomColor: colors.border,
    },
    rowWrapper: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent:'space-between',
    },
    titleTextStyles: {
        fontSize: 14,
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
    },
    dataTextStyles: {
        fontSize: 14,
        fontFamily: 'ms-semibold',
        color: colors.textColorPri,
    },
    totalBgWrapper: {
        backgroundColor: colors.bgBronze,
    },
})