import React, { Component } from "react";
import PropTypes from "prop-types";
import { moderateScale, verticalScale } from "react-native-size-matters";

import { View, TextInput, Text } from "react-native";

import styles from "./styles";

const InputWithTitle = props => {
	const {
		title,
		editable = true,
		changeColor = true,
		size,
		sizeP,
		keyboardType,
		style = null,
		height = null,
		visible = true,
		numberOfLines
	} = props;

	const containerStyle = [styles.sizeContainer];
	const inputContainer = [styles.inputContainer];
	const inputText = [styles.inputText];

	if (size) {
		containerStyle.push({ width: moderateScale(props.size) });
	}

	if (sizeP) {
		containerStyle.push({ width: props.sizeP });
	}

	if (style) {
		containerStyle.push(style);
	}

	if (!editable && changeColor) {
		inputContainer.push({ backgroundColor: "#ddd" });
	}

	if (height) {
		inputContainer.push({ height: verticalScale(height) });
		inputText.push({ fontSize: moderateScale(height / 2.5) });
	}
	if (!visible) return <View />;
	return (
		<View style={containerStyle}>
			<Text style={styles.titleText}>{title}</Text>
			<View style={inputContainer}>
				<TextInput
					{...props}
					underlineColorAndroid="transparent"
					style={inputText}
					editable={editable}
					pointerEvents={editable ? "auto" : "none"}
					keyboardType={keyboardType}
				/>
			</View>
		</View>
	);
};

InputWithTitle.propTypes = {
	title: PropTypes.string,
	editable: PropTypes.bool,
	size: PropTypes.number,
	sizeP: PropTypes.string,
	keyboardType: PropTypes.string,
	style: PropTypes.object,
	height: PropTypes.number,
	changeColor: PropTypes.bool,
	visible: PropTypes.bool,
	numberOfLines: PropTypes.number
};

export default InputWithTitle;
