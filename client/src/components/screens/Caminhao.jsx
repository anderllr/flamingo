import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

import Main from "../template/Main";
import { GET_CAMINHAO } from "../resources/queries/caminhaoQuery";

import {
	CREATE_CAMINHAO,
	UPDATE_CAMINHAO,
	DELETE_CAMINHAO
} from "../resources/mutations/caminhaoMutation";

import Modal from "../utils/Modal";

import { validateFields, renderAlert } from "../utils/funcs";

const headerProps = {
	icon: "truck",
	title: "Caminhao",
	subtitle: "Cadastro de caminhão: Incluir, Listar, Alterar e Excluir"
};

const initialState = {
	caminhao: {
		id: "",
		name: "",
		ano: "",
		placa: "",
		itens: []
	},
	alert: {
		type: "",
		title: "",
		msg: []
	},
	index: 0,
	item: "",
	gridColumns: ["40%", "15%", "20%", "25"]
};

class Caminhao extends Component {
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

	clear = e => {
		e.preventDefault();
		this.setState({ ...initialState });
	};

	save = e => {
		e.preventDefault();
		const { id, name, ano, placa, itens } = this.state.caminhao;

		let caminhaoInput = {
			name,
			ano,
			placa,
			itens
		};

		//in this case required fields are the same of userInput object
		const errors = validateFields(
			[
				{ field: "name", name: "Nome" },
				{ field: "ano", name: "Ano" },
				{ field: "placa", name: "Placa" }
			],
			this.state.caminhao
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
				.updateCaminhao({ variables: { id, caminhaoInput } })
				.then(() => {
					this.props.data.refetch();
				})
				.catch(e => {
					this.handleErrors(e, "Atualização de Caminhao!");
				});
		} else {
			this.props
				.createCaminhao({ variables: { caminhaoInput } })
				.then(() => {
					this.props.data.refetch();
				})
				.catch(e => {
					this.handleErrors(e, "Adicionar Caminhao!");
				});
		}
	};

	select(c) {
		//mapear para normalizar de acordo com os futuros inputs
		const itens = c.itens.map(i => {
			return { item: i.item };
		});
		const { id, name, ano, placa } = c;
		const caminhao = {
			id,
			name,
			ano,
			placa,
			itens
		};

		this.setState({ caminhao });
	}

	delete(caminhao) {
		const { id } = caminhao;
		this.props
			.deleteCaminhao({ variables: { id } })
			.then(() => {
				this.props.data.refetch();
				this.setState({ caminhao: initialState.caminhao });
			})
			.catch(e => {
				this.handleErrors(e, "Excluir caminhão!");
			});
	}

	changeField(e) {
		const caminhao = { ...this.state.caminhao };
		caminhao[e.target.name] = e.target.value;

		this.setState({ caminhao, alert: initialState.alert });
	}

	//**** TRATATIVA PARA OS ITENS */
	saveItem(e) {
		e.preventDefault();
		if (this.state.item !== "") {
			const { caminhao } = this.state;
			const itens = [...caminhao.itens.filter(i => i.item != this.state.item)];

			itens.push({ item: this.state.item });
			caminhao.itens = itens;
			this.setState({ caminhao });
		}
	}

	selectItem(item, index) {
		this.setState({ item: item.item, index });
	}

	deleteItem(index) {
		const { caminhao } = this.state;
		const itens = [...caminhao.itens];
		itens.splice(index, 1);
		caminhao.itens = itens;

		this.setState({ caminhao });
	}

	//*******************/
	// MODAL FUNCTIONS  //
	openModalGroup = e => {
		e.preventDefault();
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	renderCaminhao() {
		if (this.props.data.loading) {
			return <div>Loading...</div>;
		}
		if (!this.props.loading) {
			return this.props.data.caminhoes.map(caminhao => {
				return (
					<li
						key={caminhao.id}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						<div style={{ width: `${this.state.gridColumns[0]}` }}>
							{caminhao.name}
						</div>
						<div style={{ width: `${this.state.gridColumns[1]}` }}>
							{caminhao.ano}
						</div>
						<div style={{ width: `${this.state.gridColumns[2]}` }}>
							{caminhao.placa}
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[3]}` }}
						>
							<button
								className="btn btn-warning"
								onClick={() => this.select(caminhao)}
							>
								<i className="fa fa-pencil" />
							</button>
							<button
								className="btn btn-danger ml-2"
								onClick={() => this.delete(caminhao)}
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
					<div className="col-12 col-md-5">
						<div className="form-group">
							<label>Nome</label>
							<input
								type="text"
								className="form-control"
								name="name"
								value={this.state.caminhao.name}
								onChange={e => this.changeField(e)}
								placeholder="Nome da Caminhao"
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
								value={this.state.caminhao.ano}
								onChange={e => this.changeField(e)}
								placeholder="Ano da caminhao"
							/>
						</div>
					</div>
					<div className="col-12 col-md-2">
						<div className="form-group has-danger">
							<label>Placa</label>
							<input
								type="text"
								className="form-control form-control-danger"
								name="placa"
								value={this.state.caminhao.placa}
								onChange={e => this.changeField(e)}
								placeholder="Nr. placa"
							/>
						</div>
					</div>
					<div className="col-12 col-md-3">
						<div>
							<label>{}</label>
						</div>
						<button
							className="btn btn-info ml-2"
							onClick={e => this.openModalGroup(e)}
							disabled={this.state.caminhao.name === ""}
						>
							Itens para foto
						</button>
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

	renderItens() {
		const titleProps = {
			icon: "object-group",
			title: "Itens para fotografia",
			subtitle: "Adicione os itens que deseja fotos",
			hideIconUser: true
		};

		return (
			<Main {...titleProps}>
				<div className="form">
					<div className="row">
						<div className="col-12 col-md-8">
							<div className="form-group">
								<label>Item</label>
								<input
									type="text"
									className="form-control"
									name="item"
									value={this.state.item}
									onChange={e => this.setState({ item: e.target.value })}
									placeholder="Descrição do Item"
								/>
							</div>
						</div>
						<div className="col-12 col-md-4">
							<div className="form-group">
								<label>Opções</label>
								<div className="col-12 d-flex justify-content-end align-items-end align-self-baseline">
									<button
										type="submit"
										className="btn btn-primary"
										onClick={e => this.saveItem(e)}
									>
										Salvar
									</button>

									<button
										className="btn btn-info ml-2"
										onClick={e => this.setState({ item: "" })}
									>
										Novo
									</button>
								</div>
							</div>
						</div>
					</div>
					<hr />
				</div>
				<ul className="list-group col-lg-12 listgrid">
					<li
						key={0}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						<div style={{ width: "75%" }}>
							<strong>Itens</strong>
						</div>
						<div className="text-center" style={{ width: "25%" }}>
							<strong>Ações</strong>
						</div>
					</li>
					{this.renderListaItens()}
				</ul>
			</Main>
		);
	}

	renderListaItens() {
		return this.state.caminhao.itens.map((item, index) => {
			return (
				<li
					key={index}
					className="list-group-item d-flex justify-content-between align-items-center"
				>
					<div style={{ width: "75%" }}>{item.item}</div>
					<div className="text-center" style={{ width: "25%" }}>
						<button
							className="btn btn-warning"
							onClick={() => this.selectItem(item)}
						>
							<i className="fa fa-pencil" />
						</button>
						<button
							className="btn btn-danger ml-2"
							onClick={() => this.deleteItem(index)}
						>
							<i className="fa fa-trash" />
						</button>
					</div>
				</li>
			);
		});
	}

	render() {
		return (
			<Main {...headerProps}>
				<form>{this.renderForm()}</form>

				<Modal
					show={this.state.show}
					handleClose={this.hideModal}
					style={{ height: "80vh", overflowY: "scroll" }}
				>
					{this.renderItens()}
				</Modal>

				<ul className="list-group col-lg-12 listgrid">
					<li
						key={0}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						<div style={{ width: `${this.state.gridColumns[0]}` }}>
							<strong>Nome</strong>
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[1]}` }}
						>
							<strong>Ano</strong>
						</div>
						<div style={{ width: `${this.state.gridColumns[2]}` }}>
							<strong>Placa</strong>
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[3]}` }}
						>
							<strong>Actions</strong>
						</div>
					</li>
					{this.renderCaminhao()}
				</ul>
			</Main>
		);
	}
}

export default compose(
	graphql(GET_CAMINHAO),
	graphql(CREATE_CAMINHAO, { name: "createCaminhao" }),
	graphql(UPDATE_CAMINHAO, { name: "updateCaminhao" }),
	graphql(DELETE_CAMINHAO, { name: "deleteCaminhao" })
)(Caminhao);
