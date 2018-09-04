import React from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { changeToken } from "../config/actions/login";
import { graphql } from "react-apollo";
import { GET_CLIENTES } from "../config/resources/queries/clientesQuery";
import { compose } from "react-apollo";

const Vistoria = props => (
	<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
		<Text>Logado página principal</Text>
		<Button
			onPress={async () => {
				console.log("Props: ", props);
			}}
			title="Props"
			style={{ marginBottom: "15" }}
			color="#364846"
		/>
		<Button
			onPress={async () => {
				await props.changeToken(null);
				await props.screenProps.changeLogin(false);
			}}
			title="Logout"
			color="#00665a"
		/>
	</View>
);

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
