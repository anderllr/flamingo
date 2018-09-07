import React, { Component } from "react";
import { View } from "react-native";

import { Container } from "../components/Container";
import { RoundButton } from "../components/Button";
import { InputWithTitle } from "../components/InputText";
import styles from "./styles";

import { ListFrota } from "./queries";

class Vistoria extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: "saida",
			nrFrota: "",
			name: "",
			cliente: "",
			dtInicio: "",
			dtFim: ""
		};
	}

	handleInputChange = (field, value) => {
		const newState = {
			...this.state,
			[field]: value
		};
		this.setState(newState);
	};

	onHandlePress = item => {
		//TODO Finish handle to other pages
		console.log(`Clicou props ${this.state.active}`);
		this.props.navigation.navigate("Saida", {
			frota: item
		});
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
					value={this.state.nrFrota}
				/>
				<InputWithTitle
					title="Nome da Frota"
					size={90}
					height={30}
					onChangeText={value => this.handleInputChange("name", value)}
					value={this.state.name}
				/>
			</View>
		);
	}
	// TODO: button to search devolucao
	renderDevolucao() {
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
					value={this.state.nrFrota}
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
						value={this.state.nrFrota}
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
					<ListFrota
						onHandlePress={this.onHandlePress}
						active={this.state.active}
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

export default Vistoria;
