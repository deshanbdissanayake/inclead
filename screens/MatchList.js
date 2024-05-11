import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../components/general/Header'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { colors } from '../assets/colors/colors'
import { getMatchStats } from '../assets/data/matches'
import LoadingScreen from './LoadingScreen'
import NoData from '../components/general/NoData'
import { AntDesign } from '@expo/vector-icons'

const MatchCard = ({matchData, handleMatchCardClick}) => {
    return (
        <TouchableOpacity style={styles.cardWrapper} onPress={() => handleMatchCardClick(matchData)}>
            <Text style={styles.cardDateTimeTextStyles}>{matchData.dateTime.toString()}</Text>
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
}

const MatchList = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [matches, setMatches] = useState(null);

    const getData = async () => {
        try {
            let res = await getMatchStats();
            if(res && res.length > 0){
                setMatches(res)
            }
        } catch (error) {
            console.error('error at getting matches match list: ', error)
        } finally {
            setLoading(false)
            setRefreshing(false);
        }
    }

    useFocusEffect(
        useCallback(()=>{
            getData()
        },[])
    )

    const handleMatchCardClick = (matchData) => {
        navigation.navigate('Match Single', { matchData })
    }

    const onRefresh = () => {
        setRefreshing(true);
        getData();
    }

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <Header text={'Match List'} handleGoBack={handleGoBack} />
            {matches && matches.length > 0 ? (
                <FlatList
                    data={matches}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <MatchCard matchData={item} handleMatchCardClick={handleMatchCardClick} />}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}   
                        />
                    }
                />
            ) : (
                <NoData text={'No matches yet!'} />
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
    cardDateTimeTextStyles: {
        fontSize: 14,
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
        marginBottom: 5,
        textAlign: 'center',
        backgroundColor: colors.bgColor,
        paddingVertical: 2,
        borderRadius: 5,
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
    }
})