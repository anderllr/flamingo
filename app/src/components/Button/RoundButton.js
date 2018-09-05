import React from "react";
import PropTypes from "prop-types";
import { TouchableHighlight, View, Text } from "react-native";
import { scale } from "react-native-size-matters";

import { Icon } from "../Icon";
import styles from "./styles";

const RoundButton = props => {
	const { width, height, fontSize, color, active = true, icon = null } = props;

	const containerStyle = [styles.container];
	const textStyle = [styles.text];

	let sizeIcon = 0;
	let colorIcon = "#fff";

	if (icon) {
		sizeIcon = height ? scale(height - 20) : scale(10);
		//Put margin on text
		textStyle.push({ marginLeft: scale(10) });
	}

	if (height) {
		containerStyle.push({ height: scale(height) });
	}

	if (width) {
		containerStyle.push({ width: scale(width) });
	}

	if (color) {
		containerStyle.push({ backgroundColor: color });
	}

	if (fontSize) {
		textStyle.push({ fontSize: scale(fontSize) });
	}

	if (!active) {
		containerStyle.push(styles.inactiveButton);
		colorIcon = "#5b6969";
		textStyle.push(styles.inactiveText);
	}

	return (
		<TouchableHighlight style={containerStyle} onPress={props.onPress}>
			<View style={styles.wrapper}>
				{icon && <Icon name={icon} color={colorIcon} size={sizeIcon} />}
				<Text style={textStyle}>{props.text}</Text>
			</View>
		</TouchableHighlight>
	);
};
RoundButton.propTypes = {
	text: PropTypes.string,
	onPress: PropTypes.func,
	width: PropTypes.number,
	fontSize: PropTypes.number,
	color: PropTypes.string,
	active: PropTypes.bool,
	height: PropTypes.number,
	icon: PropTypes.string
};

export default RoundButton;
