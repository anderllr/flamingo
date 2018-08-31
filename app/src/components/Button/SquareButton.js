import React from 'react';
import PropTypes from 'prop-types';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native';

import styles from './styles';
import Icon from './Icon';



const SquareButton = ({ text, onPress, iconType }) => {  
    return (
        <TouchableOpacity style={styles.containerSquare} onPress={onPress}>
            <View style={styles.wrapper}>
                <Icon iconType={iconType} />
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    )};

SquareButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    imageName: PropTypes.string,
    handleImage: PropTypes.element
};

export default SquareButton;