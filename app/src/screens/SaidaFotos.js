import React, { Component } from "react";
import { View, Text, FlatList, TouchableHighlight } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import RadioGroup from "react-native-radio-buttons-group";
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
			radioConforme: [
				{
					label: "Conforme?",
					value: "S"
				},
				{
					label: "Não conforme?",
					value: "N"
				}
			]
		};
	}
	adjustRadio = conforme => {
		const radioConforme = [
			{
				label: "Conforme?",
				value: conforme
			},
			{
				label: "Não conforme?",
				value: conforme === "S" ? "N" : "S"
			}
		];

		this.setState({ radioConforme });
	};
	componentWillMount() {
		const { navigation } = this.props;
		const grupo = navigation.getParam("grupo", {});
		const frota = navigation.getParam("frota", {});
		this.setState({ grupo, frota });
	}

	handleInputChange = (field, value) => {
		const newState = {
			...this.state,
			[field]: value
		};
		this.setState(newState);
	};

	onChangeDropdown = (option, type) => {
		if (this.state.idItem !== "") {
			this.changeItens();
		}
		const {
			conforme,
			descNaoConforme,
			key,
			label,
			qtItem,
			informaQtde
		} = option;
		this.setState({
			idItem: key,
			descItem: label,
			conforme,
			descNaoConforme,
			qtItem,
			informaQtde
		});

		this.adjustRadio(conforme);
	};

	onHandlePress = item => {
		//TODO -> Selecionar o item na lateral
		//     -> Abrir a foto
		console.log("Item: ", item);
	};

	onRadioPress = data => {
		// 0: conforme
		// 1: não conforme
		const { selected } = data[0];
		const conforme = selected ? "S" : "N";
		this.setState({ radioConforme: data, conforme });
	};

	changeItens = () => {
		//If the item change this function updates the array of itens
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
			...this.state.itens.filter(item => {
				return item.key !== idItem;
			})
		];

		itens.push(item);
		console.log("Itens: ", itens);
		this.setState({ itens });
	};

	renderDados() {
		//TODO -> Verificar essa rotina do RadioGroup
		/*		let selectedButton = this.state.radioConforme.find(e => e.selected == true);
		selectedButton = selectedButton
			? selectedButton.value
			: this.state.radioConforme[0].label; */
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
					radioButtons={this.state.radioConforme}
					onPress={this.onRadioPress}
					flexDirection="row"
					value={this.state.conforme}
				/>

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
						<View style={styles.groupItens}>
							<View>
								<Icon
									name="camera"
									size={scale(20)}
									color={EStyleSheet.value("$lightGray")}
									type="ion"
								/>
							</View>
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
				</View>
			</Container>
		);
	}
}

export default SaidaFotos;
