import React, { Component } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	Platform,
	KeyboardAvoidingView
} from "react-native";
import { verticalScale } from "react-native-size-matters";
import EStyleSheet from "react-native-extended-stylesheet";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { graphql, compose } from "react-apollo";
import DateTimePicker from "react-native-modal-datetime-picker";
import { BlurView, FileSystem } from "expo";
import moment from "moment";
import { ReactNativeFile } from "apollo-upload-client";

import { Container } from "../components/Container";
import { InputWithTitle } from "../components/InputText";
import { RoundButton } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { GET_CLIENTES } from "../config/resources/queries/clientesQuery";
import { GET_FROTA } from "../config/resources/queries/frotaQuery";
import { GET_FRETE_BY_ID } from "../config/resources/queries/freteQuery";
import { GET_CAMINHAO_BY_ID } from "../config/resources/queries/caminhaoQuery";
import {
	CREATE_FRETE,
	UPDATE_FRETE
} from "../config/resources/mutations/freteMutation";
import { UPLOAD_FILE } from "../config/resources/mutations/uploadMutation";
import { connectAlert } from "../components/Alert";
import styles from "./styles";

const keyboardVerticalOffset = Platform.OS === "ios" ? 20 : 0;

class Frete extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qtEntrega: 1,
			dtFrete: moment(new Date()).format("DD/MM/YYYY"),
			freteId: "",
			indiceEntrega: 0,
			clienteId1: "",
			descCliente1: "",
			clienteId2: "",
			descCliente2: "",
			frotaId: "",
			descFrota: "",
			frotaTerceiro: "",
			kmInicial: 0,
			kmCliente1: 0,
			kmCliente2: 0,
			kmFinal: 0,
			hrMunckInicial: 0,
			hrMunckFinal: 0,
			qtPedagio: 0,
			vlDespesas: 0,
			caminhaoId: "",
			itens: [],
			isDateTimePickerVisible: false,
			fieldDateTime: "",
			pickerMode: "date",
			onSearchSaida: null,
			wait: false,
			clientes: [],
			frota: [],
			clicouFoto: false
		};
	}

	componentWillMount() {
		const { navigation } = this.props;
		const caminhaoId = navigation.getParam("caminhaoId", {});
		const freteId = navigation.getParam("freteId", {});
		const onSearchSaida = navigation.getParam("onSearchSaida", {});
		this.setState({ freteId, caminhaoId, onSearchSaida, clicouFoto: false });

		/*		this.props.navigation.addListener("didBlur", payload => {
			console.log("didBlur", payload);
		}); */
	}

	componentDidMount() {
		//		this.props.getFrete.refetch();
		//		console.log("getFrete: ", this.props.getFrete);
		//		this.carregaEdits(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.carregaEdits(nextProps);
	}

	carregaEdits(myProps) {
		const clientes = [...this.state.clientes];
		const frota = [...this.state.frota];

		if (clientes.length === 0) {
			if (!myProps.getClientes.loading && myProps.getClientes.clientes) {
				myProps.getClientes.clientes.map(({ id, name }) => {
					clientes.push({ key: id, label: name });
				});
				this.setState({ clientes });
			}
		}

		if (frota.length === 0) {
			if (!myProps.getFrota.loading && myProps.getFrota.frota) {
				myProps.getFrota.frota.map(({ id, name, nrFrota }) => {
					frota.push({ key: id, label: `${nrFrota}-${name}` });
				});
			}

			this.setState({ frota });
		}

		if (!this.state.clicouFoto && clientes.length > 0 && frota.length > 0) {
			//verifica pelos itens para não ficar recarregando os dados da tela no goback
			if (!myProps.getFrete.loading && myProps.getFrete.freteById) {
				const {
					qtEntrega,
					dtFrete,
					clienteId1,
					clienteId2,
					frotaId,
					frotaTerceiro,
					kmInicial,
					kmCliente1,
					kmCliente2,
					kmFinal,
					hrMunckInicial,
					hrMunckFinal,
					qtPedagio,
					itens
				} = myProps.getFrete.freteById;

				let descCliente1 = "";
				let descCliente2 = "";
				let descFrota = "";

				if (clienteId1 && clienteId1 !== "") {
					const cliente = clientes.filter(cli => cli.key === clienteId1);
					if (cliente) {
						if (cliente[0]) descCliente1 = cliente[0].label || "";
					}
				}

				if (clienteId2 && clienteId2 !== "") {
					const cliente = clientes.filter(cli => cli.key === clienteId2);
					if (cliente) {
						if (cliente[0]) descCliente2 = cliente[0].label || "";
					}
				}

				if (frotaId && frotaId !== "") {
					const fr = frota.filter(f => f.key === frotaId);
					if (fr) {
						if (fr[0]) descFrota = fr[0].label || "";
					}
				}

				//mapeia os itens para não virem com código interno do mongo
				const it = itens.map(({ item, imagem }) => ({ item, imagem }));

				this.setState({
					qtEntrega: qtEntrega || 1,
					dtFrete,
					clienteId1,
					descCliente1,
					clienteId2,
					descCliente2,
					frotaId,
					descFrota,
					frotaTerceiro,
					kmInicial,
					kmCliente1,
					kmCliente2,
					kmFinal,
					hrMunckInicial,
					hrMunckFinal,
					qtPedagio,
					itens: it
				});
			} // fim da condição se tem frete selecionado se não tem vou buscar no caminhão os itens de fotos
			else if (
				!myProps.getCaminhao.loading &&
				myProps.getCaminhao.caminhaoById
			) {
				const itens = myProps.getCaminhao.caminhaoById.itens.map(
					({ item }) => ({
						item,
						imagem: ""
					})
				);
				this.setState({ itens });
			}
		}
	}

	//******  EDITS */
	handleInputChange = (field, value, numeric = false) => {
		if (value === "" && numeric) value = 0;
		const newState = {
			...this.state,
			[field]: value
		};
		this.setState(newState);
	};

	//********************** RADIO */
	onRadioPress(index, value) {
		this.setState({ qtEntrega: value, indiceEntrega: index });
	}

	/******** DROPDOWN *************/
	onChangeDropdown = (option, type) => {
		if (type === "cliente1") {
			this.setState({ clienteId1: option.key, descCliente1: option.label });
		} else if (type === "cliente2") {
			this.setState({ clienteId2: option.key, descCliente2: option.label });
		} else if (type === "frota") {
			this.setState({ frotaId: option.key, descFrota: option.label });
		}
	};

	onClearDropdown = type => {
		if (type === "cliente1") {
			this.setState({ clienteId1: "", descCliente1: "" });
		} else if (type === "cliente2") {
			this.setState({ clienteId2: "", descCliente2: "" });
		} else if (type === "frota") {
			this.setState({ frotaId: "", descFrota: "" });
		}
	};

	//******************************************************************/
	//                  DATE PICKER FUNCTIONS                         //

	showDateTimePicker = fieldDateTime => {
		this.setState({
			pickerMode: "date",
			isDateTimePickerVisible: true,
			fieldDateTime
		});
	};

	hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	handleDatePicked = date => {
		const field = this.state.fieldDateTime;

		const newState = {
			...this.state,
			isDateTimePickerVisible: false,
			[field]: moment(date).format("DD/MM/YYYY")
		};
		this.setState(newState);
	};

	/***************************  BUTTONS  *********/
	onHandleSave = async () => {
		const id = this.state.freteId ? this.state.freteId : "";
		//** Inicia as validações */
		let msg = "";
		if (this.state.clienteId1 === "") msg += "Cliente 1 |";
		if (this.state.clienteId2 === "" && this.state.qtEntrega === 2)
			msg += "Cliente 2 |";
		if (this.state.frotaId === "" && this.state.frotaTerceiro === "")
			msg += "Frota OU Frota Terceiro |";
		if (this.state.kmInicial === "") msg += "Km Inicial Flamingo";

		if (id !== "") {
			//Adiciona as validações
			if (this.state.kmCliente === "") msg += "Km Destino";
			if (this.state.kmFinal === "") msg += "Km Final";
		}

		if (
			this.state.kmCliente1 > 0 &&
			this.state.kmCliente1 < this.state.kmInicial
		) {
			msg += "O Km no Destino 1 não pode ser menor que o Inicial";
		}

		if (
			this.state.kmCliente2 > 0 &&
			this.state.kmCliente2 < this.state.kmCliente1
		) {
			msg += "O Km no Destino 2 não pode ser menor que no Destino 1";
		}

		if (
			this.state.kmFinal > 0 &&
			(this.state.kmFinal < this.state.kmInicial ||
				this.state.kmFinal < this.state.kmCliente1 ||
				this.state.kmFinal < this.state.kmCliente2)
		) {
			msg += "O Km final não pode ser menor que o km ";
		}

		if (
			this.state.hrMunckFinal > 0 &&
			this.state.hrMunckFinal < this.state.hrMunckInicial
		) {
			msg += "O Km no Destino 1 não pode ser menor que o Inicial";
		}

		if (msg !== "") {
			msg = "Você precisa preencher o(s) campo(s): " + msg;
			this.props.alertWithType("warn", "Aviso", msg);
			return;
		}

		const freteInput = {
			caminhaoId: this.state.caminhaoId,
			qtEntrega: this.state.qtEntrega,
			dtFrete: this.state.dtFrete,
			clienteId1: this.state.clienteId1,
			clienteId2: this.state.clienteId2 !== "" ? this.state.clienteId2 : null,
			frotaId: this.state.frotaId !== "" ? this.state.frotaId : null,
			frotaTerceiro: this.state.frotaTerceiro,
			kmInicial: this.state.kmInicial,
			kmCliente1: this.state.kmCliente1 > 0 ? this.state.kmCliente1 : null,
			kmCliente2: this.state.kmCliente2 > 0 ? this.state.kmCliente2 : null,
			kmFinal: this.state.kmFinal > 0 ? this.state.kmFinal : null,
			hrMunckInicial:
				this.state.hrMunckInicial > 0 ? this.state.hrMunckInicial : null,
			hrMunckFinal:
				this.state.hrMunckFinal > 0 ? this.state.hrMunckFinal : null,
			qtPedagio: this.state.qtPedagio > 0 ? this.state.qtPedagio : null,
			vlDespesas: this.state.vlDespesas > 0 ? this.state.vlDespesas : null,
			status: this.state.kmFinal > 0 ? "ENCERRADO" : "ABERTO",
			itens: this.state.itens
		};

		if (id === "") {
			this.props
				.createFrete({ variables: { freteInput } })
				.then(async () => {
					//UPLOAD NAS IMAGENS
					this.setState({ wait: true });
					const images = this.state.itens
						.filter(item => item.imagem !== "")
						.map(({ imagem }) => imagem);

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
						this.props.getFrete.refetch();
						if (typeof this.state.onSearchSaida === "function") {
							this.state.onSearchSaida();
						}
						this.setState({ clicouFoto: false });
						this.props.navigation.goBack();
					} else {
						this.props.alertWithType("error", "Error", result);
					}
				})
				.catch(e => {
					let message = "";
					if (e.graphQLErrors) {
						message = e.graphQLErrors[0].message
							? e.graphQLErrors[0].message
							: e.graphQLErrors.toString();
					}
					this.props.alertWithType("error", "Error", message);
				});
		} else {
			this.props
				.updateFrete({ variables: { id, freteInput } })
				.then(async () => {
					//UPLOAD NAS IMAGENS
					this.setState({ wait: true });

					const images = this.state.itens
						.filter(item => item.imagem !== "")
						.map(({ imagem }) => imagem);

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
						this.setState({ clicouFoto: false });
						this.props.navigation.goBack();
					} else {
						this.props.alertWithType("error", "Error", result);
					}
				})
				.catch(e => {
					let message = "";
					if (e.graphQLErrors) {
						message = e.graphQLErrors[0].message
							? e.graphQLErrors[0].message
							: e.graphQLErrors.toString();
					}
					this.props.alertWithType("error", "Error", message);
				});
		}
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

	//************************************************************** */
	// FUNÇÃO QUE É EXECUTADA APÓS O LANÇAMENTO DAS FOTOS

	saveItens = async itens => {
		this.setState({ itens });
	};

	onHandleFotos = async () => {
		this.setState({ clicouFoto: true });
		this.props.navigation.navigate("FreteFotos", {
			itens: this.state.itens,
			saveItens: this.saveItens.bind(this)
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
	render() {
		return (
			<Container backgroundColor={EStyleSheet.value("$backgroundColor")}>
				<View style={styles.screenContainer}>
					<KeyboardAvoidingView
						behavior="position"
						keyboardVerticalOffset={keyboardVerticalOffset}
					>
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
							<TouchableOpacity
								onPress={() => this.showDateTimePicker("dtFrete")}
								style={{ marginLeft: 30 }}
							>
								<InputWithTitle
									title="Data Frete"
									size={78}
									height={32}
									editable={false}
									changeColor={false}
									value={this.state.dtFrete}
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.separatorLine} />
						<View
							style={{
								flexDirection: "row",
								marginBottom: verticalScale(2),
								marginTop: verticalScale(8),
								justifyContent: "space-between"
							}}
						>
							<Dropdown
								data={this.state.clientes}
								title={this.state.qtEntrega === 1 ? "Cliente 1" : "Cliente"}
								placeholder="Selecione o cliente"
								height={32}
								sizeP={"48%"}
								value={this.state.descCliente1}
								onClickButton={() => this.onClearDropdown("cliente1")}
								onChange={option => this.onChangeDropdown(option, "cliente1")}
							/>
							{this.state.qtEntrega === 2 && (
								<Dropdown
									data={this.state.clientes}
									title="Cliente 2"
									placeholder="Selecione o cliente"
									height={32}
									sizeP={"48%"}
									value={this.state.descCliente2}
									onClickButton={() => this.onClearDropdown("cliente2")}
									onChange={option => this.onChangeDropdown(option, "cliente2")}
								/>
							)}
						</View>

						<View
							style={{
								flexDirection: "row",
								marginBottom: verticalScale(2),
								justifyContent: "space-between"
							}}
						>
							<Dropdown
								data={this.state.frota}
								title="Frota"
								placeholder="Selecione a frota"
								height={32}
								sizeP={"48%"}
								value={this.state.descFrota}
								onClickButton={() => this.onClearDropdown("frota")}
								onChange={option => this.onChangeDropdown(option, "frota")}
							/>

							<InputWithTitle
								title="Frota Terceiro"
								height={32}
								sizeP={"48%"}
								onChangeText={value =>
									this.handleInputChange("frotaTerceiro", value)
								}
								value={this.state.frotaTerceiro}
							/>
						</View>
						<View
							style={{
								flexDirection: "row",
								marginBottom: verticalScale(2),
								justifyContent: "space-between"
							}}
						>
							<InputWithTitle
								title="Km Inicial Flamingo"
								height={32}
								keyboardType="numeric"
								sizeP={"15%"}
								onChangeText={value =>
									this.handleInputChange("kmInicial", value, true)
								}
								value={
									this.state.kmInicial > 0
										? this.state.kmInicial.toString()
										: ""
								}
							/>
							<InputWithTitle
								title="Km Destino 1"
								height={32}
								keyboardType="numeric"
								sizeP={"15%"}
								onChangeText={value =>
									this.handleInputChange("kmCliente1", value, true)
								}
								value={
									this.state.kmCliente1 > 0
										? this.state.kmCliente1.toString()
										: ""
								}
							/>
							<InputWithTitle
								title="Km Destino 2"
								height={32}
								keyboardType="numeric"
								sizeP={"15%"}
								onChangeText={value =>
									this.handleInputChange("kmCliente2", value, true)
								}
								value={
									this.state.kmCliente2 > 0
										? this.state.kmCliente2.toString()
										: ""
								}
							/>

							<InputWithTitle
								title="Km Final"
								height={32}
								sizeP={"15%"}
								keyboardType="numeric"
								onChangeText={value =>
									this.handleInputChange("kmFinal", value, true)
								}
								value={
									this.state.kmFinal > 0 ? this.state.kmFinal.toString() : ""
								}
							/>

							<InputWithTitle
								title="Munck Inicial"
								height={32}
								sizeP={"15%"}
								keyboardType="numeric"
								onChangeText={value =>
									this.handleInputChange("hrMunckInicial", value, true)
								}
								value={
									this.state.hrMunckInicial > 0
										? this.state.hrMunckInicial.toString()
										: ""
								}
							/>
							<InputWithTitle
								title="Munck Final"
								height={32}
								sizeP={"15%"}
								keyboardType="numeric"
								onChangeText={value =>
									this.handleInputChange("hrMunckFinal", value, true)
								}
								value={
									this.state.hrMunckFinal > 0
										? this.state.hrMunckFinal.toString()
										: ""
								}
							/>
						</View>
						<View
							style={{
								flexDirection: "row",
								marginBottom: verticalScale(2),
								justifyContent: "flex-start"
							}}
						>
							<InputWithTitle
								title="Pedágio (Qtde)"
								height={32}
								sizeP={"25%"}
								keyboardType="numeric"
								onChangeText={value =>
									this.handleInputChange("qtPedagio", value, true)
								}
								value={
									this.state.qtPedagio > 0
										? this.state.qtPedagio.toString()
										: ""
								}
							/>
							<InputWithTitle
								title="Outras Despesas"
								height={32}
								sizeP={"25%"}
								keyboardType="numeric"
								onChangeText={value =>
									this.handleInputChange("vlDespesas", value, true)
								}
								value={
									this.state.vlDespesas > 0
										? this.state.vlDespesas.toString()
										: ""
								}
							/>
						</View>
					</KeyboardAvoidingView>
					<View style={styles.separatorLine} />
					<View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
						{this.props.devMode && (
							<RoundButton
								text="STATE"
								size={60}
								height={30}
								fontSize={8}
								onPress={() => console.log("State Itens: ", this.state.itens)}
							/>
						)}
						<RoundButton
							text="FOTOS"
							size={60}
							height={30}
							fontSize={8}
							active={false}
							onPress={this.onHandleFotos}
						/>
						<RoundButton
							text="SALVAR"
							size={60}
							height={30}
							fontSize={8}
							onPress={this.onHandleSave}
						/>
					</View>
				</View>
				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this.handleDatePicked}
					onCancel={this.hideDateTimePicker}
					mode={this.state.pickerMode}
				/>

				{this.state.wait && this.renderActivity()}
			</Container>
		);
	}
}

export default compose(
	graphql(GET_CLIENTES, { name: "getClientes" }),
	graphql(GET_FROTA, { name: "getFrota" }),
	graphql(CREATE_FRETE, { name: "createFrete" }),
	graphql(UPDATE_FRETE, { name: "updateFrete" }),
	graphql(UPLOAD_FILE, { name: "uploadFile" }),
	graphql(GET_FRETE_BY_ID, {
		name: "getFrete",
		options: props => ({
			variables: {
				id: !props.navigation.state.params
					? null
					: props.navigation.state.params.freteId
			},
			fetchPolicy: "cache-and-network" //"network-only"
		})
	}),
	graphql(GET_CAMINHAO_BY_ID, {
		name: "getCaminhao",
		options: props => ({
			variables: {
				id: !props.navigation.state.params
					? null
					: props.navigation.state.params.caminhaoId
			}
		})
	})
)(connectAlert(Frete));
