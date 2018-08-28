import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

import Main from "../template/Main";
import { GET_USERS } from "../resources/queries/userQuery";
import {
	CREATE_USER,
	UPDATE_USER,
	UPDATE_PASSWORD,
	DELETE_USER
} from "../resources/mutations/userMutation";

import { validateFields, renderAlert } from "../utils/funcs";

const headerProps = {
	icon: "users",
	title: "Usuários",
	subtitle: "Cadastro de usuários: Incluir, Listar, Alterar e Excluir"
};

const initialState = {
	user: {
		id: "",
		name: "",
		userName: "",
		email: "",
		app: false,
		web: false,
		password: "",
		confirmPassword: ""
	},
	alert: {
		type: "",
		title: "",
		msg: []
	},
	gridColumns: ["30%", "12%", "25%", "8%", "8%", "17%"]
};

class User extends Component {
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
		const {
			id,
			name,
			userName,
			email,
			app,
			web,
			password,
			confirmPassword
		} = this.state.user;

		let userInput = {
			name,
			userName,
			email,
			app,
			web
		};

		//in this case required fields are the same of userInput object
		const errors = validateFields(
			[
				{ field: "name", name: "Nome" },
				{ field: "userName", name: "Usuário" },
				{ field: "email", name: "E-mail" }
			],
			this.state.user
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
				.updateUser({ variables: { id, userInput } })
				.then(() => {
					this.props.data.refetch();
				})
				.catch(e => {
					this.handleErrors(e, "Atualização de Usuário!");
				});
		} else {
			//New user -- Verifica se as senhas estão batendo
			if (
				password !== confirmPassword ||
				password === "" ||
				confirmPassword === ""
			) {
				this.setState({
					alert: {
						type: "danger",
						title: "Erro nas senhas",
						msg: ["Senhas não conferem ou não foram informadas"]
					}
				});
			} else {
				//Add password field
				userInput = { ...userInput, password };

				this.props
					.createUser({ variables: { userInput } })
					.then(() => {
						this.props.data.refetch();
						this.setState({ user: initialState.user });
					})
					.catch(e => {
						this.handleErrors(e, "Adicionar novo usuário!");
					});
			}
		}
	};

	select(user) {
		const { id, name, userName, email, app, web } = user;
		this.setState({
			user: {
				id,
				name,
				userName,
				email,
				app,
				web,
				password: "",
				confirmPassword: ""
			}
		});
	}

	delete(user) {
		const { id } = user;
		this.props
			.deleteUser({ variables: { id } })
			.then(() => {
				this.props.data.refetch();
				this.setState({ user: initialState.user });
			})
			.catch(e => {
				this.handleErrors(e, "Excluir usuário!");
			});
	}

	changeField(e) {
		const user = { ...this.state.user };
		if (e.target.type === "checkbox") {
			user[e.target.name] = e.target.checked;
		} else {
			user[e.target.name] = e.target.value;
		}

		this.setState({ user, alert: initialState.alert });
	}

	renderUsers() {
		if (this.props.data.loading) {
			return <div>Loading...</div>;
		}
		if (!this.props.loading) {
			return this.props.data.users.map(user => {
				return (
					<li
						key={user.id}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						<div style={{ width: `${this.state.gridColumns[0]}` }}>
							{user.name}
						</div>
						<div style={{ width: `${this.state.gridColumns[1]}` }}>
							{user.userName}
						</div>
						<div style={{ width: `${this.state.gridColumns[2]}` }}>
							{user.email}
						</div>

						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[3]}` }}
						>
							<i className={`${user.app ? "fa fa-check" : ""}`} />{" "}
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[4]}` }}
						>
							<i className={`${user.web ? "fa fa-check" : ""}`} />{" "}
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[5]}` }}
						>
							<button
								className="btn btn-warning"
								onClick={() => this.select(user)}
							>
								<i className="fa fa-pencil" />
							</button>
							<button
								className="btn btn-danger ml-2"
								onClick={() => this.delete(user)}
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
								value={this.state.user.name}
								onChange={e => this.changeField(e)}
								placeholder="Nome"
							/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Usuário</label>
							<input
								type="text"
								className="form-control"
								name="userName"
								value={this.state.user.userName}
								onChange={e => this.changeField(e)}
								placeholder="Usuário para acesso"
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>E-mail</label>
							<input
								type="text"
								className="form-control"
								name="email"
								value={this.state.user.email}
								onChange={e => this.changeField(e)}
								placeholder="E-mail"
							/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div>
							<label>Opções</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="checkbox"
								name="app"
								checked={this.state.user.app}
								onChange={e => this.changeField(e)}
							/>
							<label className="form-check-label">Acessa o App</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="checkbox"
								name="web"
								checked={this.state.user.web}
								onChange={e => this.changeField(e)}
							/>
							<label className="form-check-label">Acessa ao site</label>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Senha</label>
							<input
								className="form-control"
								name="password"
								type="password"
								value={this.state.user.password}
								disabled={this.state.user.id !== ""}
								onChange={e => this.changeField(e)}
								placeholder="Informe a senha"
							/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Confirme a Senha</label>
							<input
								className="form-control"
								name="confirmPassword"
								type="password"
								value={this.state.user.confirmPassword}
								disabled={this.state.user.id !== ""}
								onChange={e => this.changeField(e)}
								placeholder="Confirme a senha"
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
							<strong>Usuário</strong>
						</div>
						<div style={{ width: `${this.state.gridColumns[2]}` }}>
							<strong>E-mail</strong>
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[3]}` }}
						>
							<strong>App</strong>
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[4]}` }}
						>
							<strong>Web</strong>
						</div>
						<div
							className="text-center"
							style={{ width: `${this.state.gridColumns[5]}` }}
						>
							<strong>Actions</strong>
						</div>
					</li>
					{this.renderUsers()}
				</ul>
			</Main>
		);
	}
}

export default compose(
	graphql(GET_USERS),
	graphql(CREATE_USER, { name: "createUser" }),
	graphql(UPDATE_USER, { name: "updateUser" }),
	graphql(UPDATE_PASSWORD, { name: "updatePassword" }),
	graphql(DELETE_USER, { name: "deleteUser" })
)(User);
