import React, { Component } from "react";
import { View, Text, FlatList, TouchableHighlight } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import RadioGroup from "react-native-radio-buttons-group";
import { Query } from "react-apollo";
import { scale } from "react-native-size-matters";

import { GET_ITENS_BY_GRUPO } from "../config/resources/queries/grupoItensQuery";

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
			grupo: {},
			itens: [],
			conforme: "S",
			descNaoConforme: "",
			qtItem: "1",
			idItem: "",
			descItem: "",
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

	componentWillMount() {
		const { navigation } = this.props;
		const grupo = navigation.getParam("grupo", {});
		this.setState({ grupo });
	}

	handleInputChange = (field, value) => {
		const newState = {
			...this.state,
			[field]: value
		};
		this.setState(newState);
	};

	onChangeDropdown = (option, type) => {
		this.setState({ idItem: option.key, descItem: option.label });
	};

	onHandlePress = item => {
		//TODO -> Abrir a foto
	};

	onRadioPress = data => {
		console.log("Radio Button: ", data);
		this.setState({ radioConforme: data });
	};

	renderDados() {
		//TODO -> Verificar essa rotina do RadioGroup
		let selectedButton = this.state.radioConforme.find(e => e.selected == true);
		selectedButton = selectedButton
			? selectedButton.value
			: this.state.radioConforme[0].label;
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
				/>

				<InputWithTitle
					title="Observações"
					editable={true}
					multiline={true}
					numberOfLines={4}
					size={116}
					height={200}
					value={this.state.descNaoConforme}
				/>
				<InputWithTitle
					title="Quantidade"
					editable={true}
					size={40}
					value={this.state.qtItem}
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
				<TouchableHighlight
					underlayColor={styles.$underlayColor}
					onPress={onPress}
					style={styles.groupContainer}
				>
					<View style={styles.groupItens}>
						<View style={styles.groupIcon}>
							<Icon
								name="camera"
								size={scale(20)}
								color={EStyleSheet.value("$lightGray")}
								type="ion"
							/>
						</View>
						<Text style={styles.groupText}>{data.item}</Text>
					</View>
				</TouchableHighlight>
			);
		};
		return (
			<Query
				query={GET_ITENS_BY_GRUPO}
				variables={{ grupoItemId: this.state.grupo.id }}
			>
				{({ loading, error, data, refetch }) => {
					if (loading) return <Text>Buscando os grupos</Text>;
					if (error) {
						return <Text>Error</Text>;
					}
					console.log("Dados", data, this.state.grupo.id);
					//TODO ---> Separar os itens que não estão selecionados
					return (
						<FlatList
							data={createRows([...data.itensByGrupo], 4)}
							keyExtractor={item => item.id.toString()}
							numColumns={4}
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
						this.state.grupoItem
					}`}</Text>
					{this.renderFotos()}
				</View>
			</Container>
		);
	}
}

export default SaidaFotos;
