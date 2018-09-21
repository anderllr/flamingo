import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import shorthash from "shorthash";
import { FileSystem } from "expo";

//Componente que verificará se a imagem existe no diretório
// Se não existir irá fazer o download

export default class CachedImage extends Component {
	static propTypes = {
		imageUrl: PropTypes.string
	};

	state = {
		source: null
	};

	componentDidMount = async () => {
		const uri =
			this.props.imageUrl !== ""
				? `http://192.168.1.109:3002/${this.props.imageUrl}`
				: "";

		const name = shorthash.unique(uri);
		const path = `${FileSystem.documentDirectory}flamingo/${name}`;
		const image = await FileSystem.getInfoAsync(path);
		if (image.exists) {
			//			console.log("read image from cache");
			this.setState({
				source: {
					uri: image.uri
				}
			});
			return;
		}

		//		console.log("downloading image to cache");
		const newImage = await FileSystem.downloadAsync(uri, path);
		this.setState({
			source: {
				uri: newImage.uri
			}
		});
	};

	render() {
		return <Image {...this.props} source={this.state.source} />;
	}
}
