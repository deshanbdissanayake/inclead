import { Alert, FlatList, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import { colors } from '../assets/colors/colors'
import Header from '../components/general/Header'
import { useNavigation } from '@react-navigation/native'
import MiniButton from '../components/general/MiniButton'
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons'
import { deleteUser, getAllUsers, saveUser } from '../assets/data/users'
import LoadingScreen from './LoadingScreen'
import NoData from '../components/general/NoData'
import Input from '../components/general/Input'
import BottomSheet from '@gorhom/bottom-sheet';
import Select from '../components/general/Select'
import Button from '../components/general/Button'

const UserCard = ({userData, handleEditClick, handleDeleteClick}) => {
    return (
        <View style={styles.cardWrapper}>
            <View style={styles.nameTextWrapper}>
                <Text style={styles.nameTextStyles}>{userData.username}</Text>
                <Text style={styles.typeTextStyles}>({userData.usertype})</Text>
            </View>
            <View style={styles.cardBtnWrapper}>
                <MiniButton 
                    func={() => handleEditClick(userData.id)}
                    content={<FontAwesome name="pencil" size={20} color={colors.textColorPri} />}
                />
                <MiniButton 
                    func={() => handleDeleteClick(userData.id)}
                    content={<FontAwesome name="trash-o" size={24} color={colors.danger} />}
                />
            </View>
        </View>
    )
}

const UsersList = () => {
    const navigation = useNavigation();

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => [1, '60%'], []);

    const handleGoBack = () => {
        navigation.goBack()
    }

    const [refreshing, setRefreshing] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        username: null,
        password: null,
        usertype: 'normal',
    });
    const [hidePw, setHidePw] = useState(true)

    const getData = async () => {
        try {
            let res = await getAllUsers();
            setUsers(res)
        } catch (error) {
            console.error('error at users list get users: ', error)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(()=>{
        getData()
    },[])

    const handleAddUser = () => {
        resetFunc()
        bottomSheetRef.current.expand();
    }

    const handleEditClick = (id) => {
        let userData = users.find((user) => user.id == id)
        setFormData({
            id: id,
            username: userData.username,
            password: userData.password,
            usertype: userData.usertype,
        });
        bottomSheetRef.current.expand();
    }

    const handleDeleteClick = (id) => {
        Alert.alert('Confirm', 'Are you sure you want to delete this user?', [
            {text: 'Cancel', style: 'cancel', onPress: () => null},
            {text: 'Delete', onPress: () => deleteFunc(id)}
        ])
    }

    const deleteFunc = async (id) => {
        try {
            let res = await deleteUser(id)
            if(res.stt == 'success'){
                bottomSheetRef.current?.close()
                resetFunc()
                getData();
                Alert.alert('Success', res.msg)
            }else{
                Alert.alert('Error', res.msg)
            }
        } catch (error) {
            console.error('error at userslist delete user: ', error)
        } 
    }

    const resetFunc = () => {
        setFormData({
            id: null,
            username: null,
            password: null,
            usertype: 'normal',
        });
        setHidePw(true)
    }

    const handleResetClick = () => {
        resetFunc();
    }

    const handleSubmitClick = async () => {
        setBtnLoading(true);
        try {
            let res = await saveUser(formData);
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

    const onRefresh = () => {
        getData()
    }

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <Header
                text={'Users List'}
                handleGoBack={handleGoBack}
                component={
                    <MiniButton
                        bgColor={colors.bgColorSec}
                        content={<AntDesign name="plus" size={24} color={colors.textColorSec} />}
                        func={handleAddUser}
                    />
                }
            />
            {users && users.length > 0 ? (
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <UserCard 
                            userData={item} 
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
                    <NoData text={'No Users Yet!'} />
                </ScrollView>
            )}

            <BottomSheet 
                ref={bottomSheetRef} 
                index={0} 
                snapPoints={snapPoints} 
                backgroundStyle={{backgroundColor: colors.bgColorSec}}
                handleIndicatorStyle={{backgroundColor: colors.textColorSec}}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.formTitleTextStyles}>{!formData.id ? 'Add User' : 'Edit User'}</Text>
                    <View style={styles.formGroupWrapper}>
                        <Text style={styles.labelTextStyles}>User Name</Text>
                        <Input
                            value={formData.username}
                            keyboardType={'default'}
                            onChangeText={(text) => setFormData(prevData => ({...prevData, username: text}))}
                            placeholder={'Enter User Name'}
                        />
                    </View>
                    <View style={styles.formGroupWrapper}>
                        <Text style={styles.labelTextStyles}>Password</Text>
                        <Input
                            value={formData.password}
                            keyboardType={'default'}
                            onChangeText={(text) => setFormData(prevData => ({...prevData, password: text}))}
                            placeholder={'Enter Password'}
                            secureTextEntry={hidePw}
                        />
                        {(<TouchableOpacity style={styles.pwShowStyles} onPress={() => setHidePw(prevData => (!prevData))}>
                            {hidePw ? (
                                <Feather name="eye" size={24} color={colors.textColorPri} />
                            ) : (
                                <Feather name="eye-off" size={24} color={colors.textColorPri} />
                            )}
                        </TouchableOpacity>)}
                    </View>
                    <View style={styles.formGroupWrapper}>
                        <Text style={styles.labelTextStyles}>User Name</Text>
                        <Select
                            value={formData.usertype}
                            onSelect={(text) => setFormData(prevData => ({...prevData, usertype: text}))}
                            options={[{value: 'normal', label: 'Normal'}, {value: 'admin', label: 'Admin'}]}
                            placeholder={'Select User Type'}
                        />
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
                                content={<Text style={styles.btnTextStyles}>{!formData.id ? 'Add' : 'Edit'}</Text>}
                                loading={btnLoading}
                                loaderIconColor={colors.textColorSec}
                                func={handleSubmitClick}
                            />
                        </View>
                    </View>

                </View>
            </BottomSheet>
        </View>
    )
}

export default UsersList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        padding: 15,
    },
    noDataWrapper: {
        flex: 1,
    },
    cardWrapper: {
        backgroundColor: colors.bgColorTer,
        marginBottom: 10,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    nameTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    typeTextStyles: {
        marginLeft: 10,
        fontFamily: 'ms-light',
        color: colors.textColorPri,
    },
    nameTextStyles: {
        marginLeft: 15,
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
    },
    cardBtnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
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
    btnTextStyles: {
        fontFamily: 'ms-regular',
        color: colors.textColorSec,
    },
    pwShowStyles: {
        position: 'absolute',
        bottom: 12,
        right: 15,
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