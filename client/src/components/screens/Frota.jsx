import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

import Main from "../template/Main";
import { GET_FROTA } from "../resources/queries/frotaQuery";
import {
	CREATE_FROTA,
	UPDATE_FROTA,
	DELETE_FROTA
} from "../resources/mutations/frotaMutation";

import { validateFields, renderAlert } from "../utils/funcs";

const headerProps = {
	icon: "truck",
	title: "Frota",
	subtitle: "Cadastro de frota: Incluir, Listar, Alterar e Excluir"
};

const initialState = {
	frota: {
		id: "",
		nrFrota: null,
		name: "",
		ano: null,
		chassi: ""
	},
	alert: {
		type: "",
		title: "",
		msg: []
	},
	gridColumns: ["10%", "40%", "10%", "20%", "20"]
};

class Frota extends Component {
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

	save = e => {
		e.preventDefault();
		const { id, nrFrota, name, ano, chassi } = this.state.frota;

		let frotaInput = {
			nrFrota,
			name,
			ano,
			chassi
		};

		//in this case required fields are the same of userInput object
		const errors = validateFields(
			[
				{ field: "name", name: "Nome" },
				{ field: "nrFrota", name: "Nr. Frota" },
				{ field: "ano", name: "Ano" }
			],
			this.state.frota
		);
		if (errors.length > 0) {
			this.setState({
				alert: {
					type: "danger",
					title: "Erro ao Salvar",
					msg: errors
				}
			});
			return;
		}

		if (id !== "") {
			//In update mode
			this.props
				.updateFrota({ variables: { id, frotaInput } })
				.then(() => {
					this.props.data.refetch();
				})
				.catch(e => {
					this.handleErrors(e, "Atualização de Frota!");
				});
		} else {
			this.props
				.createFrota({ variables: { frotaInput } })
				.then(() => {
					this.props.data.refetch();
				})
				.catch(e => {
					this.handleErrors(e, "Adicionar Frota!");
				});
		}
	};

	select(frota) {
		this.setState({ frota });
	}

	delete(frota) {
		const { id } = frota;
		this.props
			.deleteFrota({ variables: { id } })
			.then(() => {
				this.props.data.refetch();
				this.setState({ frota: initialState.frota });
			})
			.catch(e => {
				this.handleErrors(e, "Excluir usuário!");
			});
	}

	changeField(e) {
		const frota = { ...this.state.frota };
		if (e.target.type === "checkbox") {
			frota[e.target.name] = e.target.checked;
		} else {
			frota[e.target.name] = e.target.value;
		}

		this.setState({ frota, alert: initialState.alert });
	}

	renderFrota() {
		if (this.props.data.loading) {
			return <div>Loading...</div>;
		}
		if (!this.props.loading) {
			return this.props.data.frota.map(frota => {
				return (
					<li
						key={frota.id}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						<div style={{ width: `${this.state.gridColumns[0]}` }}>
							{frota.nrFrota}
						</div>
						<div style={{ width: `${this.state.gridColumns[1]}` }}>
							{frota.name}
						</div>
						<div style={{ width: `${this.state.gridColumns[2]}` }}>
							{frota.ano}
						</div>
						<div style={{ width: `${this.state.gridColumns[3]}` }}>
							{frota.chassi}
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[4]}` }}
						>
							<button
								className="btn btn-warning"
								onClick={() => this.select(frota)}
							>
								<i className="fa fa-pencil" />
							</button>
							<button
								className="btn btn-danger ml-2"
								onClick={() => this.delete(frota)}
							>
								<i className="fa fa-trash" />
							</button>
						</div>
					</li>
				);
			});
		}
	}
	renderForm() {
		return (
			<div className="form">
				<div className="row">
					<div className="col-12 col-md-2">
						<div className="form-group has-danger">
							<label>Nr.Frota</label>
							<input
								type="text"
								className="form-control form-control-danger"
								name="nrFrota"
								value={this.state.frota.nrFrota}
								onChange={e => this.changeField(e)}
								placeholder="Nr. Frota"
							/>
						</div>
					</div>
					<div className="col-12 col-md-8">
						<div className="form-group">
							<label>Nome</label>
							<input
								type="text"
								className="form-control"
								name="name"
								value={this.state.frota.name}
								onChange={e => this.changeField(e)}
								placeholder="Nome da Frota"
							/>
						</div>
					</div>
					<div className="col-12 col-md-2">
						<div className="form-group">
							<label>Ano</label>
							<input
								type="text"
								className="form-control"
								name="ano"
								value={this.state.frota.ano}
								onChange={e => this.changeField(e)}
								placeholder="Ano da frota"
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Chassi</label>
							<input
								type="text"
								className="form-control"
								name="chassi"
								value={this.state.frota.chassi}
								onChange={e => this.changeField(e)}
								placeholder="Número do Chassi"
							/>
						</div>
					</div>
				</div>
				{renderAlert(this.state.alert)}
				<hr />
				<div className="row">
					<div className="col-12 d-flex justify-content-end">
						<button
							type="submit"
							className="btn btn-primary"
							onClick={e => this.save(e)}
						>
							Salvar
						</button>

						<button className="btn btn-info ml-2" onClick={e => this.clear(e)}>
							Novo
						</button>

						<button
							className="btn btn-secondary ml-2"
							onClick={e => this.clear(e)}
						>
							Cancelar
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
							<strong>Nr. Frota</strong>
						</div>
						<div style={{ width: `${this.state.gridColumns[1]}` }}>
							<strong>Nome</strong>
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[2]}` }}
						>
							<strong>Ano</strong>
						</div>
						<div style={{ width: `${this.state.gridColumns[3]}` }}>
							<strong>Chassi</strong>
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[4]}` }}
						>
							<strong>Actions</strong>
						</div>
					</li>
					{this.renderFrota()}
				</ul>
			</Main>
		);
	}
}

export default compose(
	graphql(GET_FROTA),
	graphql(CREATE_FROTA, { name: "createFrota" }),
	graphql(UPDATE_FROTA, { name: "updateFrota" }),
	graphql(DELETE_FROTA, { name: "deleteFrota" })
)(Frota);
