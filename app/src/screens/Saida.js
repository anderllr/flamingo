import React, { Component } from "react";
import { View, Text, Slider, SliderIOS, Platform } from "react-native";
import { graphql } from "react-apollo";
import EStyleSheet from "react-native-extended-stylesheet";

import { GET_CLIENTES } from "../config/resources/queries/clientesQuery";

import { Container } from "../components/Container";
import { RoundButton } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { FuelMarker } from "../components/FuelMarker";
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
				<Dropdown
					data={companies}
					title="Cliente"
					value={this.state.cliente}
					onChange={this.props.onChangeEmpresa}
				/>
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
				<Text style={styles.labelText}>Combustível</Text>
				<View style={styles.fuelMarker}>
					<FuelMarker fuel={this.state.fuel} />
					{Platform === "ios" ? (
						<SliderIOS
							style={styles.slider}
							step={10}
							minimumTrackTintColor={EStyleSheet.value("$primaryButton")}
							maximumTrackTintColor={EStyleSheet.value("$lyghtGray")}
							minimumValue={0}
							maximumValue={180}
							thumbTintColor={EStyleSheet.value("$primaryButton")}
							value={this.state.fuel}
							onValueChange={val => this.setState({ fuel: val })}
						/>
					) : (
						<Slider
							style={styles.slider}
							minimumTrackTintColor={EStyleSheet.value("$primaryButton")}
							maximumTrackTintColor={EStyleSheet.value("$lightGray")}
							step={10}
							minimumValue={0}
							thumbTintColor={EStyleSheet.value("$primaryButton")}
							maximumValue={180}
							value={this.state.fuel}
							onValueChange={val => this.setState({ fuel: val })}
						/>
					)}
				</View>
			</View>
		);
	}
	render() {
		return (
			<Container backgroundColor={EStyleSheet.value("$backgroundColor")}>
				<View style={styles.asideInner}>{this.renderDados()}</View>
				<View style={styles.backgroundInner} />
			</Container>
		);
	}
}

export default graphql(GET_CLIENTES)(Saida);
