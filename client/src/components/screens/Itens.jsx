import React, { Component } from "react";
import { graphql, compose, Query } from "react-apollo";
import { Typeahead } from "react-bootstrap-typeahead";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import Main from "../template/Main";
import {
	GET_ITENS_BY_GRUPO,
	GET_GRUPOS
} from "../resources/queries/grupoItensQuery";
import {
	CREATE_ITEM,
	UPDATE_ITEM,
	DELETE_ITEM
} from "../resources/mutations/grupoItensMutation";

import { validateFields, renderAlert } from "../utils/funcs";
import Modal from "../utils/Modal";
import { GrupoItem } from "../screens";

const headerProps = {
	icon: "compass",
	title: "Itens",
	subtitle: "Cadastro de itens: Incluir, Listar, Alterar e Excluir"
};

const initialState = {
	item: {
		id: "",
		item: "",
		informaQtde: false
	},
	alert: {
		type: "",
		title: "",
		msg: []
	},
	gridColumns: ["60%", "20%", "20%"],
	grupoItemId: "",
	isRefetch: false,
	show: false
};

class Itens extends Component {
	state = { ...initialState };

	componentWillMount = async () => {};

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
		this.setState({ ...initialState, grupoItemId: this.state.grupoItemId });
	};

	save = e => {
		e.preventDefault();

		const { grupoItemId } = this.state;
		const { id, item, informaQtde } = this.state.item;

		let itemInput = {
			item,
			informaQtde
		};

		//in this case required fields are the same of userInput object
		const errors = validateFields([{ field: "item", name: "Nome" }], itemInput);
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
				.updateItem({
					variables: { grupoItemId, id, itemInput },
					options: {
						refetchQueries: [
							{
								query: GET_ITENS_BY_GRUPO,
								variables: { grupoItemId: this.state.grupoItemId }
							}
						],
						awaitRefetchQueries: true
					}
				})
				.then(() => {
					this.setState({ isRefetch: true });
					this.props.data.refetch();
					this.setState({ isRefetch: false });
				})
				.catch(e => {
					this.handleErrors(e, "Atualização de Item!");
				});
		} else {
			this.props
				.createItem({ variables: { grupoItemId, itemInput } })
				.then(() => {
					this.setState({ isRefetch: true });
					this.props.data.refetch();
					this.setState({ isRefetch: false, item: initialState.item });
				})
				.catch(e => {
					this.handleErrors(e, "Adicionar novo item!");
				});
		}
	};

	select(item) {
		this.setState({ item });
	}

	delete(item) {
		const { id } = item;
		this.props
			.deleteItem({
				variables: { grupoItemId: this.state.grupoItemId, id }
			})
			.then(() => {
				this.setState({ isRefetch: true });
				this.props.data.refetch();
				this.setState({ isRefetch: false, item: initialState.item });
			})
			.catch(e => {
				this.handleErrors(e, "Excluir item!");
			});
	}

	deleteAlert = obj => {
		confirmAlert({
			title: "Confirma exclusão?",
			message: "Tem certeza que deseja excluir?",
			buttons: [
				{
					label: "Sim",
					onClick: () => this.delete(obj)
				},
				{
					label: "Não"
				}
			]
		});
	};

	changeField(e) {
		const item = { ...this.state.item };

		if (e.target.type === "checkbox") {
			item[e.target.name] = e.target.checked;
		} else {
			let value =
				e.target.name === "email"
					? e.target.value.toLowerCase()
					: e.target.value.toUpperCase();
			item[e.target.name] = value;
		}

		this.setState({ item, alert: initialState.alert });
	}

	onChangeComplete = e => {
		//TODO When I select a group I have to change Itens List
		if (e) {
			if (e[0]) {
				if (e[0].id) {
					const grupoItemId = e[0].id;

					this.setState({ grupoItemId, alert: initialState.alert });
				}
			} else {
				this.setState({ grupoItemId: "", alert: initialState.alert });
			}
		}
	};

	openModalGroup = e => {
		e.preventDefault();
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	renderItens() {
		return (
			<Query
				query={GET_ITENS_BY_GRUPO}
				variables={{ grupoItemId: this.state.grupoItemId }}
				skip={this.state.grupoItemId === ""}
				displayName="getItens"
				notifyOnNetworkStatusChange
			>
				{({ loading, error, data, refetch, networkStatus }) => {
					if (loading) return <div>Buscando os itens</div>;
					if (error) {
						return <div>Error</div>;
					}

					if (this.state.isRefetch) {
						refetch();
					}

					return data.itensByGrupo.map(item => {
						return (
							<li
								key={item.id}
								className="list-group-item d-flex justify-content-between align-items-center"
							>
								<div style={{ width: `${this.state.gridColumns[0]}` }}>
									{item.item}
								</div>
								<div
									className="text-center"
									style={{ width: `${this.state.gridColumns[1]}` }}
								>
									<i className={`${item.informaQtde ? "fa fa-check" : ""}`} />{" "}
								</div>
								<div
									className="text-center"
									style={{ width: `${this.state.gridColumns[2]}` }}
								>
									<button
										className="btn btn-warning"
										onClick={() => this.select(item)}
									>
										<i className="fa fa-pencil" />
									</button>
									<button
										className="btn btn-danger ml-2"
										onClick={() => this.deleteAlert(item)}
									>
										<i className="fa fa-trash" />
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
		return (
			<div className="form">
				<div className="row">
					<div className="col-12 col-md-5">
						<div className="form-group">
							<label>Grupo do Item</label>
							<Typeahead
								labelKey="grupoItem"
								multiple={false}
								options={this.props.data.grupos ? this.props.data.grupos : []}
								isLoading={this.props.data.loading}
								key="id"
								onChange={e => this.onChangeComplete(e)}
								placeholder="Escolha um grupo..."
							/>
							<div style={{ position: "absolute", bottom: 16, right: 14 }}>
								<button
									className="btn btn-dark"
									onClick={e => this.openModalGroup(e)}
								>
									Grupo
								</button>
							</div>
						</div>
					</div>

					<div className="col-12 col-md-6">
						<div className="form-group has-danger">
							<label>Item</label>
							<input
								type="text"
								className="form-control form-control-danger"
								name="item"
								value={this.state.item.item}
								onChange={e => this.changeField(e)}
								placeholder="Item"
							/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="checkbox"
								name="informaQtde"
								checked={this.state.item.informaQtde}
								onChange={e => this.changeField(e)}
							/>
							<label className="form-check-label">Informa Qtde?</label>
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

				<Modal
					show={this.state.show}
					handleClose={this.hideModal}
					style={{ height: "80vh", width: "55vw", overflowY: "scroll" }}
				>
					<GrupoItem />
				</Modal>

				<ul className="list-group col-lg-12 listgrid">
					<li
						key={0}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						<div style={{ width: `${this.state.gridColumns[0]}` }}>
							<strong>Item</strong>
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[1]}` }}
						>
							<strong>Qtde?</strong>
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[2]}` }}
						>
							<strong>Actions </strong>
						</div>
					</li>
					{this.state.grupoItemId !== "" && this.renderItens()}
				</ul>
			</Main>
		);
	}
}

export default compose(
	graphql(GET_GRUPOS),
	graphql(CREATE_ITEM, { name: "createItem" }),
	graphql(UPDATE_ITEM, {
		name: "updateItem"
	}),
	graphql(DELETE_ITEM, { name: "deleteItem" })
)(Itens);
