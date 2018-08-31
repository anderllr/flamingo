import React from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput } from "react-native";

import styles from "./styles";

const InputWithLabel = props => {
	const { labelText, editable = true } = props;

	const containerStyles = [styles.container];
	if (editable === false) {
		containerStyles.push(styles.containerDisabled);
	}

	return (
		<View style={containerStyles}>
			<View style={styles.labelContainer}>
				<Text style={styles.labelText}>{labelText}</Text>
			</View>
			<View style={styles.border} />
			<TextInput
				style={styles.input}
				underlineColorAndroid="transparent"
				{...props}
			/>
		</View>
	);
};

InputWithLabel.propTypes = {
	onPress: PropTypes.func,
	buttonText: PropTypes.string,
	editable: PropTypes.bool,
	textColor: PropTypes.string
};

export default InputWithLabel;
