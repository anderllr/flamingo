import React, { Component, Fragment } from "react";
import { View, Text, FlatList, TouchableHighlight } from "react-native";
import { Permissions } from "expo";
import EStyleSheet from "react-native-extended-stylesheet";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { connectAlert } from "../components/Alert";

import { Container } from "../components/Container";
import { RoundButton } from "../components/Button";
import styles from "./styles";
import { createRows } from "../utils/utils";
import { Photo } from "../components/CameraScreen";

class FreteFotos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itens: [],
			hasPermission: false,
			showPhotos: true,
			showPreview: false,
			imagem: "",
			item: ""
		};
	}

	async componentWillMount() {
		const { navigation } = this.props;
		const itens = navigation.getParam("itens", {});
		const saveItens = navigation.getParam("saveItens", {});

		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		const roll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		this.setState({
			hasPermission: status === "granted" && roll.status === "granted",
			itens,
			saveItens
		});
	}

	onHandlePress = async ({ item, preview }) => {
		let showPreview = preview && this.state.imagem !== "";

		//Seleciona o item se está clicando em um diferente
		if (item && item !== this.state.item) {
			const it = [
				...this.state.itens.filter(it => {
					return it.item === item;
				})
			];

			if (it.length > 0) {
				let itens = [...this.state.itens];
				if (this.state.item !== "") {
					//se mudou o item salva o anterior
					itens = this.newItens();
				}
				const { item, imagem } = it[0];

				showPreview = imagem !== "";

				const newState = {
					...this.state,
					itens,
					item,
					showPhotos: false,
					imagem,
					showPreview
				};

				this.setState(newState);
			}
		} else {
			this.setState({ showPreview, showPhotos: false });
		}

		const fileN = `frete_${Date.now()}`;
		if (!showPreview) {
			//Busca o arquivo anterior
			const it = [
				...this.state.itens.filter(it => {
					return it.item === item;
				})
			];
			const fileAnt = item[0].imagem;
			this.props.navigation.navigate("CameraScreen", {
				fileAnt,
				fileName: fileN,
				refreshList: this.refreshList.bind(this)
			});
		}
	};

	refreshList = async imagem => {
		await this.setState({ imagem, showPhotos: true });

		let itens = [...this.state.itens];
		if (this.state.item !== "") {
			//se mudou o item salva o anterior
			itens = this.newItens();

			this.setState({ itens });
		}

		//Salva na tela anterior para não perder o state

		if (typeof this.state.saveItens === "function") {
			this.state.saveItens(itens, false);
		}
	};

	onHandleSave = async () => {
		let itens = [...this.state.itens];
		if (this.state.item !== "") {
			//se mudou o item salva o anterior
			itens = this.newItens();
			this.setState({ itens });
		}

		if (typeof this.state.saveItens === "function") {
			this.state.saveItens(itens, true);
		}

		this.props.navigation.goBack();
	};

	newItens = () => {
		const { item, imagem } = this.state;

		const ite = {
			item,
			imagem
		};
		const itens = [
			...this.state.itens.filter(it => {
				return it.item !== item;
			})
		];

		itens.push(ite);
		return itens;
	};

	newPhoto = () => {
		this.setState({ showPreview: false });
		this.onHandlePress({ item: this.state.item, preview: false });
	};

	onClosePreview = () => {
		this.setState({ showPreview: false, showPhotos: true });
	};

	returnImagem = item => {
		const itens = [
			...this.state.itens.filter(it => {
				return it.item === item;
			})
		];
		return itens[0].imagem;
	};

	renderPhoto = () => (
		<View
			style={{
				flex: 1,
				borderRadius: moderateScale(5),
				borderColor: "#ddd",
				borderWidth: moderateScale(1)
			}}
		>
			<View style={{ flex: 0.8, marginTop: verticalScale(10) }}>
				<Photo
					hasPermission={this.state.hasPermission}
					fileName={this.state.imagem}
				/>
			</View>
			<View
				style={{
					flex: 0.2,
					flexDirection: "row",
					justifyContent: "space-between",
					margin: moderateScale(10)
				}}
			>
				<RoundButton
					text="NOVA FOTO"
					size={90}
					height={30}
					fontSize={8}
					icon={{ name: "camera", type: "ion" }}
					onPress={this.newPhoto}
				/>

				<RoundButton
					text="VOLTAR"
					size={90}
					height={30}
					fontSize={8}
					onPress={this.onClosePreview}
				/>
			</View>
		</View>
	);

	renderFotos() {
		const ListItemGrupo = ({ data, onPress }) => {
			if (data.empty) {
				return <View style={[styles.groupContainer, styles.groupEmpty]} />;
			}
			return (
				<View style={styles.groupContainer}>
					<TouchableHighlight
						underlayColor={styles.$underlayColor}
						onPress={onPress}
						style={styles.pictureContainer}
						activeOpacity={1}
					>
						<View style={styles.groupItens}>
							<Photo
								hasPermission={this.state.hasPermission}
								fileName={this.returnImagem(data.item)}
							/>
						</View>
					</TouchableHighlight>
					<Text style={styles.groupText}>{data.item}</Text>
				</View>
			);
		};
		return (
			<Fragment>
				<FlatList
					data={createRows([...this.state.itens], 5)}
					keyExtractor={item => item.toString()}
					numColumns={5}
					renderItem={({ item }) => (
						<ListItemGrupo
							data={item}
							onPress={() =>
								this.onHandlePress({
									item: item.item,
									preview: true
								})
							}
						/>
					)}
				/>
				<View style={styles.separatorLine} />
				<View style={{ alignItems: "flex-end" }}>
					<RoundButton
						text="SALVAR"
						size={60}
						height={30}
						fontSize={8}
						onPress={this.onHandleSave}
					/>
				</View>
			</Fragment>
		);
	}

	render() {
		return (
			<Container backgroundColor={EStyleSheet.value("$backgroundColor")}>
				<View style={styles.screenContainer}>
					<Text style={styles.titleText}>FOTOS PARA O FRETE</Text>
					{this.state.showPreview
						? this.renderPhoto()
						: this.state.showPhotos && this.renderFotos()}
				</View>
			</Container>
		);
	}
}

export default connectAlert(FreteFotos);
