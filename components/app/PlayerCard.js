import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'
import MiniButton from '../general/MiniButton'
import { FontAwesome } from '@expo/vector-icons';

const PlayerCard = ({ playerData, handleEditClick, handleDeleteClick }) => {
    return (
        <View style={styles.container}>
            <View style={styles.playerWrapper}>
                <Image style={styles.imageStyles} source={{uri: `data:image/png;base64,${playerData.image}`}} />
                <Text style={styles.nameTextStyles}>{playerData.name}</Text>
            </View>
            <View style={styles.btnWrapper}>
                <MiniButton 
                    func={() => handleEditClick(playerData.id)}
                    content={<FontAwesome name="pencil" size={20} color={colors.textColorPri} />}
                />
                <MiniButton 
                    func={() => handleDeleteClick(playerData.id)}
                    content={<FontAwesome name="trash-o" size={24} color={colors.danger} />}
                />
            </View>
        </View>
    )
}

export default PlayerCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgColorTer,
        marginBottom: 10,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    playerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageStyles: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    nameTextStyles: {
        marginLeft: 15,
        fontFamily: 'ms-regular',
    },
    btnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})