import React, { Component } from "react";
import { View, KeyboardAvoidingView } from "react-native";

import styles from "./styles";
import { Container } from "../components/Container";
import { InputWithTitle } from "../components/InputText";
import { Logo } from "../components/Logo";
import { RoundButton } from "../components/Button";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { checked: false };
	}
	loginHandler = () => {
		console.log("Logou...");
	};
	render() {
		return (
			<Container backgroundColor={"#fff"}>
				<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
					<View style={styles.container}>
						<Logo />
						<View style={styles.fields}>
							<InputWithTitle title="Operador" editable={true} />
						</View>
						<View style={styles.fields}>
							<InputWithTitle title="Senha" editable={true} secureTextEntry />
						</View>

						<View style={styles.loginButton}>
							<RoundButton text="ACESSAR" onPress={this.loginHandler} />
						</View>
					</View>
				</KeyboardAvoidingView>
			</Container>
		);
	}
}

export default Login;
