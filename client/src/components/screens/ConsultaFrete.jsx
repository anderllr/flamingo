import React, { Component } from "react";
import { graphql, compose, Query } from "react-apollo";

import Main from "../template/Main";
import { GET_FRETE_CONSULTA } from "../resources/queries/freteQuery";
import { GET_CLIENTES } from "../resources/queries/clientesQuery";
import { GET_FROTA } from "../resources/queries/frotaQuery";

const headerProps = {
	icon: "truck",
	title: "Consulta Frete",
	subtitle: "Consulta dos fretes lançados pelo app"
};

const initialState = {
	variables: {},
	dtFreteIni: "",
	dtFreteFim: "",
	clienteId: "",
	frotaId: "",
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

	select(frete) {
		//TODO navigate to details about frete
	}

	changeField(e) {
		this.setState({
			[e.target.name]: e.target.value,
			alert: initialState.alert
		});
	}

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

					if (this.state.isRefetch) {
						refetch();
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
									{frete.descCliente2}
								</div>
								<div style={{ width: `${this.state.gridColumns[3]}` }}>
									{this.renderFieldFrota(frete)}
								</div>
								<div
									className="text-center"
									style={{ width: `${this.state.gridColumns[4]}` }}
								>
									{frete.status}
								</div>
								<div
									className="text-center"
									style={{ width: `${this.state.gridColumns[5]}` }}
								>
									<button
										className="btn btn-warning"
										onClick={() => this.select(frete)}
									>
										<i className="fa fa-pencil" />
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
							<input
								type="date"
								className="form-control"
								data-format="dd/MM/yyyy"
								name="dtFreteIni"
								value={this.state.dtFreteIni}
								onChange={e => this.changeField(e)}
								placeholder="Data Inicial"
							/>
						</div>
					</div>
					<div className="col-12 col-md-3">
						<div className="form-group">
							<label>Data Final</label>
							<input
								type="date"
								className="form-control"
								name="dtFreteFim"
								value={this.state.dtFreteIni}
								onChange={e => this.changeField(e)}
								placeholder="Data Final"
							/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Cliente</label>
							<input
								type="text"
								className="form-control"
								name="clienteId"
								value={this.state.clienteId}
								onChange={e => this.changeField(e)}
								placeholder="Cliente"
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Frota</label>
							<input
								className="form-control"
								name="frotaId"
								type="text"
								value={this.state.frotaId}
								onChange={e => this.changeField(e)}
								placeholder="Frota"
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
							onClick={e => this.search(e)}
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
							<strong>Destino 1</strong>
						</div>
						<div style={{ width: `${this.state.gridColumns[2]}` }}>
							<strong>Destino 2</strong>
						</div>
						<div style={{ width: `${this.state.gridColumns[3]}` }}>
							<strong>Frota/Frota Terceiro</strong>
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[4]}` }}
						>
							<strong>Status</strong>
						</div>
					</li>
					{this.renderConsulta()}
				</ul>
			</Main>
		);
	}
}

export default compose(
	graphql(GET_CLIENTES, { name: "getClientes" }),
	graphql(GET_FROTA, { name: "getFrota" })
)(ConsultaFrete);
