import React from "react";
import PropTypes from "prop-types";
import { TouchableHighlight, View, Text } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { Icon } from "../Icon";
import styles from "./styles";

const RoundButton = props => {
	const {
		width,
		widthP,
		height,
		fontSize,
		color,
		active = true,
		icon = null
	} = props;

	const containerStyle = [styles.container];
	const textStyle = [styles.text];

	let sizeIcon = 0;
	let colorIcon = "#fff";

	if (icon) {
		sizeIcon = height ? scale(height / 3) : scale(10);
		//Put margin on text
		textStyle.push({ marginLeft: scale(5) });
	}

	if (height) {
		containerStyle.push({ height: verticalScale(height) });
	}

	if (width) {
		containerStyle.push({ width: scale(width) });
	}

	if (widthP) {
		containerStyle.push({ width: `${widthP}` });
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
				{icon && (
					<Icon
						name={icon.name}
						color={colorIcon}
						size={sizeIcon}
						type={icon.type}
					/>
				)}
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
	icon: PropTypes.object,
	widthP: PropTypes.string
};

export default RoundButton;
