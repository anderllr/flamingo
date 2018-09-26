import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { FileSystem } from "expo";

import { BASE_URL, PORT } from "../../utils/consts";

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
		const URL = PORT > 0 ? `${BASE_URL}:${PORT}` : BASE_URL;
		const name = this.props.imageName;
		const uri = this.props.imageUrl !== "" ? `${URL}/${name}` : "";

		const path = `${FileSystem.documentDirectory}flamingo/${name}`;
		const image = await FileSystem.getInfoAsync(path);
		if (image.exists) {
			this.setState({
				source: {
					uri: image.uri
				}
			});
			return;
		}

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
