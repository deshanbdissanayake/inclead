import { FlatList, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { colors } from '../assets/colors/colors'
import Subtitle from '../components/general/Subtitle'
import LeaderBoardCard from '../components/app/LeaderBoardCard'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getMatchStats } from '../assets/data/matches'
import LoadingScreen from './LoadingScreen'
import NoData from '../components/general/NoData'
import { getPlayers } from '../assets/data/players'

const Leaderboard = () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(true);

    const [cardData, setCardData] = useState([]);

    const getData = async () => {
        try {
            let matchesData = await getMatchStats();
            let playersData = await getPlayers();
            
            await getLeaderboard(matchesData, playersData);
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

    const getLeaderboard = async (matchesData, playersData) => {
        let playersArr = [];
    
        matchesData.forEach((match) => {
            match.players.forEach((player) => {
                let playerData = playersData.find(p => p.id === player.id);
                let existingPlayerIndex = playersArr.findIndex((p) => p.id === player.id);
                if (existingPlayerIndex === -1) {
                    playersArr.push({
                        id: player.id,
                        name: playerData.name,
                        image: playerData.image,
                        total_matches: 1,
                        total_wins: player.match_stt === 'won' ? 1 : 0,
                        total_plus_points: parseFloat(player.points) ?? 0,
                        total_minus_points: parseFloat(player.minus_points) ?? 0,
                        total_red_pots: parseFloat(player.red_pot) ? 1 : 0,
                        total_foul: parseFloat(player.foul) ?? 0,
                        total_special: parseFloat(player.special_points) ?? 0
                    });
                } else {
                    playersArr[existingPlayerIndex].total_matches++;
                    if (player.match_stt == 'won') {
                        playersArr[existingPlayerIndex].total_wins++;
                    }
                    playersArr[existingPlayerIndex].total_plus_points += parseFloat(player.points) ?? 0;
                    playersArr[existingPlayerIndex].total_minus_points += parseFloat(player.minus_points) ?? 0;
                    if (player.red_pot) {
                        playersArr[existingPlayerIndex].total_red_pots++;
                    }
                    playersArr[existingPlayerIndex].total_foul += parseFloat(player.foul) ?? 0;
                    playersArr[existingPlayerIndex].total_special += parseFloat(player.special_points) ?? 0;
                }
            });
        });
    
        // Calculate value and sort players
        playersArr.forEach((player) => {

            let totalPoints = ((player.total_plus_points * 1) + (player.total_red_pots * 2) + (player.total_wins * 3) + (player.total_special * 1) + (player.total_minus_points * -1) + (player.total_foul * -2));

            let value = (totalPoints / player.total_matches).toFixed(2);
            
            player.total_points = parseFloat(totalPoints).toFixed(2);
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