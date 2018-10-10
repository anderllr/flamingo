import React, { Component } from "react";
import { View, Text } from "react-native";
import { verticalScale } from "react-native-size-matters";
import EStyleSheet from "react-native-extended-stylesheet";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { graphql, compose } from "react-apollo";

import { Container } from "../components/Container";
import { InputWithTitle } from "../components/InputText";
import { RoundButton } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { GET_CLIENTES } from "../config/resources/queries/clientesQuery";
import { UPLOAD_FILE } from "../config/resources/mutations/uploadMutation";
import { connectAlert } from "../components/Alert";
import styles from "./styles";

const initialState = {
	qtEntrega: 1,
	indiceEntrega: 0,
	idCliente1: "",
	descCliente1: "",
	idCliente2: "",
	descCliente2: ""
};

class Frete extends Component {
	constructor(props) {
		super(props);
		this.state = { ...initialState };
	}

	//********************** RADIO */
	onRadioPress(index, value) {
		this.setState({ qtEntrega: value, indiceEntrega: index });
	}

	/******** DROPDOWN *************/
	onChangeDropdown = (option, type) => {
		if (type === "cliente1") {
			this.setState({ idCliente1: option.key, descCliente1: option.label });
		} else if (type === "cliente2") {
			this.setState({ idCliente2: option.key, descCliente2: option.label });
		}
	};

	onClearDropdown = type => {
		if (type === "cliente1") {
			this.setState({ idCliente1: "", descCliente1: "" });
		} else if (type === "cliente2") {
			this.setState({ idCliente2: "", descCliente2: "" });
		}
	};

	render() {
		const clientes = [];

		if (!this.props.getClientes.loading && this.props.getClientes.clientes) {
			this.props.getClientes.clientes.map(({ id, name }) => {
				clientes.push({ key: id, label: name });
			});
		}

		return (
			<Container backgroundColor={EStyleSheet.value("$backgroundColor")}>
				<View style={styles.screenContainer}>
					<View
						style={{
							flexDirection: "row",
							marginBottom: verticalScale(2),
							justifyContent: "flex-start",
							alignItems: "center"
						}}
					>
						<Text style={styles.radioTitle}>Entregas:</Text>
						<RadioGroup
							onSelect={(index, value) => this.onRadioPress(index, value)}
							selectedIndex={this.state.indiceEntrega}
							style={{
								flexDirection: "row",
								justifyContent: "space-around",
								padding: 0
							}}
						>
							<RadioButton value={1}>
								<Text style={styles.radioText}>1 Entrega</Text>
							</RadioButton>

							<RadioButton value={2}>
								<Text style={styles.radioText}>2 Entregas</Text>
							</RadioButton>
						</RadioGroup>
					</View>
					<View style={styles.separatorLine} />
					<View
						style={{
							flexDirection: "row",
							marginBottom: verticalScale(2),
							marginTop: verticalScale(8),
							justifyContent: "flex-start"
						}}
					>
						<Dropdown
							data={clientes}
							title={this.state.qtEntrega === 1 ? "Cliente 1" : "Cliente"}
							placeholder="Selecione o cliente"
							height={32}
							sizeP={"50%"}
							value={this.state.descCliente1}
							onClickButton={() => this.onClearDropdown("cliente1")}
							onChange={option => this.onChangeDropdown(option, "cliente1")}
						/>

						<Dropdown
							data={clientes}
							title="Cliente 2"
							placeholder="Selecione o cliente"
							height={32}
							sizeP={"50%"}
							value={this.state.descCliente2}
							onClickButton={() => this.onClearDropdown("cliente2")}
							onChange={option => this.onChangeDropdown(option, "cliente2")}
						/>
					</View>
				</View>
			</Container>
		);
	}
}

export default compose(
	graphql(GET_CLIENTES, { name: "getClientes" }),
	graphql(UPLOAD_FILE, { name: "uploadFile" })
)(connectAlert(Frete));
