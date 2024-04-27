import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { colors } from '../assets/colors/colors'
import Subtitle from '../components/general/Subtitle'
import LeaderBoardCard from '../components/app/LeaderBoardCard'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getMatchStats } from '../assets/data/matches'
import LoadingScreen from './LoadingScreen'
import NoData from '../components/general/NoData'
import { Feather } from '@expo/vector-icons';

const Leaderboard = () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [matchStats, setMatchStats] = useState(null);
    const [refreshing, setRefreshing] = useState(true);

    const cardData = [
        {
            id: '1',
            name: 'Chanuki',
            image: 'https://drive.usercontent.google.com/download?id=1h5FRUM-7tt9zfGxxrjVOitOJZTCpZiw0',
            value: '75%',
            place: '01',
        },
        {
            id: '2',
            name: 'Chanuki',
            image: 'https://drive.usercontent.google.com/download?id=1h5FRUM-7tt9zfGxxrjVOitOJZTCpZiw0',
            value: '75%',
            place: '01',
        },
        {
            id: '3',
            name: 'Chanuki',
            image: 'https://drive.usercontent.google.com/download?id=1h5FRUM-7tt9zfGxxrjVOitOJZTCpZiw0',
            value: '75%',
            place: '01',
        },
        {
            id: '4',
            name: 'Chanuki',
            image: 'https://drive.usercontent.google.com/download?id=1h5FRUM-7tt9zfGxxrjVOitOJZTCpZiw0',
            value: '75%',
            place: '01',
        },
        {
            id: '5',
            name: 'Chanuki',
            image: 'https://drive.usercontent.google.com/download?id=1h5FRUM-7tt9zfGxxrjVOitOJZTCpZiw0',
            value: '75%',
            place: '01',
        },
        {
            id: '6',
            name: 'Chanuki',
            image: 'https://drive.usercontent.google.com/download?id=1h5FRUM-7tt9zfGxxrjVOitOJZTCpZiw0',
            value: '75%',
            place: '01',
        },
        {
            id: '7',
            name: 'Chanuki',
            image: 'https://drive.usercontent.google.com/download?id=1h5FRUM-7tt9zfGxxrjVOitOJZTCpZiw0',
            value: '75%',
            place: '01',
        },
        {
            id: '8',
            name: 'Chanuki',
            image: 'https://drive.usercontent.google.com/download?id=1h5FRUM-7tt9zfGxxrjVOitOJZTCpZiw0',
            value: '75%',
            place: '01',
        },
        {
            id: '9',
            name: 'Chanuki',
            image: 'https://drive.usercontent.google.com/download?id=1h5FRUM-7tt9zfGxxrjVOitOJZTCpZiw0',
            value: '75%',
            place: '01',
        },
        {
            id: '10',
            name: 'Chanuki',
            image: 'https://drive.usercontent.google.com/download?id=1h5FRUM-7tt9zfGxxrjVOitOJZTCpZiw0',
            value: '75%',
            place: '01',
        },
    ]

    const getData = async () => {
        try {
            let data = await getMatchStats();
            setMatchStats(data)
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

    const onRefresh = () => {
        setRefreshing(true);
        getData();
    }

    const handleNewGameClick = () => {
        navigation.navigate('New Game')
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
                        renderItem={({item}) => <LeaderBoardCard cardData={item}/>}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}   
                            />
                        }
                    />
                ) : (
                    <NoData text={'No Data Yet!'} />
                )}
            </View>
            <TouchableOpacity onPress={handleNewGameClick} style={styles.addBtnWrapper}>
                <Feather name="plus" size={40} color={colors.textColorSec} />
            </TouchableOpacity>
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
    addBtnWrapper: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        padding: 15,
        backgroundColor: colors.bgColorSec,
        borderRadius: 20,
    },
})