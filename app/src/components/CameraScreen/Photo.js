import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Icon } from "../Icon";
import { scale } from "react-native-size-matters";
import EStyleSheet from "react-native-extended-stylesheet";
import { FileSystem } from "expo";

const pictureSize = 150;

export default class Photo extends Component {
	state = {
		source: null
	};
	_mounted = false;

	componentDidMount() {
		this._mounted = true;
	}

	async componentWillUnmount() {
		this._mounted = false;
	}

	async componentWillMount() {
		const path = `${FileSystem.documentDirectory}flamingo/${
			this.props.fileName
		}.jpeg`;
		const image = await FileSystem.getInfoAsync(path);
		if (image.exists) {
			this.setState({
				source: {
					uri: image.uri
				}
			});
		}
	}

	render() {
		return (
			<View style={styles.pictureWrapper}>
				{!this.props.hasPermission ? (
					<Icon
						name="ban"
						size={scale(20)}
						color={EStyleSheet.value("$lightGray")}
						type="fa"
					/>
				) : this.state.source ? (
					<Image style={styles.picture} source={this.state.source} />
				) : (
					<Icon
						name="camera"
						size={scale(20)}
						color={EStyleSheet.value("$lightGray")}
						type="ion"
					/>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	picture: {
		position: "absolute",
		bottom: 0,
		right: 0,
		left: 0,
		top: 0,
		resizeMode: "contain"
	},
	pictureWrapper: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		margin: 5
	}
});
