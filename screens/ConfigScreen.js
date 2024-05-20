import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/general/Header'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../assets/colors/colors'
import Input from '../components/general/Input'
import Button from '../components/general/Button'
import { getConfig, updateConfigLimits } from '../assets/data/config'
import LoadingScreen from './LoadingScreen'

const ConfigScreen = () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        strongLimit: null,
        weakLimit: null,
    })

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleChangeConfig = async () => {
        const { strongLimit, weakLimit } = formData;

        console.log('s', strongLimit)
    
        if (!strongLimit || !weakLimit) {
            Alert.alert('Error', 'All fields are required!');
            return;
        }
    
        // Check if strongLimit and weakLimit are numbers
        if (isNaN(strongLimit) || isNaN(weakLimit)) {
            Alert.alert('Error', 'strongLimit and weakLimit must be numbers!');
            return;
        }
    
        try {
            await updateConfigLimits(Number(strongLimit), Number(weakLimit));
            Alert.alert('Success', 'Config limits updated successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to update config limits!');
            console.error('Error updating config limits: ', error);
        }
    }

    const getData = async () => {
        try {
            let res = await getConfig();
            setFormData({
                strongLimit: res.strongLimit,
                weakLimit: res.weakLimit
            })
        } catch (error) {
            console.error('error at ConfigScreen.js -> getData')
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        getData()
    },[])

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <Header text={'Configurations'} handleGoBack={handleGoBack} />
            <View style={styles.contentContainer}>
                <View>
                    <View style={styles.formWrapper}>
                        <Text style={styles.labelTextStyles}>Strong Limit Points</Text>
                        <Input
                            keyboardType={'number-pad'}
                            value={(formData.strongLimit).toString()}
                            onChangeText={(text) => setFormData((prevData) => ({...prevData, strongLimit: text}))}
                            placeholder={'Enter Strong Limit Points'}
                        />
                    </View>
                    <View style={styles.formWrapper}>
                        <Text style={styles.labelTextStyles}>Weak Limit Points</Text>
                        <Input
                            keyboardType={'number-pad'}
                            value={(formData.weakLimit).toString()}
                            onChangeText={(text) => setFormData((prevData) => ({...prevData, weakLimit: text}))}
                            placeholder={'Enter Weak Limit Points'}
                        />
                    </View>
                </View>
                <View>
                    <Button
                        bgColor={colors.bgColorSec}
                        content={<Text style={styles.btnTextStyles}>Change</Text>}
                        func={handleChangeConfig}
                    />
                </View>
            </View>
        </View>
    )
}

export default ConfigScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: colors.bgColor,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    formWrapper: {
        marginBottom: 10,
    },
    labelTextStyles: {
        fontSize: 12,
        fontFamily: 'ms-light',
        color: colors.textColorPri,
    },
    btnTextStyles: {
        fontSize: 14,
        fontFamily: 'ms-regular',
        color: colors.textColorSec,
    },
})