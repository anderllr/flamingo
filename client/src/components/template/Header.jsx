import "./Header.css";
import React, { Component, Fragment } from "react";

import Modal from "../utils/Modal";
import { renderAlert } from "../utils/funcs";

const initialState = {
	show: false,
	lastPassword: "",
	newPassword: "",
	password: "",
	alert: {
		type: "",
		title: "",
		msg: []
	}
};

class Header extends Component {
	state = { ...initialState };

	constructor(props) {
		super(props);
	}

	changeField({ target }) {
		const { name, value } = target;
		this.setState({ [name]: value, alert: initialState.alert });
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
		/*		const errors = validateFields(
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
*/
		//		console.log("Update user: ", userInput, "Id: ", id);
		this.props
			.updateUser({ variables: { id, userInput } })
			.then(() => {
				this.props.data.refetch();
			})
			.catch(e => {
				this.handleErrors(e, "Atualização de Usuário!");
			});
	};

	// MODAL FUNCTIONS  //
	openModalGroup = e => {
		e.preventDefault();
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	renderUserForm() {
		return (
			<div className="form">
				<div className="row">
					<div className="col-12 col-md-12">
						<div className="form-group has-danger">
							<label>Senha Anterior</label>
							<input
								type="text"
								className="form-control form-control-danger"
								name="lastPassword"
								type="password"
								value={this.state.lastPassword}
								onChange={e => this.changeField(e)}
								placeholder="Informe a Senha"
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-12">
						<div className="form-group">
							<label>Nova Senha</label>
							<input
								type="text"
								className="form-control"
								name="newPassword"
								type="password"
								value={this.state.newPassword}
								onChange={e => this.changeField(e)}
								placeholder="Informe a nova senha"
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-12">
						<div className="form-group">
							<label>Confirme a Senha</label>
							<input
								className="form-control"
								name="password"
								type="password"
								value={this.state.password}
								onChange={e => this.changeField(e)}
								placeholder="Confirme a Senha"
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
							Limpar
						</button>
					</div>
				</div>
			</div>
		);
	}

	renderChangePassword() {
		const titleProps = {
			icon: "user-secret",
			title: "Mudança de senha"
		};

		return (
			<Fragment>
				<header className="header d-none d-sm-flex flex-column">
					<h1 className="mt-3">
						<i className={`fa fa-${titleProps.icon}`} /> {titleProps.title}
					</h1>
				</header>
				<main className="content container-fluid">
					<div className="p-3 mt-3">{this.renderUserForm()}</div>
				</main>
			</Fragment>
		);
	}

	render() {
		return (
			<header className="header d-none d-sm-flex flex-column">
				<Modal
					show={this.state.show}
					handleClose={this.hideModal}
					style={{ height: "65vh", overflowY: "scroll" }}
				>
					{this.renderChangePassword()}
				</Modal>
				<h1 className="usericon">
					<i
						title="Altera senha usuário"
						className="fa fa-user"
						onClick={e => this.openModalGroup(e)}
					/>
				</h1>
				<h1 className="mt-3">
					<i className={`fa fa-${this.props.icon}`} /> {this.props.title}
				</h1>
				<p className="lead text-muted">{this.props.subtitle}</p>
			</header>
		);
	}
}

export default Header;
