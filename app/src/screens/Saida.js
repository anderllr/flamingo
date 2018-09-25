import React, { Component } from "react";
import { View, Text, Slider, TouchableOpacity, Platform } from "react-native";
import { graphql, compose } from "react-apollo";
import EStyleSheet from "react-native-extended-stylesheet";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

import { GET_CLIENTES } from "../config/resources/queries/clientesQuery";
import { GET_CAMINHAO } from "../config/resources/queries/frotaQuery";

import { Container } from "../components/Container";
import { RoundButton } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { FuelMarker } from "../components/FuelMarker";
import { InputWithTitle } from "../components/InputText";
import ListFrotaGrupos from "./queries/ListFrotaGrupos";
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
			fuel: 0,
			descCliente: "",
			descCaminhao: "",
			idCaminhao: "",
			isDateTimePickerVisible: false,
			fieldDateTime: "",
			pickerMode: "date"
		};
	}

	componentWillMount() {
		const { navigation } = this.props;
		//TODO --> Tirar o frota default
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

	onChangeDropdown = (option, type) => {
		if (type === "cliente") {
			this.setState({ idCliente: option.key, descCliente: option.label });
		} else {
			this.setState({ idCaminhao: option.key, descCaminhao: option.label });
		}
	};

	//******************************************************************/
	//                  DATE PICKER FUNCTIONS                         //

	showDateTimePicker = fieldDateTime => {
		this.setState({
			pickerMode: fieldDateTime === "hrSaida" ? "time" : "date",
			isDateTimePickerVisible: true,
			fieldDateTime
		});
	};

	hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	handleDatePicked = date => {
		const field = this.state.fieldDateTime;
		const newState = {
			...this.state,
			[field]: moment(date).format(field === "hrSaida" ? "HH:mm" : "DD/MM/YYYY")
		};
		this.setState(newState);

		this.hideDateTimePicker();
	};

	//******************************************************************/

	onHandlePress = item => {
		//TODO Finish handle to other pages
		this.props.navigation.navigate("SaidaFotos", {
			frota: this.state.frota,
			grupo: item
		});
	};

	//TODO -> Auto complete Cliente
	renderDados() {
		const clientes = [];
		const caminhoes = [];

		if (!this.props.getClientes.loading && this.props.getClientes.clientes) {
			this.props.getClientes.clientes.map(({ id, name }) => {
				clientes.push({ key: id, label: name });
			});
		}

		if (
			!this.props.getCaminhoes.loading &&
			this.props.getCaminhoes.frotaCaminhao
		) {
			this.props.getCaminhoes.frotaCaminhao.map(({ id, name }) => {
				caminhoes.push({ key: id, label: name });
			});
		}

		return (
			<View>
				<Text style={styles.titleText}>Dados da Locação</Text>
				<Dropdown
					data={clientes}
					title="Cliente"
					placeholder="Selecione o cliente"
					size={116}
					value={this.state.descCliente}
					onChange={option => this.onChangeDropdown(option, "cliente")}
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
					<TouchableOpacity onPress={() => this.showDateTimePicker("dtSaida")}>
						<InputWithTitle
							title="Data saída"
							size={56}
							editable={false}
							changeColor={false}
							value={this.state.dtSaida}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => this.showDateTimePicker("dtPrevisao")}
					>
						<InputWithTitle
							title="Prev.Entrega"
							size={56}
							editable={false}
							changeColor={false}
							value={this.state.dtPrevisao}
						/>
					</TouchableOpacity>

					<DateTimePicker
						isVisible={this.state.isDateTimePickerVisible}
						onConfirm={this.handleDatePicked}
						onCancel={this.hideDateTimePicker}
						mode={this.state.pickerMode}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "flex-end"
					}}
				>
					<TouchableOpacity onPress={() => this.showDateTimePicker("hrSaida")}>
						<InputWithTitle
							title="Hora saída"
							size={56}
							editable={false}
							changeColor={false}
							value={this.state.hrSaida}
						/>
					</TouchableOpacity>
					<InputWithTitle
						title="Horímetro"
						size={56}
						keyboardType="numeric"
						onChangeText={value => this.handleInputChange("horimetro", value)}
						value={this.state.horimetro}
					/>
				</View>
				<Dropdown
					data={caminhoes}
					title="Caminhão"
					size={116}
					placeholder="Selecione o caminhão"
					value={this.state.descCaminhao}
					onChange={option => this.onChangeDropdown(option, "caminhao")}
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
				<View style={styles.backgroundInner}>
					<Text style={styles.titleText}>Locação - Grupos da Frota</Text>
					<ListFrotaGrupos
						id={this.state.frota.id}
						columns={4}
						onHandlePress={this.onHandlePress}
					/>
				</View>
			</Container>
		);
	}
}

export default compose(
	graphql(GET_CLIENTES, { name: "getClientes" }),
	graphql(GET_CAMINHAO, { name: "getCaminhoes" })
)(Saida);
