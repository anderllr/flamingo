import React, { Component } from "react";
import { graphql, compose, Query } from "react-apollo";
import DatePicker from "react-datepicker";
import { Typeahead } from "react-bootstrap-typeahead";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import "react-datepicker/dist/react-datepicker.css";

import Main from "../template/Main";
import { GET_FRETE_CONSULTA } from "../resources/queries/freteQuery";
import { GET_CLIENTES_CONS } from "../resources/queries/clientesQuery";
import { GET_FROTA_CONS } from "../resources/queries/frotaQuery";
import { DELETE_FRETE } from "../resources/mutations/freteMutation";
import FreteDetalhe from "./FreteDetalhe";
import Modal from "../utils/Modal";

const headerProps = {
	icon: "truck",
	title: "Consulta Frete",
	subtitle: "Consulta dos fretes lançados pelo app"
};

const initialState = {
	show: false,
	variables: {},
	dtFreteIni: null,
	dtFreteFim: null,
	clienteId: "",
	frotaId: "",
	cliente: [],
	frota: [],
	freteId: "",
	alert: {
		type: "",
		title: "",
		msg: []
	},
	gridColumns: ["12%", "25%", "25%", "25%", "13%"]
};

class ConsultaFrete extends Component {
	state = { ...initialState };

	handleErrors(e, title) {
		//Simple aproach to show error messages -- The better way is create a centralized function using apollo link
		//See documentation to understand another way: https://www.apollographql.com/docs/react/features/error-handling.html
		if (e.graphQLErrors) {
			this.setState({
				alert: {
					type: "danger",
					title: `Error on ${title}`,
					msg: [e.graphQLErrors[0].message]
				}
			});
		}
	}

	componentWillMount() {
		//TODO: Catch all users to send to component
	}

	clear = e => {
		e.preventDefault();
		this.setState({ ...initialState });
	};

	delete(frete, refetch) {
		const { id } = frete;

		this.props
			.deleteFrete({ variables: { id } })
			.then(() => {
				refetch();
			})
			.catch(e => {
				this.handleErrors(e, "Excluir Frete!");
			});
	}

	deleteAlert = (obj, refetch) => {
		confirmAlert({
			title: "Confirma exclusão?",
			message: "Tem certeza que deseja excluir?",
			buttons: [
				{
					label: "Sim",
					onClick: () => this.delete(obj, refetch)
				},
				{
					label: "Não"
				}
			]
		});
	};

	select = (e, frete) => {
		e.preventDefault();
		this.setState({ freteId: frete.id, show: true });
	};

	changeField(e) {
		this.setState({
			[e.target.name]: e.target.value,
			alert: initialState.alert
		});
	}

	changeFieldDate(date, field) {
		//		console.log("Date: ", date.format("DD/MM/YYYY"));
		this.setState({
			[field]: date
		});
	}

	onChangeComplete = (selected, field) => {
		const value = selected.length > 0 ? selected[0].id : "";
		this.setState({ [field]: selected, [`${field}Id`]: value });
	};

	onSearch = e => {
		e.preventDefault();
		const variables = {};
		if (this.state.dtFreteIni) {
			variables.dtFreteIni = this.state.dtFreteIni.format("DD/MM/YYYY");
		}

		if (this.state.dtFreteFim) {
			variables.dtFreteFim = this.state.dtFreteFim.format("DD/MM/YYYY");
		}

		if (this.state.clienteId !== "") {
			variables.clienteId = this.state.clienteId;
		}

		if (this.state.frotaId !== "") {
			variables.frotaId = this.state.frotaId;
		}

		this.setState({ variables });
	};

	// MODAL FUNCTIONS  //
	openModalGroup = e => {
		e.preventDefault();
		this.setState({ show: true });
	};

	hideModal = e => {
		e.preventDefault();
		this.setState({ show: false });
	};

	renderFieldFrota(frete) {
		if (frete.descFrota !== "-" && frete.frotaTerceiro !== "") {
			return (
				<div>
					<p>{frete.descFrota}</p>/<p>{frete.frotaTerceiro}</p>
				</div>
			);
		}

		if (frete.descFrota !== "-") {
			return frete.descFrota;
		}

		if (frete.frotaTerceiro !== "-") {
			return frete.frotaTerceiro;
		}
	}

	renderConsulta() {
		//TODO colocar a frete consulta e os itens
		return (
			<Query
				query={GET_FRETE_CONSULTA}
				variables={this.state.variables}
				displayName="getFreteConsulta"
				notifyOnNetworkStatusChange
			>
				{({ loading, error, data, refetch, networkStatus }) => {
					if (loading) return <div>Buscando os frete</div>;
					if (error) {
						return <div>Error</div>;
					}

					return data.freteConsulta.map(frete => {
						return (
							<li
								key={frete.id}
								className="list-group-item d-flex justify-content-between align-items-center"
							>
								<div style={{ width: `${this.state.gridColumns[0]}` }}>
									{frete.dtFrete}
								</div>
								<div style={{ width: `${this.state.gridColumns[1]}` }}>
									{frete.descCliente1}
								</div>
								<div style={{ width: `${this.state.gridColumns[2]}` }}>
									{this.renderFieldFrota(frete)}
								</div>
								<div
									className="text-center"
									style={{
										width: `${this.state.gridColumns[3]}`
									}}
								>
									<button
										className="btn btn-danger ml-2"
										onClick={() => this.deleteAlert(frete, refetch)}
										style={{
											marginRight: 12
										}}
									>
										<i className="fa fa-trash" />
									</button>
									<button
										className="btn btn-info"
										onClick={e => this.select(e, frete)}
									>
										<i className="fa fa-info-circle" />
									</button>
								</div>
							</li>
						);
					});
				}}
			</Query>
		);
	}
	renderForm() {
		//TODO put autocomplete
		return (
			<div className="form">
				<div className="row">
					<div className="col-12 col-md-3">
						<div className="form-group">
							<label>Data Inicial</label>
							<DatePicker
								dateFormat="DD/MM/YYYY"
								className="form-control"
								selected={this.state.dtFreteIni}
								onChange={date => this.changeFieldDate(date, "dtFreteIni")}
							/>
						</div>
					</div>
					<div className="col-12 col-md-3">
						<div className="form-group">
							<label>Data Final</label>
							<DatePicker
								dateFormat="DD/MM/YYYY"
								className="form-control"
								selected={this.state.dtFreteFim}
								onChange={date => this.changeFieldDate(date, "dtFreteFim")}
							/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Cliente</label>
							<Typeahead
								labelKey="name"
								multiple={false}
								options={
									this.props.getClientes.clientes
										? this.props.getClientes.clientes
										: []
								}
								isLoading={this.props.getClientes.loading}
								key="id"
								onChange={selected =>
									this.onChangeComplete(selected, "cliente")
								}
								selected={this.state.cliente}
								placeholder="Escolha um cliente..."
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Frota</label>
							<Typeahead
								labelKey={option => `${option.nrFrota}-${option.name}`}
								multiple={false}
								options={
									this.props.getFrota.frota ? this.props.getFrota.frota : []
								}
								isLoading={this.props.getFrota.loading}
								key="id"
								onChange={selected => this.onChangeComplete(selected, "frota")}
								selected={this.state.frota}
								placeholder="Escolha uma frota..."
							/>
						</div>
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-12 d-flex justify-content-end">
						<button
							type="submit"
							className="btn btn-primary"
							onClick={e => this.onSearch(e)}
						>
							Pesquisar
						</button>
						<button className="btn btn-info ml-2" onClick={e => this.clear(e)}>
							Limpar
						</button>
					</div>
				</div>
			</div>
		);
	}
	render() {
		return (
			<Main {...headerProps}>
				<Modal
					show={this.state.show}
					handleClose={e => this.hideModal(e)}
					style={{
						height: "80vh",
						width: "75vw",
						overflowY: "scroll"
					}}
				>
					<FreteDetalhe freteId={this.state.freteId} />
				</Modal>
				<form>{this.renderForm()}</form>

				<ul className="list-group col-lg-12 listgrid">
					<li
						key={0}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						<div style={{ width: `${this.state.gridColumns[0]}` }}>
							<strong>Data</strong>
						</div>
						<div style={{ width: `${this.state.gridColumns[1]}` }}>
							<strong>Cliente</strong>
						</div>
						<div style={{ width: `${this.state.gridColumns[2]}` }}>
							<strong>Frota/Frota Terceiro</strong>
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[3]}` }}
						>
							<strong>Ações</strong>
						</div>
					</li>
					{this.renderConsulta()}
				</ul>
			</Main>
		);
	}
}

export default compose(
	graphql(GET_CLIENTES_CONS, { name: "getClientes" }),
	graphql(GET_FROTA_CONS, { name: "getFrota" }),
	graphql(DELETE_FRETE, { name: "deleteFrete" })
)(ConsultaFrete);
