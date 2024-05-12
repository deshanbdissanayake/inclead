import { FlatList, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { colors } from '../assets/colors/colors'
import Subtitle from '../components/general/Subtitle'
import LeaderBoardCard from '../components/app/LeaderBoardCard'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getMatchStats } from '../assets/data/matches'
import LoadingScreen from './LoadingScreen'
import NoData from '../components/general/NoData'

const Leaderboard = () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(true);

    const [cardData, setCardData] = useState(null);

    const getData = async () => {
        try {
            let data = await getMatchStats();
            await getLeaderboard(data);
        } catch (error) {
            console.log('error at leaderboard.js: ', error)
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    useFocusEffect(
        useCallback(()=>{
            getData()
        },[])
    )

    const getLeaderboard = async (data) => {
        let playersArr = [];
    
        data.forEach((match) => {
            match.players.forEach((player) => {
                let existingPlayerIndex = playersArr.findIndex((p) => p.id === player.id);
                if (existingPlayerIndex === -1) {
                    playersArr.push({
                        id: player.id,
                        name: player.name,
                        image: player.image,
                        total_matches: 1,
                        total_wins: player.match_stt == 'won' ? 1 : 0,
                        total_points: player.points,
                        total_minus_points: player.minus_points,
                        total_red_pots: player.red_pot ? 1 : 0,
                        total_foul: player.foul,
                    });
                } else {
                    playersArr[existingPlayerIndex].total_matches++;
                    if (player.match_stt == 'won') {
                        playersArr[existingPlayerIndex].total_wins++;
                    }
                    playersArr[existingPlayerIndex].total_points += player.points;
                    playersArr[existingPlayerIndex].total_minus_points += player.minus_points;
                    if (player.red_pot) {
                        playersArr[existingPlayerIndex].total_red_pots++;
                    }
                    playersArr[existingPlayerIndex].total_foul += player.foul;
                }
            });
        });
    
        // Calculate value and sort players
        playersArr.forEach((player) => {
            let value = ((player.total_points + (player.total_red_pots * 2) + (player.total_wins * 3) - player.total_minus_points - (player.total_foul * 2)) / (player.total_matches)).toFixed(2);
            player.value = parseFloat(value) >= 0 ? value : '0';
        });
    
        // Sort players based on value
        playersArr.sort((a, b) => b.value - a.value);
    
        // Assign place
        playersArr.forEach((player, index) => {
            player.place = index + 1;
        });
    
        setCardData(playersArr);
    };
    
    
    const onRefresh = () => {
        setRefreshing(true);
        getData();
    }

    const handlePlayerClick = (cardData) => {
        navigation.navigate('Player Single', { playerData: cardData })
    }

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <Subtitle text={'LeaderBoard'} />
            <View style={styles.leaderboardWrapper}>
                {cardData && cardData.length > 0 ? (
                    <FlatList
                        data={cardData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => <LeaderBoardCard cardData={item} onPress={handlePlayerClick} />}
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
                        <NoData text={'No Data Yet!'} />
                    </ScrollView>
                )}
            </View>
        </View>
    )
}

export default Leaderboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        padding: 15,
    },
    leaderboardWrapper: {
        flex: 1,
    },
    noDataWrapper: {
        flex: 1,
    },
})