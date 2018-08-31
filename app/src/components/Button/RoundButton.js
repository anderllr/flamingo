import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View, Text } from 'react-native';

import styles from './styles';

const RoundButton = ({ text, onPress }) => (
	<TouchableHighlight style={styles.container} onPress={onPress}>
		<View style={styles.wrapper}>
			<Text style={styles.text}>{text}</Text>
		</View>
	</TouchableHighlight>
);

RoundButton.propTypes = {
	text: PropTypes.string,
	onPress: PropTypes.func,
};

export default RoundButton;
