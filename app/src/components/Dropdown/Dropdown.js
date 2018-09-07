import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, TextInput, Text } from "react-native";
import ModalSelector from "react-native-modal-selector";

import styles from "./styles";

class Dropdown extends Component {
	static propTypes = {
		data: PropTypes.array,
		title: PropTypes.string,
		onChange: PropTypes.func,
		value: PropTypes.string
	};

	handleOption = option => {
		this.props.value = option.label;
		if (this.props.onChange) {
			this.props.onChange(option);
		}
	};

	render() {
		return (
			<View style={styles.sizeContainer}>
				<Text style={styles.text}>{this.props.title}</Text>
				<View style={styles.container}>
					<ModalSelector
						data={this.props.data}
						initValue={this.props.value}
						cancelText={"Sair"}
						onChange={option => this.handleOption(option)}
					>
						<View>
							<TextInput
								underlineColorAndroid="transparent"
								style={styles.input}
								editable={false}
								placeholder={this.props.value}
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
