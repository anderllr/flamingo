import React from "react";
import PropTypes from "prop-types";
import { TouchableHighlight, View, Text } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { factorHeigth } from "../../utils/consts";

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
		icon = null,
		size,
		sizeP,
		style
	} = props;

	const containerStyle = [styles.container];
	const textStyle = [styles.text];
	const wrapper = [styles.wrapper];

	let sizeIcon = 0;
	let colorIcon = "#fff";

	if (icon) {
		sizeIcon =
			(height ? moderateScale(height / 3) : moderateScale(10)) * factorHeigth;
		//Put margin on text
		textStyle.push({ marginLeft: moderateScale(5) });

		wrapper.push({ justifyContent: "flex-start" });
	}

	if (height) {
		containerStyle.push({ height: moderateScale(height) * factorHeigth });
	}

	if (color) {
		containerStyle.push({ backgroundColor: color });
	}

	if (fontSize) {
		textStyle.push({ fontSize: moderateScale(fontSize) * factorHeigth });
	}

	if (!active) {
		containerStyle.push(styles.inactiveButton);
		colorIcon = "#5b6969";
		textStyle.push(styles.inactiveText);
	}

	if (size) {
		containerStyle.push({ width: moderateScale(props.size) });
	}

	if (sizeP) {
		containerStyle.push({ width: props.sizeP });
	}

	if (style) {
		containerStyle.push(style);
	}

	return (
		<TouchableHighlight style={containerStyle} onPress={props.onPress}>
			<View style={wrapper}>
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
	widthP: PropTypes.string,
	size: PropTypes.number,
	sizeP: PropTypes.string,
	style: PropTypes.object
};

export default RoundButton;
