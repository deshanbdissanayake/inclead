import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'
import { Ionicons } from '@expo/vector-icons';

const LeaderBoardCard = ({cardData}) => {
    return (
        <View style={styles.container}>
            <View style={styles.nameWrapper}>
                <Image style={styles.imageStyles} source={{uri: cardData.image}} />
                <Text style={styles.nameTextStyles}>{cardData.name}</Text>
            </View>
            <View style={styles.valueWrapper}>
                <Ionicons name="disc" size={24} color={colors.gold} />
                <Text style={styles.valueTextStyles}>{cardData.value}</Text>
            </View>
            <View style={styles.placeTextWrapper}>
                <Text style={styles.placeTextStyles}>{cardData.place}</Text>
            </View>
        </View>
    )
}

export default LeaderBoardCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgColorTer,
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
        width: 70,
        justifyContent: 'space-between',
    },
    valueTextStyles: {
        marginLeft: 5,
        fontSize: 16,
        fontFamily: 'ms-semibold',
        color: colors.textColorPri,
    },
})