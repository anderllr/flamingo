import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { changeToken } from "../config/actions/login";
import { graphql, renderToStringWithData } from "react-apollo";
//import { compose } from "react-apollo";

import { GET_CLIENTES } from "../config/resources/queries/clientesQuery";
import { Container } from "../components/Container";
import { RoundButton } from "../components/Button";
import styles from "./styles";

import { ListFrotaSaida } from "./queries";

class Vistoria extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: "saida"
		};
	}

	render() {
		return (
			<Container backgroundColor={"#fff"}>
				<View style={styles.asideMain}>
					<RoundButton
						text="SAÍDA"
						width={100}
						height={35}
						fontSize={8}
						icon="exit"
						onPress={() => this.setState({ active: "saida" })}
						active={this.state.active === "saida"}
					/>
					<RoundButton
						text="DEVOLUÇÃO"
						width={100}
						height={35}
						fontSize={8}
						icon="return-left"
						onPress={() => this.setState({ active: "devolucao" })}
						active={this.state.active === "devolucao"}
					/>
					<RoundButton
						text="CONSULTAS"
						width={100}
						height={35}
						fontSize={8}
						icon="search"
						onPress={() => this.setState({ active: "consultas" })}
						active={this.state.active === "consultas"}
					/>
				</View>
				<View style={styles.backgroundMain}>
					<Text>Lista de itens</Text>
					<ListFrotaSaida />
				</View>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	token: state.reducerLogin.token
});

const WithGraphql = graphql(GET_CLIENTES)(Vistoria);

export default connect(
	mapStateToProps,
	{ changeToken }
)(WithGraphql);

/*
export default compose(
	connect(mapStateToProps, {changeToken}),
	graphql(GET_CLIENTES),
  )(RepositoryList);  */
