import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Modal, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';
import { colors } from '../../assets/colors/colors';

const Select = ({ value, onSelect, placeholder, icon, options }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (value !== '' && options) {
            const selected = options.find((option) => option.value === value);
            setSelectedOption(selected);
        }
    }, [value]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setShowDropdown(false);
        onSelect(option.value);
    };

    const RenderDropdownItem = ({ item, index }) => {
        const isSelected = selectedOption === item;

        const itemStyles = [
            styles.optionStyles,
            isSelected && styles.selectedOption
        ];

        return (
            <>
                { !isSelected ? <View style={styles.optionBorderStyles}></View> : null }
                <TouchableOpacity onPress={() => handleOptionSelect(item)} style={itemStyles}>
                    <Text style={styles.optionTextStyles} numberOfLines={1}>
                        {item.label}
                    </Text>
                </TouchableOpacity>
            </>
        );
    };

    const closeModal = () => {
        setShowDropdown(false);
    };

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => setShowDropdown(true)}>
                <View style={styles.selectWrapper}>
                    <View style={styles.selectLeftWrapper}>
                        {icon}
                        <Text style={styles.selectText} numberOfLines={1}>
                            {selectedOption ? selectedOption.label : placeholder}
                        </Text>
                    </View>
                    <View style={styles.selectRightWrapper}>
                        <Entypo name={showDropdown ? "chevron-up" : "chevron-down"} size={24} color={colors.border} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <Modal 
                visible={showDropdown} 
                transparent={true} 
                animationType="fade" 
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <ScrollView>
                                    {(options !== null && options.length > 0) ?
                                        options.map((option, index)=>(
                                            <RenderDropdownItem item={option} index={index} key={index} closeModal={closeModal}/>
                                        ))
                                    : (
                                        <RenderDropdownItem item={{value: 0, label: 'No Data'}} index={0} key={0} closeModal={closeModal}/>
                                    )}
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string
};

Select.defaultProps = {
  placeholder: 'Select an option',
};

const styles = StyleSheet.create({
    selectWrapper: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectLeftWrapper: {
        flex: 11,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectRightWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectText: {
        fontSize: 14,
        color: colors.textColorPri,
        width: '100%',
        fontFamily: 'ms-regular',
    },
    dropdownContainer: {
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 5,
    },
    optionStyles: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '100%',
        justifyContent: 'center',
    },
    optionBorderStyles: {
        marginHorizontal: 10,
        justifyContent: 'center',
    },
    optionTextStyles: {
        fontSize: 14,
        color: colors.textColorPri,
        fontFamily: 'ms-regular',
    },
    selectedOption: {
        borderRadius: 5,
        backgroundColor: colors.bgColor,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        maxHeight: 400,
        backgroundColor: colors.white,
        borderRadius: 5,
    },
});

export default Select;