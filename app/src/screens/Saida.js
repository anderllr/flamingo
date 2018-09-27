import React, { Component } from "react";
import { View, Text, Slider, TouchableOpacity, Platform } from "react-native";
import { FileSystem } from "expo";
import { graphql, compose } from "react-apollo";
import EStyleSheet from "react-native-extended-stylesheet";
import DateTimePicker from "react-native-modal-datetime-picker";
import { ReactNativeFile } from "apollo-upload-client";
import moment from "moment";

import { GET_CLIENTES } from "../config/resources/queries/clientesQuery";
import { CREATE_VISTORIA } from "../config/resources/mutations/vistoriaMutation";
import { UPLOAD_FILE } from "../config/resources/mutations/uploadMutation";

import { Container } from "../components/Container";
import { RoundButton } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { FuelMarker } from "../components/FuelMarker";
import { InputWithTitle } from "../components/InputText";
import ListFrotaGrupos from "./queries/ListFrotaGrupos";
import styles from "./styles";
import { connectAlert } from "../components/Alert";

class Saida extends Component {
	constructor(props) {
		super(props);
		this.state = {
			idCliente: "",
			frota: {},
			dtSaida: "",
			dtPrevisao: "",
			hrSaida: "",
			horimetro: 0,
			fuel: 0,
			descCliente: "",
			isDateTimePickerVisible: false,
			fieldDateTime: "",
			pickerMode: "date",
			grupo: {},
			grupos: [],
			gruposCompletos: [],
			totGrupos: 0
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
	// FUNÇOES DA LISTA DE GRUPOS

	onHandlePress = (item, totGrupos) => {
		//Deixa o grupo selecionado para quando voltar salvar já no formato da api
		const grupo = {
			grupoItemId: item.id,
			grupoItem: item.grupoItem
		};
		this.setState({ grupo, totGrupos });

		this.props.navigation.navigate("SaidaFotos", {
			frota: this.state.frota,
			grupo: item,
			saveItens: this.saveItens.bind(this)
		});
	};

	//************************************************************** */
	// FUNÇÃO QUE É EXECUTADA APÓS O LANÇAMENTO DAS FOTOS

	saveItens = async itens => {
		//Salva os grupos com os itens
		//marca como salvo na lista para checar o ícone
		const grupo = { ...this.state.grupo };
		const grupos = [
			...this.state.grupos.filter(g => {
				return g.grupoItemId !== grupo.grupoItemId;
			})
		];

		const gruposCompletos = [
			...this.state.gruposCompletos.filter(g => {
				return g !== grupo.grupoItemId;
			})
		];

		grupo.itens = [...itens];

		grupos.push(grupo);
		gruposCompletos.push(grupo.grupoItemId);
		this.setState({ grupos, gruposCompletos });
	};

	//***************************************************************/
	//    SALVA A TELA TOTAL
	//***************************************************************/
	onHandleSave = async () => {
		/* TODO -> Reativar a validação
		if (this.state.gruposCompletos.length < this.state.totGrupos) {
			//Significa que os grupos ainda não estão completos
			this.props.alertWithType(
				"warn",
				"Aviso",
				"É preciso tirar todas as fotos para salvar!"
			);
			return;
		}
*/
		//Se passou agora vai montar o vistoria input
		//** Inicia as validações */
		let msg = "";
		if (this.state.idCliente === "") msg += "Cliente |";
		if (this.state.dtSaida === "") msg += "Data saída |";
		if (this.state.dtPrevisao === "") msg += "Data previsão |";
		if (this.state.hrSaida === "") msg += "Hora Saída |";
		if (this.state.horimetro === 0) msg += "Horímetro/KM";

		if (msg !== "") {
			msg = "Você precisa preencher o(s) campo(s): " + msg;
			this.props.alertWithType("warn", "Aviso", msg);
			return;
		}

		const vistoriaInput = {
			frotaId: this.state.frota.id,
			clienteId: this.state.idCliente,
			dtSaida: this.state.dtSaida,
			dtPrevisao: this.state.dtPrevisao,
			hrSaida: this.state.hrSaida,
			horimetroSaida: this.state.horimetro,
			combustivelSaida: this.state.fuel,
			status: "SAIDA",
			grupos: this.state.grupos
		};

		//		console.log("Vistoria Input: ", vistoriaInput);

		this.props
			.createVistoria({ variables: { vistoriaInput } })
			.then(async () => {
				//UPLOAD NAS IMAGENS
				const images = [];
				this.state.grupos.map(({ itens }) =>
					itens.map(({ fileName }) => images.push(fileName))
				);

				const { resolve, reject } = await new Promise((resolve, reject) => {
					const result = images.map(async fileName => {
						return await this.uploadFile(fileName);
					});

					if (result === "success") {
						resolve(result);
					} else reject(result);
				});
				//FIM DO UPLOAD
				if (resolve === "success") {
					this.props.navigation.goBack();
				} else {
					this.props.alertWithType("error", "Error", resolve);
				}
			})
			.catch(e => {
				let message = "";
				if (e.graphQLErrors) {
					message = e.graphQLErrors[0]
						? e.graphQLErrors[0].message
						: e.graphQLErrors;
				}
				this.props.alertWithType("error", "Error", message);
			});
	};

	uploadFile = fileName => {
		return new Promise(async (resolve, reject) => {
			const path = `${FileSystem.documentDirectory}flamingo/${fileName}.png`;
			const fileLocal = await FileSystem.getInfoAsync(path);
			if (fileLocal.exists) {
				const file = new ReactNativeFile({
					uri: fileLocal.uri,
					type: "image/png",
					name: `${fileName}.png`
				});
				console.log("File: ", file);
				//verifica que foi carregado um arquivo então salva
				this.props
					.uploadFile({
						variables: { file, fileName: `${fileName}.png`, screen: "", id: "" }
					})
					.then(() => resolve("success"))
					.catch(e => reject(e));
			} else {
				reject("Arquivo inválido");
			}
		});
	};
	//***************************************************************/
	//    FIM DO SALVAMENTO
	//***************************************************************/

	renderDados() {
		const clientes = [];

		if (!this.props.getClientes.loading && this.props.getClientes.clientes) {
			this.props.getClientes.clientes.map(({ id, name }) => {
				clientes.push({ key: id, label: name });
			});
		}

		return (
			<View>
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
				<InputWithTitle
					title="Frota"
					editable={false}
					height={32}
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
							height={32}
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
							height={32}
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
							height={32}
							value={this.state.hrSaida}
						/>
					</TouchableOpacity>
					<InputWithTitle
						title="Horímetro"
						size={56}
						height={32}
						keyboardType="numeric"
						onChangeText={value => this.handleInputChange("horimetro", value)}
						value={this.state.horimetro.toString()}
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
						gruposCompletos={this.state.gruposCompletos}
						onCount={this.onCount}
					/>
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

export default compose(
	graphql(GET_CLIENTES, { name: "getClientes" }),
	graphql(CREATE_VISTORIA, { name: "createVistoria" }),
	graphql(UPLOAD_FILE, { name: "uploadFile" })
)(connectAlert(Saida));
