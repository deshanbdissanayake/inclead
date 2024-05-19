import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../components/general/Header'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { colors } from '../assets/colors/colors'
import LoadingScreen from './LoadingScreen'
import NoData from '../components/general/NoData'
import { AntDesign } from '@expo/vector-icons'
import { getMatchStats } from '../assets/data/matches'
import { getPlayers } from '../assets/data/players'
import { formatDateToObject } from '../assets/data/common'

const MatchCard = React.memo(({ matchData, handleMatchCardClick }) => {

    return (
        <TouchableOpacity style={styles.cardWrapper} onPress={() => handleMatchCardClick(matchData.id)}>
            <View style={styles.cardDateTimeTextWrapper}>
                <Text style={styles.cardDateTimeTextStyles}>{matchData.createdAt.toString()}</Text>
                <Text style={styles.cardDateTimeTextStyles}>Time: {matchData.matchTime} mins</Text>
            </View>

            <View style={styles.cardPlayerDataWrapper}>
                <View style={styles.cardItemWrapper}>
                    <Text style={styles.cardTitleTextStyles}>White</Text>
                    <View style={styles.cardPlayersWrapper}>
                        {matchData.players.map((player, i)=> player.team == 'white' && (
                            <View key={i}>
                                <Image style={styles.cardImageStyles} source={{uri: `data:image/png;base64,${player.image}`}} />
                                {player.match_stt == 'won' && (
                                    <View style={styles.trophyWrapper}>
                                        <AntDesign name="Trophy" size={10} color={colors.gold} />
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.cardVsTextWrapper}>
                    <Text style={styles.cardVsTextStyles}>vs</Text>
                </View>
                <View style={styles.cardItemWrapper}>
                    <Text style={styles.cardTitleTextStyles}>Black</Text>
                    <View style={styles.cardPlayersWrapper}>
                        {matchData.players.map((player, i)=> player.team == 'black' && (
                            <View key={i}>
                                <Image style={styles.cardImageStyles} source={{uri: `data:image/png;base64,${player.image}`}} />
                                {player.match_stt == 'won' && (
                                    <View style={styles.trophyWrapper}>
                                        <AntDesign name="Trophy" size={10} color={colors.gold} />
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
});

const MatchList = () => {
    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [matches, setMatches] = useState(null);
    const [totalMatchTime, setTotalMatchTime] = useState(0)

    const getData = async () => {
        try {
            let matchesData = await getMatchStats('matches');
            let playersData = await getPlayers('players');
            
            let totTime = 0;
            // Mapping through matchesData and updating with players' details
            let res = matchesData.map((match) => {
                const startedAtDate = formatDateToObject(match.startedAt);
                const endedAtDate = formatDateToObject(match.endedAt);
                
                // Calculate the time difference in milliseconds
                const timeDifference = endedAtDate - startedAtDate;
                const minutesDifference = Math.floor(timeDifference / (1000 * 60));
                
                totTime += minutesDifference;
                // Update match object with matchTime and updated players data
                return {
                    ...match,
                    matchTime: minutesDifference,
                    players: match.players.map((player) => {
                        let foundPlayer = playersData.find(p => p.id === player.id);
                        return {
                            ...player,
                            name: foundPlayer ? foundPlayer.name : player.name,
                            image: foundPlayer ? foundPlayer.image : player.image
                        };
                    })
                };
            });

            setMatches(res);
            setTotalMatchTime(totTime);
        } catch (error) {
            console.error('error at getting matches match list: ', error)
        } finally {
            setLoading(false)
            setRefreshing(false);
        }
    }

    const handleMatchCardClick = useCallback((id) => {
        let matchData = matches.find(m => m.id === id);
        navigation.navigate('Match Single', { matchData });
    }, [matches]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getData();
    }, []);

    useFocusEffect(
        useCallback(()=>{
            getData()
        },[])
    )

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <Header 
                text={'Match List'}
                component={
                    <View style={styles.matchCountTextWrapper}>
                        <Text style={styles.matchCountTextStyles}>{matches.length} matches</Text>
                        <Text style={styles.matchCountTextStyles}>{totalMatchTime} mins</Text>
                    </View>
                }    
            />
            {matches && matches.length > 0 ? (
                <FlatList
                    data={matches}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <MatchCard matchData={item} handleMatchCardClick={handleMatchCardClick} />}
                    getItemLayout={(data, index) => ({
                        length: 100, // Assuming height of each item is 100
                        offset: 100 * index,
                        index,
                    })}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}   
                        />
                    }
                />
            ) : (
                <ScrollView 
                    contentContainerStyle={styles.noDataWrapper}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}   
                        />
                    }
                >
                    <NoData text={'No matches yet!'} />
                </ScrollView>
            )}
        </View>
    )
}

export default MatchList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    cardWrapper: {
        backgroundColor: colors.bgColorTer,
        marginBottom: 5,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    cardDateTimeTextWrapper: {
        backgroundColor: colors.bgColor,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginBottom: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    cardDateTimeTextStyles: {
        fontSize: 14,
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
    },
    cardPlayerDataWrapper: {
        flexDirection: 'row',
    },
    cardItemWrapper: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardVsTextWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitleTextStyles: {
        fontSize: 12,
        fontFamily: 'ms-light',
        color: colors.textColorPri,
        marginBottom: 5,
    },
    cardPlayersWrapper: {
        flexDirection: 'row',
    },
    cardImageStyles: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 50,
        marginHorizontal: 5,
    },
    cardVsTextStyles: {
        fontSize: 18,
        fontFamily: 'ms-semibold',
        color: colors.textColorPri,
    },
    trophyWrapper: {
        position: 'absolute',
        right: -5,
        bottom: -2,
        padding: 5,
        backgroundColor: colors.bgColorSec,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataWrapper: {
        flex: 1,
    },
    matchCountTextStyles: {
        fontSize: 12,
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
        textAlign: 'right',
    },
})