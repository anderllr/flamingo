import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import CheckboxTree from "react-checkbox-tree";

import Main from "../template/Main";
import { GET_FROTA } from "../resources/queries/frotaQuery";
import { GET_GRUPOS } from "../resources/queries/grupoItensQuery";

import {
	CREATE_FROTA,
	UPDATE_FROTA,
	DELETE_FROTA
} from "../resources/mutations/frotaMutation";

import Modal from "../utils/Modal";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

import { validateFields, renderAlert } from "../utils/funcs";

const headerProps = {
	icon: "empire",
	title: "Frota",
	subtitle: "Cadastro de frota: Incluir, Listar, Alterar e Excluir"
};

const initialState = {
	frota: {
		id: "",
		nrFrota: "",
		name: "",
		ano: "",
		chassi: "",
		caminhao: false
	},
	alert: {
		type: "",
		title: "",
		msg: []
	},
	gridColumns: ["10%", "40%", "10%", "20%", "20"],
	checked: [],
	expanded: [],
	nodes: [],
	nodesAll: []
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

	componentWillReceiveProps(nextProps) {
		const nodes = [];
		const nodesAll = [];
		const checked = [];
		const expanded = [];

		//vou montar aqui o node
		if (!nextProps.getGrupos.loading && nextProps.getGrupos.grupos) {
			nextProps.getGrupos.grupos.map(grupo => {
				const grupoNode = {
					value: grupo.id,
					label: grupo.grupoItem,
					children: []
				};
				expanded.push(grupo.id);
				//agora vai adicionar o children
				grupo.itens.map(item => {
					const value = `${grupo.id}|${item.id}`;
					const itemNode = {
						value,
						label: item.item,
						icon: <i className="fa fa-angle-right" />
					};
					checked.push(value);
					nodesAll.push(value);
					grupoNode.children.push(itemNode);
				});

				nodes.push(grupoNode);
			});

			this.setState({ nodes, expanded, checked, nodesAll });
		}
	}

	clear = e => {
		const nodes = [...this.state.nodes];
		const nodesAll = [...this.state.nodesAll];
		e.preventDefault();
		this.setState({ ...initialState, nodes, nodesAll });
	};

	retornaExcepts = () => {
		const exceptGrupos = [];
		let exceptItens = [];
		let grupoant = "";
		let itemSplit = [];
		let difference = this.state.nodesAll.filter(
			x => !this.state.checked.includes(x)
		);
		difference.map(item => {
			itemSplit = item.split("|");

			if (grupoant === "") grupoant = itemSplit[0];
			if (itemSplit.length > 1) {
				exceptItens.push({ itemId: itemSplit[1] });
			}

			if (grupoant !== itemSplit[0]) {
				//se o grupoant é <> '' significa que mudou de grupo
				exceptGrupos.push({ grupoItemId: grupoant, exceptItens });
				exceptItens = [];
				grupoant = itemSplit[0];
			}
		});
		//O último depois que saiu do loop
		if (itemSplit[0]) {
			exceptGrupos.push({ grupoItemId: itemSplit[0], exceptItens });
		}
		return exceptGrupos;
	};

	save = e => {
		e.preventDefault();
		const { id, nrFrota, name, ano, chassi, caminhao } = this.state.frota;

		const exceptGrupos = this.retornaExcepts();
		let frotaInput = {
			nrFrota: nrFrota === "" ? 0 : nrFrota,
			name,
			ano,
			chassi,
			caminhao,
			exceptGrupos
		};

		//in this case required fields are the same of userInput object
		const errors = validateFields(
			[{ field: "name", name: "Nome" }, { field: "ano", name: "Ano" }],
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
				.then(res => {
					const frota = {
						...this.state.frota,
						nrFrota: res.data.createFrota.nrFrota
					};
					this.setState({ frota });
					this.props.data.refetch();
				})
				.catch(e => {
					this.handleErrors(e, "Adicionar Frota!");
				});
		}
	};

	select(frota) {
		this.setState({ frota });

		//Adjust for except grups of itens
		const exceptions = [];
		frota.exceptGrupos.map(grupo => {
			grupo.exceptItens.map(item => {
				exceptions.push(`${grupo.grupoItemId}|${item.itemId}`);
			});
		});

		let checked = this.state.nodesAll.filter(x => !exceptions.includes(x));

		this.setState({ checked });
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

	//*******************/
	// MODAL FUNCTIONS  //
	openModalGroup = e => {
		e.preventDefault();
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	//***********************/
	// TREEVIEW FUNCTIONS  //
	onCheck = checked => {
		this.setState({ checked });
	};

	onExpand = expanded => {
		this.setState({ expanded });
	};

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
					<div className="col-12 col-md-3">
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
					<div className="col-12 col-md-6">
						<div>
							<label>{}</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="checkbox"
								name="caminhao"
								checked={this.state.frota.caminhao}
								onChange={e => this.changeField(e)}
							/>
							<label className="form-check-label">É caminhão?</label>
						</div>
						<button
							className="btn btn-info ml-2"
							onClick={e => this.openModalGroup(e)}
							disabled={this.state.frota.nrFrota === ""}
						>
							Itens
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

	renderGrupoItem() {
		const { checked, expanded } = this.state;

		const titleProps = {
			icon: "object-group",
			title: "Grupos de Itens",
			subtitle: "Desmarque os grupos e itens não utilizados para essa Frota",
			hideIconUser: true
		};

		if (this.props.getGrupos.loading) {
			return <div>Loading...</div>;
		}

		return (
			<Main {...titleProps}>
				<form>
					<CheckboxTree
						checked={checked}
						expanded={expanded}
						nodes={this.state.nodes}
						onCheck={this.onCheck}
						onExpand={this.onExpand}
					/>
				</form>
			</Main>
		);
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
					{this.renderGrupoItem()}
				</Modal>

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
	graphql(GET_GRUPOS, { name: "getGrupos" }),
	graphql(CREATE_FROTA, { name: "createFrota" }),
	graphql(UPDATE_FROTA, { name: "updateFrota" }),
	graphql(DELETE_FROTA, { name: "deleteFrota" })
)(Frota);
