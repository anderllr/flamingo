import React, { Component } from "react";
import { View, Text, Slider } from "react-native";
import { graphql } from "react-apollo";
import EStyleSheet from "react-native-extended-stylesheet";

import { Container } from "../components/Container";
import { RoundButton } from "../components/Button";
import { InputWithTitle } from "../components/InputText";
import styles from "./styles";

class Saida extends Component {
	constructor(props) {
		super(props);
		this.state = {
			idCliente: "",
			frota: {},
			dtSaida: "",
			dtPrevisao: "",
			hrSaida: "",
			horimetro: "",
			prCombustivel: "",
			fuel: 0
		};
	}

	componentWillMount() {
		const { navigation } = this.props;
		const frota = navigation.getParam("frota", {});
		this.setState({ frota });
	}

	handleInputChange = (field, value) => {
		const newState = {
			...this.state,
			[field]: value
		};
		this.setState(newState);
	};

	//TODO -> Auto complete Cliente
	renderDados() {
		return (
			<View>
				<Text style={styles.titleText}>Dados da Locação</Text>
				<InputWithTitle
					title="Cliente"
					size={116}
					onChangeText={value => this.handleInputChange("idCliente", value)}
					value={this.state.idCliente}
				/>
				<InputWithTitle
					title="Frota"
					editable={false}
					size={116}
					value={`${this.state.frota.nrFrota}-${this.state.frota.name}`}
				/>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "flex-end"
					}}
				>
					<InputWithTitle
						title="Data saída"
						size={56}
						onChangeText={value => this.handleInputChange("dtSaida", value)}
						value={this.state.dtSaida}
					/>
					<InputWithTitle
						title="Prev.Entrega"
						size={56}
						onChangeText={value => this.handleInputChange("horimetro", value)}
						value={this.state.dtFim}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "flex-end"
					}}
				>
					<InputWithTitle
						title="Hora saída"
						size={56}
						onChangeText={value => this.handleInputChange("hrSaida", value)}
						value={this.state.hrSaida}
					/>
					<InputWithTitle
						title="Horímetro"
						size={56}
						onChangeText={value => this.handleInputChange("horimetro", value)}
						value={this.state.horimetro}
					/>
				</View>
				<InputWithTitle
					title="Caminhão"
					size={116}
					onChangeText={value => this.handleInputChange("idCliente", value)}
					value={this.state.idCliente}
				/>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "flex-end"
					}}
				>
					<InputWithTitle
						title="Km Caminhão"
						keyboardType="numeric"
						size={56}
						onChangeText={value => this.handleInputChange("kmCaminhao", value)}
						value={this.state.kmCaminhao}
					/>
					<InputWithTitle
						title="Hora Munck"
						keyboardType="numeric"
						size={56}
						onChangeText={value => this.handleInputChange("hrMunck", value)}
						value={this.state.hrMunck}
					/>
				</View>
			</View>
		);
	}
	render() {
		return (
			<Container backgroundColor={EStyleSheet.value("$backgroundColor")}>
				<View style={styles.asideInner}>{this.renderDados()}</View>
				<View style={styles.backgroundInner}>
					<Text style={styles.titleText}>{this.state.fuel}</Text>
					<Slider
						style={{ width: 300 }}
						step={10}
						minimumValue={0}
						maximumValue={100}
						value={this.state.fuel}
						onValueChange={val => this.setState({ fuel: val })}
						onSlidingComplete={val => console.log("Val: ", val)}
					/>
					<View
						style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								transform: [{ rotate: `${this.state.fuel * 1.8}deg` }]
							}}
						>
							<View
								style={{
									height: 3,
									width: 100,
									backgroundColor: "red"
								}}
							/>
							<View
								style={{
									height: 20,
									width: 20,
									borderRadius: 20 / 2,
									backgroundColor: "black"
								}}
							/>
							<View
								style={{
									height: 3,
									width: 100,
									backgroundColor: "transparent"
								}}
							/>
						</View>
					</View>
				</View>
			</Container>
		);
	}
}

export default Saida;
