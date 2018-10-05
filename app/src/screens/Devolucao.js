import React, { Component } from "react";
import {
	View,
	Text,
	Slider,
	TouchableOpacity,
	Platform,
	ActivityIndicator
} from "react-native";
import { FileSystem, BlurView } from "expo";
import { graphql, compose } from "react-apollo";
import EStyleSheet from "react-native-extended-stylesheet";
import DateTimePicker from "react-native-modal-datetime-picker";
import { ReactNativeFile } from "apollo-upload-client";
import moment from "moment";

import { GET_VISTORIA_BY_ID } from "../config/resources/queries/vistoriaQuery";
import { GET_FROTA_BY_ID } from "../config/resources/queries/frotaQuery";
import { GET_CLIENTE_BY_ID } from "../config/resources/queries/clientesQuery";
import { UPDATE_VISTORIA } from "../config/resources/mutations/vistoriaMutation";
import { UPLOAD_FILE } from "../config/resources/mutations/uploadMutation";

import { Container } from "../components/Container";
import { RoundButton } from "../components/Button";
import { FuelMarker } from "../components/FuelMarker";
import { InputWithTitle } from "../components/InputText";
import ListFrotaGrupos from "./queries/ListFrotaGrupos";
import styles from "./styles";
import { connectAlert } from "../components/Alert";

class Devolucao extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dtChegada: "",
			hrChegada: "",
			horimetroChegada: 0,
			fuel: 0,
			isDateTimePickerVisible: false,
			fieldDateTime: "",
			pickerMode: "date",
			grupo: {},
			grupos: [],
			gruposCompletos: [],
			totGrupos: 0,
			wait: false
		};
	}

	componentWillMount() {
		const { navigation } = this.props;
		const onSearchSaida = navigation.getParam("onSearchSaida", {});
		this.setState({ onSearchSaida });
	}
	/*	componentWillReceiveProps(nextProps) {
		console.log("Props: ", nextProps);
	}
*/
	handleInputChange = (field, value) => {
		const newState = {
			...this.state,
			[field]: value
		};
		this.setState(newState);
	};

	//******************************************************************/
	//                  DATE PICKER FUNCTIONS                         //

	showDateTimePicker = fieldDateTime => {
		this.setState({
			pickerMode: fieldDateTime === "hrChegada" ? "time" : "date",
			isDateTimePickerVisible: true,
			fieldDateTime
		});
	};

	hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	handleDatePicked = date => {
		const field = this.state.fieldDateTime;
		const newState = {
			...this.state,
			[field]: moment(date).format(
				field === "hrChegada" ? "HH:mm" : "DD/MM/YYYY"
			)
		};
		this.setState(newState);

		this.hideDateTimePicker();
	};

	//******************************************************************/
	// FUNÇOES DA LISTA DE GRUPOS

	onHandlePress = (item, totGrupos) => {
		//TODO ver necessidade de regravar o grupo aqui
		//Deixa o grupo selecionado para quando voltar salvar já no formato da api
		const grupo = {
			grupoItemId: item.id,
			grupoItem: item.grupoItem,
			imagem: item.imagem,
			itens: item.itens
		};
		this.setState({ grupo, totGrupos });

		this.props.navigation.navigate("DevolucaoFotos", {
			grupo: item,
			frotaId: this.props.getFrota.frotaById.id,
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
	//    FUNÇÃO DA ASSINATURA
	//***************************************************************/

	onHandleSign = async () => {
		console.log("Clicou na assinatura...");
	};

	//***************************************************************/
	//    SALVA A TELA TOTAL
	//***************************************************************/
	onHandleSave = async () => {
		if (this.state.gruposCompletos.length < this.state.totGrupos) {
			//Significa que os grupos ainda não estão completos
			this.props.alertWithType(
				"warn",
				"Aviso",
				"É preciso tirar todas as fotos para salvar!"
			);
			return;
		}

		//Se passou agora vai montar o vistoria input
		//** Inicia as validações */
		let msg = "";
		if (this.state.dtChegada === "") msg += "Data chegada |";
		if (this.state.hrChegada === "") msg += "Hora chegada |";
		if (this.state.horimetroChegada === 0) msg += "Horímetro/KM";

		if (msg !== "") {
			msg = "Você precisa preencher o(s) campo(s): " + msg;
			this.props.alertWithType("warn", "Aviso", msg);
			return;
		}

		//TODO gravar utilizando operador rest
		this.props.navigation.goBack();
		return;
		//TODO finalizar todo o processo de gravação
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

		this.props
			.updateVistoria({ variables: { vistoriaInput } })
			.then(async () => {
				//UPLOAD NAS IMAGENS
				this.setState({ wait: true });
				const images = [];
				this.state.grupos.map(({ itens }) =>
					itens.map(({ fileName }) => images.push(fileName))
				);

				const result = await new Promise(async (resolve, reject) => {
					let error = "";
					await images.map(async fileName => {
						const result = await this.uploadFile(fileName);
						if (result !== "success") {
							error += `${result} |`;
						}
					});
					if (error === "") {
						resolve("success");
					} else reject(error);
				});

				this.setState({ wait: false });
				//FIM DO UPLOAD
				if (result === "success") {
					if (typeof this.state.onSearchSaida === "function") {
						this.state.onSearchSaida();
					}
					this.props.navigation.goBack();
				} else {
					this.props.alertWithType("error", "Error", result);
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
			const path = `${FileSystem.documentDirectory}flamingo/${fileName}.jpeg`;
			const fileLocal = await FileSystem.getInfoAsync(path);
			if (fileLocal.exists) {
				const file = new ReactNativeFile({
					uri: fileLocal.uri,
					type: "image/jpeg",
					name: `${fileName}.jpeg`
				});

				//verifica que foi carregado um arquivo então salva
				this.props
					.uploadFile({
						variables: {
							file,
							fileName: `${fileName}.jpeg`,
							screen: "",
							id: ""
						}
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

	renderActivity() {
		return (
			<BlurView
				tint="light"
				intensity={70}
				style={{
					flex: 1,
					position: "absolute",
					justifyContent: "center",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					alignItems: "center"
				}}
			>
				<ActivityIndicator
					size="large"
					color={EStyleSheet.value("$primaryGreen")}
				/>
			</BlurView>
		);
	}
	renderDados() {
		return (
			<View>
				<Text style={styles.titleText}>Dados da Locação</Text>
				<InputWithTitle
					title="Cliente"
					editable={false}
					height={22}
					size={160}
					value={`${
						!this.props.getCliente.loading
							? this.props.getCliente.clienteById.name
							: ""
					}`}
				/>
				<InputWithTitle
					title="Frota"
					editable={false}
					height={22}
					size={160}
					value={`${
						!this.props.getFrota.loading
							? this.props.getFrota.frotaById.name
							: ""
					}`}
				/>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "flex-end"
					}}
				>
					<InputWithTitle
						title="Data Saída"
						editable={false}
						height={22}
						size={78}
						value={`${
							!this.props.data.loading
								? this.props.data.vistoriaById.dtSaida
								: ""
						}`}
					/>
					<InputWithTitle
						title="Hora Saída"
						editable={false}
						height={22}
						size={78}
						value={`${
							!this.props.data.loading
								? this.props.data.vistoriaById.hrSaida
								: ""
						}`}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "flex-end"
					}}
				>
					<TouchableOpacity
						onPress={() => this.showDateTimePicker("dtChegada")}
					>
						<InputWithTitle
							title="Data Chegada"
							size={78}
							height={22}
							editable={false}
							changeColor={false}
							value={this.state.dtChegada}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => this.showDateTimePicker("hrChegada")}
					>
						<InputWithTitle
							title="Hora"
							size={78}
							height={22}
							editable={false}
							changeColor={false}
							value={this.state.hrChegada}
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
					<InputWithTitle
						title="Hori./Km Saída"
						editable={false}
						height={22}
						size={78}
						value={`${
							!this.props.data.loading
								? this.props.data.vistoriaById.horimetroSaida
								: ""
						}`}
					/>
					<InputWithTitle
						title="Horímetro/Km"
						size={78}
						height={22}
						keyboardType="numeric"
						onChangeText={value =>
							this.handleInputChange("horimetroChegada", value)
						}
						value={this.state.horimetroChegada.toString()}
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
						id={0}
						columns={4}
						onHandlePress={this.onHandlePress}
						gruposCompletos={this.state.gruposCompletos}
						grupos={
							this.props.data.loading
								? null
								: this.props.data.vistoriaById.grupos
						}
					/>
					<View style={styles.separatorLine} />
					<View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
						<RoundButton
							text="ASSINAR"
							width={60}
							height={30}
							fontSize={8}
							active={false}
							onPress={this.onHandleSign}
						/>
						<RoundButton
							text="SALVAR"
							width={60}
							height={30}
							fontSize={8}
							onPress={this.onHandleSave}
						/>
					</View>
				</View>
				{this.state.wait && this.renderActivity()}
			</Container>
		);
	}
}

export default compose(
	graphql(GET_CLIENTE_BY_ID, {
		name: "getCliente",
		options: props => ({
			variables: {
				id: props.navigation.state.params.clienteId
			}
		})
	}),
	graphql(GET_FROTA_BY_ID, {
		name: "getFrota",
		options: props => ({
			variables: {
				id: props.navigation.state.params.frotaId
			}
		})
	}),
	graphql(UPDATE_VISTORIA, { name: "updateVistoria" }),
	graphql(UPLOAD_FILE, { name: "uploadFile" }),
	graphql(GET_VISTORIA_BY_ID, {
		options: props => ({
			variables: {
				id: props.navigation.state.params.id
			}
		})
	})
)(connectAlert(Devolucao));
