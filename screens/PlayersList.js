import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState, useMemo, useRef } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { colors } from '../assets/colors/colors';
import Header from '../components/general/Header';
import { AntDesign } from '@expo/vector-icons';
import MiniButton from '../components/general/MiniButton';
import { getPlayers } from '../assets/data/players';
import LoadingScreen from './LoadingScreen';
import PlayerCard from '../components/app/PlayerCard';
import NoData from '../components/general/NoData';
import BottomSheet from '@gorhom/bottom-sheet';

const PlayersList = () => {
    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState(true);
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState(null);

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => [1, '60%'], []);

    const handleGoBack = () => {
        navigation.goBack();
    }

    const getData = async () => {
        try {
            let data = await getPlayers();
            setPlayers(data);
        } catch (error) {
            console.error('error at players list: ', error)
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(()=>{
            getData();
        },[])
    )

    const handleAddPlayer = () => {
        bottomSheetRef.current.expand();
    }

    const handleEditClick = () => {
        Alert.alert('Successful', 'Player Edited Successfully!')
    }

    const handleDeleteClick = (id) => {
        Alert.alert('Confirm', 'Are you sure you want to delete this player?', [
            {text: 'Cancel', style: 'cancel', onPress: () => null},
            {text: 'Delete', onPress: () => deleteFunc(id)}
        ])
    }

    const deleteFunc = async () => {
        Alert.alert('Successful', 'Player Deleted Successfully!')
    }

    const onRefresh = () => {
        getData()
    }

    if(loading){
        return <LoadingScreen />
    }

    return (
        <View style={styles.container}>
            <Header 
                text={'Players List'} 
                component={
                    <MiniButton
                        bgColor={colors.bgColorSec}
                        content={<AntDesign name="plus" size={24} color={colors.textColorSec} />}
                        func={handleAddPlayer}
                    />
                }
            />
            {
                players && players.length > 0 ? (
                    <FlatList
                        data={players}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <PlayerCard 
                                playerData={item} 
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick} 
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}   
                            />
                        }
                    />
                ) : (
                    <NoData text={'No Players Yet!'} />
                )
            }
            <BottomSheet 
                ref={bottomSheetRef} 
                index={0} 
                snapPoints={snapPoints} 
                backgroundStyle={{backgroundColor: colors.bgColorSec}}
                handleIndicatorStyle={{backgroundColor: colors.textColorSec}}
            >
                <View style={styles.contentContainer}>
                
                </View>
            </BottomSheet>
        </View>
    )
}

export default PlayersList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.bgColor,
    },
})