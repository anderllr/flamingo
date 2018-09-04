import React from "react";
import PropTypes from "prop-types";
import { TouchableHighlight, View, Text } from "react-native";
import { scale } from "react-native-size-matters";

import styles from "./styles";

const RoundButton = props => {
	const { size, fontSize } = props;

	const containerStyle = [styles.container];
	const textStyle = [styles.text];

	if (size) {
		containerStyle.push({ width: scale(size) });
	}

	if (size) {
		textStyle.push({ fontSize: scale(fontSize) });
	}

	return (
		<TouchableHighlight style={containerStyle} onPress={props.onPress}>
			<View style={styles.wrapper}>
				<Text style={textStyle}>{props.text}</Text>
			</View>
		</TouchableHighlight>
	);
};
RoundButton.propTypes = {
	text: PropTypes.string,
	onPress: PropTypes.func,
	size: PropTypes.number,
	fontSize: PropTypes.number
};

export default RoundButton;
