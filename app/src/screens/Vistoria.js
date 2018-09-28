import React, { Component } from "react";
import { View, Text } from "react-native";
import { verticalScale } from "react-native-size-matters";
import { graphql, compose } from "react-apollo";

import { Dropdown } from "../components/Dropdown";
import { Container } from "../components/Container";
import { RoundButton } from "../components/Button";
import { InputWithTitle } from "../components/InputText";
import styles from "./styles";

import { ListFrotaSaida } from "./queries";
import { GET_CLIENTES } from "../config/resources/queries/clientesQuery";

class Vistoria extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: "saida",
			nrFrota: 0,
			name: "",
			cliente: "",
			dtInicio: "",
			dtFim: "",
			nrFrotaSaida: 0,
			nameSaida: "",
			idCliente: "",
			descCliente: ""
		};
	}

	handleInputChange = (field, value) => {
		if (field === "nrFrota") {
			if (!value) value = 0;
			else if (value === "") value = 0;
			else value = parseInt(value);
		}
		const newState = {
			...this.state,
			[field]: value
		};
		this.setState(newState);
	};

	onHandlePress = item => {
		//TODO Finish handle to other pages
		this.props.navigation.navigate("Saida", {
			frota: item
		});
	};

	onSearchSaida = () => {
		const { nrFrota, name } = this.state;
		this.setState({ nrFrotaSaida: nrFrota, nameSaida: name });
	};

	onChangeDropdown = (option, type) => {
		if (type === "cliente") {
			this.setState({ idCliente: option.key, descCliente: option.label });
		}
	};

	renderSaida() {
		return (
			<View
				style={{
					flexDirection: "row",
					marginBottom: 20,
					marginTop: 20,
					justifyContent: "flex-start"
				}}
			>
				<InputWithTitle
					title="Número"
					size={40}
					height={30}
					keyboardType="numeric"
					onChangeText={value => this.handleInputChange("nrFrota", value)}
					value={this.state.nrFrota === 0 ? "" : this.state.nrFrota.toString()}
				/>
				<InputWithTitle
					title="Nome da Frota"
					size={90}
					height={30}
					onChangeText={value => this.handleInputChange("name", value)}
					value={this.state.name}
				/>
				<View
					style={{
						marginTop: verticalScale(7)
					}}
				>
					<RoundButton
						text="BUSCAR"
						width={80}
						height={40}
						fontSize={8}
						icon={{ name: "search", type: "ion" }}
						active={false}
						onPress={() => this.onSearchSaida()}
					/>
				</View>
			</View>
		);
	}
	// TODO: button to search devolucao
	renderDevolucao() {
		const clientes = [];

		if (!this.props.getClientes.loading && this.props.getClientes.clientes) {
			this.props.getClientes.clientes.map(({ id, name }) => {
				clientes.push({ key: id, label: name });
			});
		}
		return (
			<View
				style={{
					flexDirection: "row",
					marginBottom: 20,
					marginTop: 20,
					justifyContent: "flex-start"
				}}
			>
				<InputWithTitle
					title="Número da Frota"
					size={70}
					onChangeText={value => this.handleInputChange("nrFrota", value)}
					value={this.state.nrFrota.toString()}
				/>
				<InputWithTitle
					title="Nome da Frota"
					size={120}
					onChangeText={value => this.handleInputChange("name", value)}
					value={this.state.name}
				/>
				<View style={{ flexDirection: "column" }}>
					<Text style={styles.titleText}>Dados da Locação</Text>
					<Dropdown
						data={clientes}
						title="Cliente"
						placeholder="Selecione o cliente"
						height={32}
						size={116}
						value={this.state.descCliente}
						onChange={option => this.onChangeDropdown(option, "cliente")}
					/>
				</View>
			</View>
		);
	}

	//TODO -> Combo Status
	renderConsulta() {
		return (
			<View>
				<View
					style={{
						flexDirection: "row",
						marginTop: 20,
						justifyContent: "flex-start"
					}}
				>
					<InputWithTitle
						title="Número da Frota"
						size={70}
						onChangeText={value => this.handleInputChange("nrFrota", value)}
						value={this.state.nrFrota.toString()}
					/>
					<InputWithTitle
						title="Nome da Frota"
						size={120}
						onChangeText={value => this.handleInputChange("name", value)}
						value={this.state.name}
					/>
					<InputWithTitle
						title="Cliente"
						size={120}
						onChangeText={value => this.handleInputChange("cliente", value)}
						value={this.state.cliente}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						marginBottom: 20,
						marginTop: 5,
						justifyContent: "flex-start",
						alignItems: "flex-end"
					}}
				>
					<InputWithTitle
						title="Data de"
						size={80}
						onChangeText={value => this.handleInputChange("dtInicio", value)}
						value={this.state.dtInicio}
					/>
					<InputWithTitle
						title="Até"
						size={80}
						onChangeText={value => this.handleInputChange("dtFim", value)}
						value={this.state.dtFim}
					/>
					<InputWithTitle
						title="Status"
						size={80}
						onChangeText={value => this.handleInputChange("status", value)}
						value={this.state.status}
					/>
					<RoundButton
						text="BUSCAR"
						width={60}
						height={30}
						fontSize={8}
						icon={{ name: "search", type: "ion" }}
						onPress={() => console.log("Buscou")}
					/>
				</View>
			</View>
		);
	}

	render() {
		return (
			<Container backgroundColor={"#fff"}>
				<View style={styles.asideMain}>
					<RoundButton
						text="SAÍDA"
						widthP="75%"
						height={50}
						fontSize={8}
						icon={{ name: "exit", type: "ion" }}
						onPress={() => this.setState({ active: "saida" })}
						active={this.state.active === "saida"}
					/>
					<RoundButton
						text="DEVOLUÇÃO"
						widthP="75%"
						height={50}
						fontSize={8}
						icon={{ name: "return-left", type: "ion" }}
						onPress={() => this.setState({ active: "devolucao" })}
						active={this.state.active === "devolucao"}
					/>
					<RoundButton
						text="CONSULTAS"
						widthP="75%"
						height={50}
						fontSize={8}
						icon={{ name: "search", type: "ion" }}
						onPress={() => this.setState({ active: "consultas" })}
						active={this.state.active === "consultas"}
					/>
				</View>
				<View style={styles.backgroundMain}>
					{this.state.active === "saida"
						? this.renderSaida()
						: this.state.active === "devolucao"
							? this.renderDevolucao()
							: this.renderConsulta()}
					<ListFrotaSaida
						onHandlePress={this.onHandlePress}
						active={this.state.active}
						name={this.state.nameSaida}
						nrFrota={this.state.nrFrotaSaida}
					/>
				</View>
			</Container>
		);
	}
}
/*
const mapStateToProps = state => ({
	token: state.reducerLogin.token
});

const WithGraphql = graphql(GET_CLIENTES)(Vistoria);

export default connect(
	mapStateToProps,
	{ changeToken }
)(WithGraphql);


export default compose(
	connect(mapStateToProps, {changeToken}),
	graphql(GET_CLIENTES),
  )(RepositoryList); 
*/

export default compose(graphql(GET_CLIENTES, { name: "getClientes" }))(
	Vistoria
);
