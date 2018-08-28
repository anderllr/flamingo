import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Typeahead } from "react-bootstrap-typeahead";

import Main from "../template/Main";
import {
	GET_ITENS_BY_GRUPO,
	GET_GRUPOS
} from "../resources/queries/GrupoItensQuery";
import {
	CREATE_GRUPOITEM,
	CREATE_ITEM,
	UPDATE_ITEM,
	UPDATE_GRUPOITEM,
	DELETE_ITEM,
	DELETE_GRUPOITEM
} from "../resources/mutations/GrupoItensMutation";

import { validateFields, renderAlert } from "../utils/funcs";

const headerProps = {
	icon: "compass",
	title: "Itens",
	subtitle: "Cadastro de itens: Incluir, Listar, Alterar e Excluir"
};

const initialState = {
	item: {
		id: "",
		item: "",
		informaQtde: false,
		grupoItemId: "234"
	},
	alert: {
		type: "",
		title: "",
		msg: []
	},
	gridColumns: ["80%", "20%"]
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
		this.setState({ ...initialState });
	};

	save = e => {
		e.preventDefault();

		const { id, item, informaQtde, grupoItemId } = this.state.cliente;

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
				.updateItem({ variables: { grupoItemId, id, itemInput } })
				.then(() => {
					this.props.data.refetch();
				})
				.catch(e => {
					this.handleErrors(e, "Atualização de Item!");
				});
		} else {
			this.props
				.createItem({ variables: { grupoItemId, itemInput } })
				.then(() => {
					this.props.data.refetch();
					this.setState({ item: initialState.item });
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
				variables: { grupoItemId: this.state.item.grupoItemId, id }
			})
			.then(() => {
				this.props.data.refetch();
				this.setState({ item: initialState.item });
			})
			.catch(e => {
				this.handleErrors(e, "Excluir item!");
			});
	}

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
					const item = { ...this.state.item };
					item.grupoItemId = e[0].id;

					this.setState({ item, alert: initialState.alert });
				}
			}
		}
	};

	renderItens() {
		if (this.props.data.loading) {
			return <div>Loading...</div>;
		}
		if (!this.props.loading) {
			return this.props.data
				.itensByGrupo({
					variables: {
						grupoItemId: this.state.item.grupoItemId
					}
				})
				.map(item => {
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
									onClick={() => this.delete(item)}
								>
									<i className="fa fa-trash" />
								</button>
							</div>
						</li>
					);
				});
		}
	}
	*renderForm() {
		return (
			<div className="form">
				<div className="row">
					<div className="col-12 col-md-4">
						<div className="form-group">
							<label>Cidade</label>
							<Typeahead
								labelKey="grupoItem"
								multiple={false}
								options={this.props.data.grupos.map(({ grupoItem, id }) => {
									return { grupoItem, id };
								})}
								key="id"
								onChange={e => this.onChangeComplete(e)}
								selected={[
									{
										id: this.state.item.grupoId,
										name: this.props.data
											.grupoItem({
												variables: { grupoItemId: this.state.item.grupoItemId }
											})
											.map(gi => {
												return gi[0].grupoItem;
											})
									}
								]}
								placeholder="Escolha um grupo..."
							/>
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
						<div>
							<label>Opção</label>
						</div>
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

				<ul className="list-group col-lg-12 listgrid">
					<li
						key={0}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						<div style={{ width: `${this.state.gridColumns[0]}` }}>
							<strong>Item</strong>
						</div>
						<div style={{ width: `${this.state.gridColumns[1]}` }}>
							<strong>Qtde?</strong>
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[2]}` }}
						>
							<strong>Actions</strong>
						</div>
					</li>
					{this.renderItens()}
				</ul>
			</Main>
		);
	}
}

export default compose(
	graphql(GET_ITENS_BY_GRUPO),
	graphql(GET_GRUPOS),
	graphql(CREATE_ITEM, { name: "createItem" }),
	graphql(UPDATE_ITEM, { name: "updateItem" }),
	graphql(DELETE_ITEM, { name: "deleteItem" }),
	graphql(CREATE_GRUPOITEM, { name: "createCliente" }),
	graphql(UPDATE_GRUPOITEM, { name: "updateCliente" }),
	graphql(DELETE_GRUPOITEM, { name: "deleteCliente" })
)(Itens);
