import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, TextInput, Text } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { scale, verticalScale } from "react-native-size-matters";

import styles from "./styles";

class Dropdown extends Component {
	static propTypes = {
		data: PropTypes.array,
		title: PropTypes.string,
		onChange: PropTypes.func,
		value: PropTypes.string,
		editable: PropTypes.bool,
		size: PropTypes.number,
		sizeP: PropTypes.string,
		style: PropTypes.object,
		height: PropTypes.number,
		placeholder: PropTypes.string
	};

	handleOption = option => {
		this.props.value = option.label;
		if (this.props.onChange) {
			this.props.onChange(option);
		}
	};

	render() {
		const { editable = true, size, sizeP, style = null, height } = this.props;

		const containerStyle = [styles.sizeContainer];
		const inputContainer = [styles.inputContainer];
		const inputText = [styles.inputText];

		if (size) {
			containerStyle.push({ width: scale(size) });
		}

		if (sizeP) {
			containerStyle.push({ width: sizeP });
		}

		if (style) {
			containerStyle.push(style);
		}

		if (!editable) {
			inputContainer.push({ backgroundColor: "#ddd" });
		}

		if (!height) {
			inputContainer.push({ height: verticalScale(height) });
			inputText.push({ fontSize: scale(height / 4) });
		}

		return (
			<View style={containerStyle}>
				<Text style={styles.titleText}>{this.props.title}</Text>
				<View style={inputContainer}>
					<ModalSelector
						data={this.props.data}
						initValue={this.props.value}
						cancelText={"Sair"}
						onChange={option => this.handleOption(option)}
					>
						<View>
							<TextInput
								underlineColorAndroid="transparent"
								style={inputText}
								editable={this.props.editable}
								placeholder="Selecione o cliente"
								{...this.props}
							/>
						</View>
					</ModalSelector>
				</View>
			</View>
		);
	}
}

export default Dropdown;
