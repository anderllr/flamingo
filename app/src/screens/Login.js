import React, { Component } from "react";
import { KeyboardAvoidingView } from "react-native";
import { ApolloConsumer } from "react-apollo";

import styles from "./styles";
import { Container } from "../components/Container";
import { InputWithTitle } from "../components/InputText";
import { Logo } from "../components/Logo";
import { RoundButton } from "../components/Button";
import { AUTH_LOGIN } from "../config/resources/queries/userQuery";
import { connect } from "react-redux";
import { changeToken } from "../config/actions/login";
import { connectAlert } from "../components/Alert";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			password: ""
		};
	}
	handleInputChange = (field, value) => {
		const newState = {
			...this.state,
			[field]: value
		};
		this.setState(newState);
	};

	loginHandler = async token => {
		if (token) {
			await this.props.changeToken(token);
			await this.props.screenProps.changeLogin(true, token);
		}
	};
	render() {
		return (
			<ApolloConsumer>
				{client => (
					<Container backgroundColor={"#fff"}>
						<KeyboardAvoidingView style={styles.container}>
							<Logo />
							<InputWithTitle
								title="Operador"
								editable={true}
								size={200}
								onChangeText={value =>
									this.handleInputChange("userName", value)
								}
								value={this.state.userName}
							/>
							<InputWithTitle
								title="Senha"
								editable={true}
								secureTextEntry
								size={200}
								onChangeText={value =>
									this.handleInputChange("password", value)
								}
								value={this.state.password}
							/>
							<RoundButton
								text="ACESSAR"
								size={200}
								color="#c39f6b"
								onPress={() =>
									client
										.query({
											query: AUTH_LOGIN,
											variables: {
												userName: this.state.userName,
												password: this.state.password
											}
										})
										.then(({ data }) => {
											let {
												loginapp: { token }
											} = data;
											this.loginHandler(token);
										})
										.catch(error => {
											const { graphQLErrors } = error;
											if (graphQLErrors) {
												this.props.alertWithType(
													"error",
													"Error",
													graphQLErrors[0].message
												);
											}
										})
								}
							/>
						</KeyboardAvoidingView>
					</Container>
				)}
			</ApolloConsumer>
		);
	}
}

export default connect(
	null,
	{ changeToken }
)(connectAlert(Login));
