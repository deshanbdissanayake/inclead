import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import { colors } from '../../assets/colors/colors'
import { AntDesign } from '@expo/vector-icons';

const ScoreCard = ({type, player_id, value, setValue}) => {
    
    const getBorderColor = () => {
        switch (type) {
            case 'white':
                return colors.gold;
            case 'black':
                return colors.black;
            default:
                return colors.danger;
        }
    };

    const handleIncrement = () => {
        if ((type === 'red' && value < 1) || ((type === 'white' || type === 'black'))) {
            setValue(value + 1, player_id, type);
        } else {
            if (type === 'red') {
                Alert.alert('Error', 'Already Red has potted!');
            } else {
                Alert.alert('Error', 'Maximum value for white and black score is 9!');
            }
        }
    };

    const handleDecrement = () => {
        if (value > 0) {
            setValue(value - 1, player_id, type);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnStyles} onPress={handleIncrement}>
                <AntDesign name="up" size={18} color={colors.textColorPri} />
            </TouchableOpacity>
            <View style={[styles.pointsWrapper, {borderColor: getBorderColor()}]}>
                <Text style={styles.pointsTextStyles}>{value}</Text>
            </View>
            <TouchableOpacity style={styles.btnStyles} onPress={handleDecrement}>
                <AntDesign name="down" size={18} color={colors.textColorPri} />
            </TouchableOpacity>
        </View>
    );

};
    
export default ScoreCard

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    pointsWrapper: {
        width: 40,
        height: 40,
        borderWidth: 5,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    btnStyles: {
        padding: 5,
    },
    pointsTextStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 14,
        color: colors.textColorPri,
    },
})