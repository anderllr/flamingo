import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, Keyboard, Animated, Platform } from "react-native";

import styles from "./styles";

const ANIMATION_DURATION = 250;

class Logo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			containerImageWidth: new Animated.Value(styles.$largeContainerSize),
			imageWidth: new Animated.Value(styles.$largeImageSize),
			fontApp: new Animated.Value(styles.$largeFontSizeA),
			fontTitle: new Animated.Value(styles.$largeFontSizeT),
			hideLogo: false
		};
	}

	componentDidMount() {
		const name = Platform.OS === "ios" ? "Will" : "Did";
		this.keyboardDidShowListener = Keyboard.addListener(
			`keyboard${name}Show`,
			this.keyboardWillShow
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			`keyboard${name}Hide`,
			this.keyboardWillHide
		);
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	keyboardWillShow = () => {
		this.setState({ hideLogo: true });
	};

	keyboardWillHide = () => {
		this.setState({ hideLogo: false });
	};

	render() {
		const imageStyles = [styles.logo, { width: this.state.imageWidth }];
		const textApp = [
			styles.text,
			styles.textApp,
			{ fontSize: this.state.fontApp }
		];
		const textTitle = [
			styles.text,
			styles.textTitle,
			{ fontSize: this.state.fontTitle }
		];

		const containerImageStyles = [
			styles.containerImage,
			{
				width: this.state.containerImageWidth,
				height: this.state.containerImageWidth
			}
		];

		if (this.state.hideLogo) return <View />;

		return (
			<View>
				<Animated.View style={styles.containerText}>
					<Animated.View style={containerImageStyles}>
						<Animated.Image
							resizeMode="contain"
							style={imageStyles}
							source={require("../../assets/flamingo_logo.png")}
						/>
					</Animated.View>
					<Animated.View style={styles.containerText}>
						<Animated.Text style={textApp}>Bem vindo ao APP</Animated.Text>
						<Animated.Text style={textTitle}>
							Flamingo para vistorias
						</Animated.Text>
					</Animated.View>
				</Animated.View>
			</View>
		);
	}
}

export default Logo;
