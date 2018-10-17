import React, { Component, Fragment } from "react";
import { View, Text, FlatList, TouchableHighlight } from "react-native";
import { Permissions } from "expo";
import EStyleSheet from "react-native-extended-stylesheet";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { Query } from "react-apollo";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { connectAlert } from "../components/Alert";

import { GET_FROTA_ITENS_BY_GRUPO } from "../config/resources/queries/frotaQuery";

import { Container } from "../components/Container";
import { RoundButton } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { InputWithTitle } from "../components/InputText";
import styles from "./styles";
import { createRows } from "../utils/utils";
import { Photo } from "../components/CameraScreen";

class SaidaFotos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			frota: {},
			grupo: {},
			itens: [],
			conforme: "S",
			descNaoConforme: "",
			qtItem: 1,
			idItem: "",
			descItem: "",
			informaQtde: true,
			indiceConforme: 0,
			hasPermission: false,
			showPhotos: true,
			showPreview: false,
			fileName: ""
		};
	}

	async componentWillMount() {
		const { navigation } = this.props;
		const grupo = navigation.getParam("grupo", {});
		const frota = navigation.getParam("frota", {});
		const grupoitens = navigation.getParam("itens", {});
		//ajusta os itens para o mapeamento local

		const itens = grupoitens.map(({ item: label, itemId: key, ...rest }) => ({
			key,
			label,
			...rest
		}));
		const saveItens = navigation.getParam("saveItens", {});
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		const roll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		this.setState({
			hasPermission: status === "granted" && roll.status === "granted",
			grupo,
			frota,
			itens,
			saveItens
		});
	}

	handleInputChange = (field, value) => {
		//If the item change this function updates the array of itens
		const newState = {
			...this.state,
			[field]: value
		};
		this.setState(newState);
	};

	onChangeDropdown = (option, type) => {
		let itens = [...this.state.itens];
		if (this.state.idItem !== "") {
			//se mudou o item salva o anterior
			itens = this.newItens();
		}
		const {
			conforme,
			descNaoConforme,
			key,
			label,
			qtItem,
			informaQtde,
			fileName
		} = option;

		this.setState({
			idItem: key,
			descItem: label,
			conforme,
			descNaoConforme,
			qtItem,
			informaQtde,
			fileName,
			itens,
			indiceConforme: conforme === "S" ? 0 : 1
		});
	};

	onHandlePress = async ({ id, preview }) => {
		let showPreview = preview && this.state.fileName !== "";

		//Seleciona o item se está clicando em um diferente
		if (id && id !== this.state.idItem) {
			const item = [
				...this.state.itens.filter(it => {
					return it.key === id;
				})
			];

			if (item.length > 0) {
				let itens = [...this.state.itens];
				if (this.state.idItem !== "") {
					//se mudou o item salva o anterior
					itens = this.newItens();
				}
				const {
					conforme,
					descNaoConforme,
					qtItem,
					key,
					label,
					informaQtde,
					fileName
				} = item[0];

				showPreview = fileName !== "";

				const newState = {
					...this.state,
					itens,
					conforme,
					descNaoConforme,
					qtItem,
					idItem: key,
					descItem: label,
					informaQtde,
					indiceConforme: conforme === "S" ? 0 : 1,
					showPhotos: false,
					fileName,
					showPreview
				};
				this.setState(newState);
			}
		} else {
			this.setState({ showPreview, showPhotos: false });
		}

		const fileN = `vistoriasaida_${this.state.frota.id}_${Date.now()}`;
		if (!showPreview) {
			//Busca o arquivo anterior
			const item = [
				...this.state.itens.filter(it => {
					return it.key === id;
				})
			];
			const fileAnt = item[0].fileName;
			this.props.navigation.navigate("CameraScreen", {
				fileAnt,
				fileName: fileN,
				refreshList: this.refreshList.bind(this)
			});
		}
	};

	refreshList = async fileName => {
		await this.setState({ fileName, showPhotos: true });

		let itens = [...this.state.itens];
		if (this.state.idItem !== "") {
			//se mudou o item salva o anterior
			itens = this.newItens();

			this.setState({ itens });
		}

		//Salva na tela anterior para não perder o state

		const newItens = itens.map(({ key: itemId, label: item, ...rest }) => ({
			itemId,
			item,
			...rest
		}));

		if (typeof this.state.saveItens === "function") {
			this.state.saveItens(newItens, false);
		}
	};

	onHandleSave = async () => {
		let itens = [...this.state.itens];
		if (this.state.idItem !== "") {
			//se mudou o item salva o anterior
			itens = this.newItens();

			this.setState({ itens });
		}

		//Agora verifica se todas as fotos foram tiradas para salvar e voltar para tela anterior
		const saveItens = [
			...itens.filter(it => {
				return it.fileName === "";
			})
		];

		if (saveItens.length > 0) {
			this.props.alertWithType(
				"warn",
				"Aviso",
				"É preciso tirar todas as fotos para salvar!"
			);
			return;
		}

		//Se chegou até aqui é pq está tudo certo... vou normalizar os dados para mudar o nome da chave do item
		const newItens = itens.map(({ key: itemId, label: item, ...rest }) => ({
			itemId,
			item,
			...rest
		}));

		if (typeof this.state.saveItens === "function") {
			this.state.saveItens(newItens, true);
		}

		this.props.navigation.goBack();
	};

	newItens = () => {
		const {
			idItem,
			descItem,
			conforme,
			descNaoConforme,
			qtItem,
			informaQtde,
			fileName
		} = this.state;

		const item = {
			conforme,
			descNaoConforme,
			key: idItem,
			label: descItem,
			qtItem,
			informaQtde,
			fileName
		};
		const itens = [
			...this.state.itens.filter(it => {
				return it.key !== item.key;
			})
		];

		itens.push(item);
		return itens;
	};

	onRadioPress(index, value) {
		this.setState({ conforme: value, indiceConforme: index });
	}

	newPhoto = () => {
		this.setState({ showPreview: false });
		this.onHandlePress({ id: this.state.idItem, preview: false });
	};

	onClosePreview = () => {
		this.setState({ showPreview: false, showPhotos: true });
	};

	returnFileName = id => {
		const itens = [
			...this.state.itens.filter(it => {
				return it.key === id;
			})
		];
		return itens[0].fileName;
	};

	renderDados() {
		return (
			<View>
				<Text style={styles.titleText}>Não conformidades</Text>
				<Dropdown
					data={this.state.itens}
					title="Item"
					placeholder="Selecione o item"
					size={160}
					height={30}
					value={this.state.descItem}
					onChange={option => this.onChangeDropdown(option, "item")}
				/>
				<RadioGroup
					onSelect={(index, value) => this.onRadioPress(index, value)}
					selectedIndex={this.state.indiceConforme}
					size={moderateScale(12)}
					style={{
						flexDirection: "row",
						justifyContent: "space-around",
						padding: 0
					}}
				>
					<RadioButton value={"S"}>
						<Text style={styles.radioText}>Conforme?</Text>
					</RadioButton>

					<RadioButton value={"N"}>
						<Text style={styles.radioText}>Não Conforme?</Text>
					</RadioButton>
				</RadioGroup>

				<InputWithTitle
					title="Observações"
					editable={true}
					multiline={true}
					height={80}
					numberOfLines={4}
					size={160}
					onChangeText={value =>
						this.handleInputChange("descNaoConforme", value)
					}
					value={this.state.descNaoConforme}
				/>
				<InputWithTitle
					title="Quantidade"
					editable={true}
					size={65}
					height={30}
					value={this.state.qtItem.toString()}
					onChangeText={value => this.handleInputChange("qtItem", value)}
					visible={this.state.informaQtde}
					keyboardType="numeric"
				/>
			</View>
		);
	}

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
					fileName={this.state.fileName}
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
								fileName={this.returnFileName(data.id)}
							/>
						</View>
					</TouchableHighlight>
					<Text style={styles.groupText}>{data.item}</Text>
				</View>
			);
		};
		return (
			<Query
				query={GET_FROTA_ITENS_BY_GRUPO}
				variables={{
					id: this.state.frota.id,
					grupoItemId: this.state.grupo.id
				}}
			>
				{({ loading, error, data }) => {
					if (loading) return <Text>Buscando os grupos</Text>;
					if (error) {
						console.log("Error: ", error);
						return <Text>Error</Text>;
					}

					if (this.state.itens.length === 0) {
						data.frotaItensByGrupo.map(({ id, item, informaQtde }) => {
							this.state.itens.push({
								key: id,
								label: item,
								conforme: "S",
								descNaoConforme: "",
								qtItem: 1,
								informaQtde,
								fileName: ""
							});
						});
					}
					return (
						<Fragment>
							<FlatList
								data={createRows([...data.frotaItensByGrupo], 3)}
								keyExtractor={item => item.id.toString()}
								numColumns={3}
								renderItem={({ item }) => (
									<ListItemGrupo
										data={item}
										onPress={() =>
											this.onHandlePress({
												id: item.id,
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
				}}
			</Query>
		);
	}

	render() {
		return (
			<Container backgroundColor={EStyleSheet.value("$backgroundColor")}>
				<View style={styles.asideInner}>{this.renderDados()}</View>
				<View style={styles.backgroundInner}>
					<Text style={styles.titleText}>{`FOTOS ${
						this.state.grupo.grupoItem
					}`}</Text>
					{this.state.showPreview
						? this.renderPhoto()
						: this.state.showPhotos && this.renderFotos()}
				</View>
			</Container>
		);
	}
}

export default connectAlert(SaidaFotos);
