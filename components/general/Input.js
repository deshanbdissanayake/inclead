import { StyleSheet, TextInput, View, Pressable } from "react-native";
import React, { useRef } from "react";
import { colors } from "../../assets/colors/colors";

const Input = ({keyboardType, value, onChangeText, placeholder, secureTextEntry, icon, editable, multiline, textArea, maxLength, disabled, borderColor = colors.border, capitalize='sentences'}) => {
    const inputRef = useRef(null);

    const handleInputWrapperClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    
  
    return (
    <Pressable onPress={handleInputWrapperClick}>
        <View 
            style={[
                styles.inputWrapper, 
                textArea ? { height: 120, alignItems: 'flex-start' } : {alignItems:'center'},
                disabled && { backgroundColor: colors.disabled} ,
                {borderColor: borderColor}
            ]}
        >
            {icon}
            <TextInput
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                style={[
                    styles.inputTextStyles, 
                    disabled && { color: colors.textColorSec } 
                ]}
                editable={editable}
                multiline={multiline}
                maxLength={maxLength}
                ref={inputRef}
                autoCapitalize={capitalize}
            />
        </View>
    </Pressable>
  );
};

export default Input;

const styles = StyleSheet.create({
    inputWrapper: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        overflow: 'scroll',
    },
    inputTextStyles: {
        fontSize: 14,
        color: colors.textColorSec,
        marginLeft: 10,
        width: '100%',
    },
});