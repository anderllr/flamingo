import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

import Main from "../template/Main";
import { GET_CLIENTES } from "../resources/queries/clientesQuery";
import {
	CREATE_CLIENTE,
	UPDATE_CLIENTE,
	DELETE_CLIENTE
} from "../resources/mutations/clienteMutation";

import { validateFields, renderAlert } from "../utils/funcs";

const headerProps = {
	icon: "address-book",
	title: "Clientes",
	subtitle: "Cadastro de clientes: Incluir, Listar, Alterar e Excluir"
};

const initialState = {
	cliente: {
		id: "",
		email: "",
		name: "",
		fazenda: "",
		endereco: "",
		telefone: "",
		celular: "",
		cidadeId: "",
		obs: ""
	},
	alert: {
		type: "",
		title: "",
		msg: []
	},
	gridColumns: ["30%", "25%", "15%", "15%", "15%"]
};

class Clientes extends Component {
	state = { ...initialState };

	handleErrors(e, title) {
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

	clear = e => {
		e.preventDefault();
		this.setState({ ...initialState });
	};

	save = e => {
		e.preventDefault();
		const { id } = this.state.cliente;

		let clienteInput = this.state.cliente;
		delete clienteInput.id;
		console.log("ClienteInput: ", clienteInput);

		//in this case required fields are the same of userInput object
		const errors = validateFields(
			[
				{ field: "name", name: "Nome" },
				{ field: "email", name: "E-mail" },
				{ field: "cidadeId", name: "Cidade" },
				{ field: "fazenda", name: "Fazenda" },
				{ field: "endereco", name: "Endereço" },
				{ field: "telefone", name: "Telefone" }
			],
			clienteInput
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
				.updateCliente({ variables: { id, clienteInput } })
				.then(() => {
					this.props.data.refetch();
				})
				.catch(e => {
					this.handleErrors(e, "Atualização de Cliente!");
				});
		} else {
			this.props
				.createUser({ variables: { clienteInput } })
				.then(() => {
					this.props.data.refetch();
					this.setState({ user: initialState.cliente });
				})
				.catch(e => {
					this.handleErrors(e, "Adicionar novo cliente!");
				});
		}
	};

	select(cliente) {
		this.setState({ cliente });
	}

	delete(cliente) {
		const { id } = cliente;
		this.props
			.deleteCliente({ variables: { id } })
			.then(() => {
				this.props.data.refetch();
				this.setState({ user: initialState.cliente });
			})
			.catch(e => {
				this.handleErrors(e, "Excluir cliente!");
			});
	}

	changeField(e) {
		const cliente = { ...this.state.cliente };
		if (e.target.type === "checkbox") {
			cliente[e.target.name] = e.target.checked;
		} else {
			cliente[e.target.name] = e.target.value;
		}

		this.setState({ cliente, alert: initialState.alert });
	}

	renderClientes() {
		if (this.props.data.loading) {
			return <div>Loading...</div>;
		}
		if (!this.props.loading) {
			return this.props.data.clientes.map(cliente => {
				return (
					<li
						key={cliente.id}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						<div style={{ width: `${this.state.gridColumns[0]}` }}>
							{cliente.name}
						</div>
						<div style={{ width: `${this.state.gridColumns[1]}` }}>
							{cliente.fazenda}
						</div>
						<div style={{ width: `${this.state.gridColumns[2]}` }}>
							{cliente.telefone}
						</div>
						<div style={{ width: `${this.state.gridColumns[3]}` }}>
							{cliente.celular}
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[4]}` }}
						>
							<button
								className="btn btn-warning"
								onClick={() => this.select(cliente)}
							>
								<i className="fa fa-pencil" />
							</button>
							<button
								className="btn btn-danger ml-2"
								onClick={() => this.delete(cliente)}
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
					<div className="col-12 col-md-6">
						<div className="form-group has-danger">
							<label>Nome</label>
							<input
								type="text"
								className="form-control form-control-danger"
								name="name"
								value={this.state.cliente.name}
								onChange={e => this.changeField(e)}
								placeholder="Nome"
							/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>E-mail</label>
							<input
								type="text"
								className="form-control"
								name="userName"
								value={this.state.cliente.email}
								onChange={e => this.changeField(e)}
								placeholder="E-mail do cliente"
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-1">
						<div className="form-group">
							<label>Estado</label>
							<input
								type="select"
								className="form-control"
								name="estadoId"
								value={this.state.cliente.estadoId}
								onChange={e => this.changeField(e)}
								placeholder="UF"
							/>
						</div>
					</div>
					<div className="col-12 col-md-5">
						<div className="form-group">
							<label>Cidade</label>
							<input
								type="select"
								className="form-control"
								name="cidadeId"
								value={this.state.cliente.cidadeId}
								onChange={e => this.changeField(e)}
								placeholder="Escolha a cidade do cliente"
							/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Endereço</label>
							<input
								type="text"
								className="form-control"
								name="endereco"
								value={this.state.cliente.endereco}
								onChange={e => this.changeField(e)}
								placeholder="Endereço"
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Fazenda</label>
							<input
								type="text"
								className="form-control"
								name="fazenda"
								value={this.state.cliente.fazenda}
								onChange={e => this.changeField(e)}
								placeholder="Fazenda"
							/>
						</div>
					</div>
					<div className="col-6 col-md-3">
						<div className="form-group">
							<label>Telefone</label>
							<input
								type="text"
								className="form-control"
								name="telefone"
								value={this.state.cliente.telefone}
								onChange={e => this.changeField(e)}
								placeholder="Telefone"
							/>
						</div>
					</div>
					<div className="col-6 col-md-3">
						<div className="form-group">
							<label>Celular</label>
							<input
								type="text"
								className="form-control"
								name="celular"
								value={this.state.cliente.telefone}
								onChange={e => this.changeField(e)}
								placeholder="Telefone"
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-12">
						<div className="form-group">
							<label>Observações</label>
							<textarea
								type="text"
								className="form-control"
								name="obs"
								value={this.state.cliente.obs}
								onChange={e => this.changeField(e)}
								placeholder="Observações do cliente"
								row="4"
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
							<strong>Nome</strong>
						</div>
						<div style={{ width: `${this.state.gridColumns[1]}` }}>
							<strong>Fazenda</strong>
						</div>
						<div style={{ width: `${this.state.gridColumns[2]}` }}>
							<strong>Telefone</strong>
						</div>
						<div style={{ width: `${this.state.gridColumns[3]}` }}>
							<strong>Celular</strong>
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[4]}` }}
						>
							<strong>Actions</strong>
						</div>
					</li>
					{this.renderClientes()}
				</ul>
			</Main>
		);
	}
}

export default compose(
	graphql(GET_CLIENTES),
	graphql(CREATE_CLIENTE, { name: "createCliente" }),
	graphql(UPDATE_CLIENTE, { name: "updateCliente" }),
	graphql(DELETE_CLIENTE, { name: "deleteCliente" })
)(Clientes);
