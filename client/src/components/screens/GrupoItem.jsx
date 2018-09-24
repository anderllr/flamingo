import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

import Main from "../template/Main";
import { GET_GRUPOS } from "../resources/queries/grupoItensQuery";
import {
	CREATE_GRUPOITEM,
	UPDATE_GRUPOITEM,
	DELETE_GRUPOITEM
} from "../resources/mutations/grupoItensMutation";

import { UPLOAD_FILE } from "../resources/mutations/uploadMutation";

import { validateFields, renderAlert } from "../utils/funcs";
import ImageUploader from "../utils/ImageUploader";

const headerProps = {
	icon: "object-group",
	title: "Grupos de Itens",
	subtitle: "Cadastro de Grupos de Itens"
};

const initialState = {
	grupoItem: {
		id: "",
		grupoItem: "",
		imagem: ""
	},
	alert: {
		type: "",
		title: "",
		msg: []
	},
	gridColumns: ["80%", "20%"],
	file: null,
	imageUrl: ""
};

//TODO
// Upload da imagem

class GrupoItem extends Component {
	constructor(props) {
		super(props);
		this.state = { ...initialState };
	}

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

	clear = async e => {
		e.preventDefault();
		await this.setState({ ...initialState });
	};

	save = e => {
		e.preventDefault();
		let { id, grupoItem, imagem } = this.state.grupoItem;

		let grupoItemInput = {
			grupoItem,
			imagem
		};

		//in this case required fields are the same of userInput object
		const errors = validateFields(
			[{ field: "grupoItem", name: "Nome do Grupo" }],
			this.state.grupoItem
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
			//			console.log("Update user: ", userInput, "Id: ", id);
			this.props
				.updateGrupoItem({ variables: { id, grupoItemInput } })
				.then(() => {
					this.props.data.refetch();
					this.uploadFile(id);
				})
				.catch(e => {
					this.handleErrors(e, "Atualização de Grupo!");
				});
		} else {
			this.props
				.createGrupoItem({ variables: { grupoItemInput } })
				.then(res => {
					id = res.data.createGrupoItem.id;
					this.props.data.refetch();
					this.uploadFile(id);
				})
				.catch(e => {
					this.handleErrors(e, "Adicionar novo Grupo!");
				});
		}
	};

	uploadFile = id => {
		const file = this.state.file;

		if (file && id !== "") {
			//verifica que foi carregado um arquivo então salva
			this.props
				.uploadFile({ variables: { file, screen: "grupoItem", id } })
				.then(res => {
					this.props.data.refetch();

					let grupoItem = { ...this.state.grupoItem };

					grupoItem.imagem = res.data.uploadFile.filename;

					this.setState({ file: null, grupoItem });
				})
				.catch(e => {
					this.handleErrors(e, "Upload de arquivo!");
				});
		}
	};
	select(grupo) {
		const grupoItem = { ...grupo };
		const imageUrl =
			grupoItem.imagem !== "" ? `http://142.93.90.171/${grupoItem.imagem}` : "";
		this.setState({
			grupoItem,
			imageUrl
		});
	}

	delete(grupoItem) {
		const { id } = grupoItem;
		this.props
			.deleteGrupoItem({ variables: { id } })
			.then(() => {
				this.props.data.refetch();
				this.setState({ grupoItem: initialState.grupoItem });
			})
			.catch(e => {
				this.handleErrors(e, "Excluir Grupo!");
			});
	}

	changeField(e) {
		const grupoItem = { ...this.state.grupoItem };

		if (e.target.type === "checkbox") {
			grupoItem[e.target.name] = e.target.checked;
		} else {
			let value =
				e.target.name === "email"
					? e.target.value.toLowerCase()
					: e.target.name !== "imagem"
						? e.target.value.toUpperCase()
						: e.target.value;
			grupoItem[e.target.name] = value;
		}

		this.setState({ grupoItem, alert: initialState.alert });
	}

	onFileChoose = (file, imageUrl) => {
		this.setState({ file, imageUrl });
	};

	renderGrupos() {
		if (this.props.data.loading) {
			return <div>Loading...</div>;
		}
		if (!this.props.loading) {
			return this.props.data.grupos.map(grupoItem => {
				return (
					<li
						key={grupoItem.id}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						<div style={{ width: `${this.state.gridColumns[0]}` }}>
							{grupoItem.grupoItem}
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[1]}` }}
						>
							<button
								className="btn btn-warning"
								onClick={() => this.select(grupoItem)}
							>
								<i className="fa fa-pencil" />
							</button>
							<button
								className="btn btn-danger ml-2"
								onClick={() => this.delete(grupoItem)}
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
					<div className="col-9 col-md-8">
						<div className="col">
							<div className="col-12 col-md-12">
								<div className="form-group">
									<label>Nome do Grupo</label>
									<input
										type="text"
										className="form-control form-control-danger"
										name="grupoItem"
										value={this.state.grupoItem.grupoItem}
										onChange={e => this.changeField(e)}
										placeholder="Informe o nome do Grupo"
									/>
								</div>
							</div>
							<div className="col-12 col-md-12">
								<div className="form-group">
									<label>Imagem</label>
									<input
										type="text"
										className="form-control"
										name="imagem"
										disabled
										value={this.state.grupoItem.imagem}
										onChange={e => this.changeField(e)}
										placeholder="Selecione uma imagem para o grupo"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="col-4 col-md-4">
						<ImageUploader
							onFileChoose={this.onFileChoose}
							imageUrl={this.state.imageUrl}
						/>
					</div>
				</div>
				<div className="row" />
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

				<ul
					className="list-group col-lg-12 listgrid"
					style={{ overflowY: "scroll" }}
				>
					<li
						key={0}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						<div style={{ width: `${this.state.gridColumns[0]}` }}>
							<strong>Nome do Grupo</strong>
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[5]}` }}
						>
							<strong>Actions</strong>
						</div>
					</li>
					{this.renderGrupos()}
				</ul>
			</Main>
		);
	}
}

export default compose(
	graphql(GET_GRUPOS),
	graphql(CREATE_GRUPOITEM, { name: "createGrupoItem" }),
	graphql(UPDATE_GRUPOITEM, { name: "updateGrupoItem" }),
	graphql(DELETE_GRUPOITEM, { name: "deleteGrupoItem" }),
	graphql(UPLOAD_FILE, { name: "uploadFile" })
)(GrupoItem);
