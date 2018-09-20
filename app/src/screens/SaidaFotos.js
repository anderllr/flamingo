import React, { Component } from "react";
import { View, Text, FlatList, TouchableHighlight } from "react-native";
import { Permissions } from "expo";
import EStyleSheet from "react-native-extended-stylesheet";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { Query } from "react-apollo";
import { scale } from "react-native-size-matters";

import { GET_FROTA_ITENS_BY_GRUPO } from "../config/resources/queries/frotaQuery";

import { Container } from "../components/Container";
import { Icon } from "../components/Icon";
import { RoundButton } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { InputWithTitle } from "../components/InputText";
import styles from "./styles";
import { createRows } from "../utils/utils";

class SaidaFotos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			frota: {},
			grupo: {},
			itens: [],
			conforme: "S",
			descNaoConforme: "",
			qtItem: "1",
			idItem: "",
			descItem: "",
			informaQtde: true,
			indiceConforme: 0,
			hasPermission: false
		};
	}

	async componentWillMount() {
		const { navigation } = this.props;
		const grupo = navigation.getParam("grupo", {});
		const frota = navigation.getParam("frota", {});
		this.setState({ grupo, frota });

		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasPermission: status === "granted" });
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
			informaQtde
		} = option;

		//TODO descItem não está mudando
		this.setState({
			idItem: key,
			descItem: label,
			conforme,
			descNaoConforme,
			qtItem,
			informaQtde,
			itens,
			indiceConforme: conforme === "S" ? 0 : 1
		});
	};

	onHandlePress = ({ id }) => {
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
					informaQtde
				} = item[0];
				const newState = {
					...this.state,
					itens,
					conforme,
					descNaoConforme,
					qtItem,
					idItem: key,
					descItem: label,
					informaQtde,
					indiceConforme: conforme === "S" ? 0 : 1
				};
				this.setState(newState);
			}
		}
	};

	onHandleSave = async () => {
		let itens = [...this.state.itens];
		if (this.state.idItem !== "") {
			//se mudou o item salva o anterior
			itens = this.newItens();

			this.setState({ itens });
		}
		console.log("State: ", this.state);
	};

	newItens = () => {
		const {
			idItem,
			descItem,
			conforme,
			descNaoConforme,
			qtItem,
			informaQtde
		} = this.state;

		const item = {
			conforme,
			descNaoConforme,
			key: idItem,
			label: descItem,
			qtItem,
			informaQtde
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

	renderDados() {
		return (
			<View>
				<Text style={styles.titleText}>Não conformidades</Text>
				<Dropdown
					data={this.state.itens}
					title="Fato"
					placeholder="Selecione o item"
					size={116}
					value={this.state.descItem}
					onChange={option => this.onChangeDropdown(option, "item")}
				/>
				<RadioGroup
					onSelect={(index, value) => this.onRadioPress(index, value)}
					selectedIndex={this.state.indiceConforme}
					style={{ flexDirection: "row" }}
				>
					<RadioButton value={"S"}>
						<Text>Conforme?</Text>
					</RadioButton>

					<RadioButton value={"N"}>
						<Text>Não Conforme?</Text>
					</RadioButton>
				</RadioGroup>

				<InputWithTitle
					title="Observações"
					editable={true}
					multiline={true}
					numberOfLines={4}
					size={116}
					height={200}
					onChangeText={value =>
						this.handleInputChange("descNaoConforme", value)
					}
					value={this.state.descNaoConforme}
				/>
				<InputWithTitle
					title="Quantidade"
					editable={true}
					size={40}
					value={this.state.qtItem}
					onChangeText={value => this.handleInputChange("qtItem", value)}
					visible={this.state.informaQtde}
					keyboardType="numeric"
				/>
			</View>
		);
	}

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
					>
						<View style={styles.groupItens} />
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
						return <Text>Error</Text>;
					}

					if (this.state.itens.length === 0) {
						data.frotaItensByGrupo.map(({ id, item, informaQtde }) => {
							this.state.itens.push({
								key: id,
								label: item,
								conforme: "S",
								descNaoConforme: "",
								qtItem: "1",
								informaQtde
							});
						});
					}
					return (
						<FlatList
							data={createRows([...data.frotaItensByGrupo], 3)}
							keyExtractor={item => item.id.toString()}
							numColumns={3}
							renderItem={({ item }) => (
								<ListItemGrupo
									data={item}
									onPress={() => this.onHandlePress(item)}
								/>
							)}
						/>
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
					{this.renderFotos()}
					<View style={styles.separatorLine} />
					<View style={{ alignItems: "flex-end" }}>
						<RoundButton
							text="SALVAR"
							width={60}
							height={30}
							fontSize={8}
							onPress={this.onHandleSave}
						/>
					</View>
				</View>
			</Container>
		);
	}
}

export default SaidaFotos;
