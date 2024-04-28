import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'
import { Ionicons } from '@expo/vector-icons';

const LeaderBoardCard = ({cardData, onPress}) => {
    
    let bgColor = {backgroundColor: colors.bgColorTer};
    let bottomBorder = null;
    if(cardData.place == '1'){
        bgColor = { backgroundColor: colors.bgGold };
    }else if(cardData.place == '2'){
        bgColor = { backgroundColor: colors.bgSilver };
    }else if(cardData.place == '3'){
        bgColor = { backgroundColor: colors.bgBronze };
        bottomBorder = { borderBottomColor: colors.textColorPri, borderBottomWidth: 2, marginBottom: 10 };
    }
    
    return (
        <>
            <TouchableOpacity style={[styles.container, bgColor]} onPress={() => onPress(cardData)}>
                <View style={styles.nameWrapper}>
                    <Image style={styles.imageStyles} source={{uri: cardData.image}} />
                    <Text style={styles.nameTextStyles}>{cardData.name}</Text>
                </View>
                <View style={styles.valueWrapper}>
                    <Ionicons name="disc" size={24} color={colors.gold} />
                    <Text style={styles.valueTextStyles}>{cardData.value}%</Text>
                </View>
                <View style={styles.placeTextWrapper}>
                    <Text style={styles.placeTextStyles}>{cardData.place}</Text>
                </View>
            </TouchableOpacity>
            <View style={bottomBorder}></View>
        </>
    )
}

export default LeaderBoardCard

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageStyles: {
        width: 50,
        height: 50,
        objectFit: 'cover',
        borderRadius: 8,
        backgroundColor: colors.bgColor,
    },
    nameTextStyles: {
        fontSize: 14,
        fontFamily: 'ms-regular',
        marginLeft: 15,
        color: colors.textColorPri,
    },
    placeTextWrapper: {
        backgroundColor: colors.bgColorSec,
        width: 20,
        height: 20,
        borderRadius: 5,
        position: 'absolute',
        top: 5,
        left: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeTextStyles: {
        color: colors.textColorSec,
        textAlign: 'center',
        fontSize: 10,
        fontFamily: 'ms-regular',
    },
    valueWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 90,
        justifyContent: 'space-between',
    },
    valueTextStyles: {
        marginLeft: 5,
        fontSize: 16,
        fontFamily: 'ms-semibold',
        color: colors.textColorPri,
    },
})