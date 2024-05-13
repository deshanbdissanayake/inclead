import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState, useMemo, useRef } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { colors } from '../assets/colors/colors';
import Header from '../components/general/Header';
import { AntDesign } from '@expo/vector-icons';
import MiniButton from '../components/general/MiniButton';
import { deletePlayer, getPlayers, savePlayer } from '../assets/data/players';
import LoadingScreen from './LoadingScreen';
import PlayerCard from '../components/app/PlayerCard';
import NoData from '../components/general/NoData';
import BottomSheet from '@gorhom/bottom-sheet';
import Input from '../components/general/Input';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/general/Button';

const PlayersList = () => {
    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        image: '',
        status: 'active',
    })

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => [1, '60%'], []);

    const handleGoBack = () => {
        navigation.goBack();
    }

    const getData = async () => {
        try {
            let res = await getPlayers();
            setPlayers(res);
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
        resetFunc()
        bottomSheetRef.current.expand();
    }

    const handleEditClick = (id) => {
        let playerData = players.find((player) => player.id == id)
        setFormData({
            id: id,
            name: playerData.name,
            image: playerData.image,
            status: 'active',
        });
        bottomSheetRef.current.expand();
    }

    const handleDeleteClick = (id) => {
        Alert.alert('Confirm', 'Are you sure you want to delete this player?', [
            {text: 'Cancel', style: 'cancel', onPress: () => null},
            {text: 'Delete', onPress: () => deleteFunc(id)}
        ])
    }

    const deleteFunc = async (id) => {
        try {
            let res = await deletePlayer(id)
            if(res.stt == 'success'){
                bottomSheetRef.current?.close()
                resetFunc()
                getData();
                Alert.alert('Success', res.msg)
            }else{
                Alert.alert('Error', res.msg)
            }
        } catch (error) {
            console.error('error at playerlist delete player: ', error)
        } 
    }

    const onRefresh = () => {
        getData()
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true, 
        });

        if (!result.canceled) {
            setFormData((prevData) => ({ ...prevData, image: result.assets[0].base64 }));
        }
    };

    const handleResetClick = () => {
        Alert.alert('Confirm', 'Are you sure you want to reset form?', [
            {text: 'cancel', onPress: () => null, style: 'cancel'},
            {text: 'Reset', onPress: () => resetFunc()}
        ])
    };

    const resetFunc = () => {
        setFormData({
            id: null,
            name: '',
            image: '',
            status: 'active',
        });
    }

    const handleSubmitClick = async () => {
        setBtnLoading(true);
        try {
            let res = await savePlayer(formData);
            if(res.stt == 'success'){
                bottomSheetRef.current?.close()
                resetFunc()
                getData()
                Alert.alert('Successful', res.msg)
            }else{
                Alert.alert('Error', res.msg)
            }
        } catch (error) {
            console.error('error at players list submit: ', error)
        } finally {
            setBtnLoading(false)
        }
    }

    if(loading){
        return <LoadingScreen />
    }

    return (
        <View style={styles.container}>
            <Header 
                text={'Players List'} 
                handleGoBack={handleGoBack}
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
                    <Text style={styles.formTitleTextStyles}>{!formData.id ? 'Add Player' : 'Edit Player'}</Text>
                    <View style={styles.formGroupWrapper}>
                        <Text style={styles.labelTextStyles}>Player Name</Text>
                        <Input
                            value={formData.name}
                            keyboardType={'default'}
                            onChangeText={(text) => setFormData(prevData => ({...prevData, name: text}))}
                            placeholder={'Enter Player Name'}
                        />
                    </View>
                    <View style={styles.formGroupWrapper}>
                        <Text style={styles.labelTextStyles}>Player Image</Text>
                        <TouchableOpacity style={styles.imageSelectWrapper} onPress={pickImage}>
                            {formData.image ? (
                                <Image style={styles.imageStyles} source={{uri: `data:image/png;base64,${formData.image}`}} />
                            ) : (
                                <AntDesign name="picture" size={50} color={colors.textColorPri} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnSetWrapper}>
                        <View style={styles.btnWrapper}>
                            <Button
                                bgColor={colors.bgColor}
                                bdr={colors.bgColorSec}
                                content={<Text style={{color: colors.textColorPri, fontFamily: 'ms-regular'}}>Reset</Text>}
                                func={handleResetClick}
                            />
                        </View>
                        <View style={styles.btnWrapper}>
                            <Button
                                bgColor={colors.bgColorSec}
                                bdr={colors.bgColorSec}
                                content={<Text style={{color: colors.textColorSec, fontFamily: 'ms-regular'}}>{!formData.id ? 'Add' : 'Edit'}</Text>}
                                func={handleSubmitClick}
                                loading={btnLoading}
                                loaderIconColor={colors.textColorSec}
                            />
                        </View>
                    </View>
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
    formTitleTextStyles: {
        fontSize: 16,
        fontFamily: 'ms-semibold',
        color: colors.textColorPri,
        marginTop: 20,
    },
    formGroupWrapper: {
        marginHorizontal: 20,
        marginTop: 15,
        width: '90%',
    },
    labelTextStyles: {
        fontSize: 12,
        fontFamily: 'ms-light',
        color: colors.textColorPri,
        marginLeft: 2,
        marginBottom: 5,
    },
    imageSelectWrapper: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyles: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
    },
    btnSetWrapper: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },
    btnWrapper: {
        width: '49.5%',
        marginHorizontal: 2,
    },
})