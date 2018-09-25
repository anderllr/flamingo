import React, { Component } from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Provider } from "react-redux";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
//import { HttpLink } from 'apollo-link-http'
import { createUploadLink } from "apollo-upload-client";
//import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
import { Font } from "expo";
//import { withClientState } from "apollo-link-state";

import { createRootNavigator } from "./config/routes";
import { AlertProvider } from "./components/Alert";
import store from "./config/store";
import { getToken } from "./utils";

EStyleSheet.build({
	$primaryGreen: "#00665a",
	$darkGreen: "#005147",
	$primaryButton: "#c39f6b",
	$internalButton: "#2c968a",
	$primaryFont: "#364846",
	$backgroundColor: "#f2f2f2",
	$white: "#fff",
	$border: "#ddd",
	$titleText: "#858585",
	$inputText: "#4b5661",
	$darkText: "#364846",
	$listText: "#60614b",
	$lightGray: "#ddd",
	$asideColor: "#f4f6f6",
	$inactiveButton: "#5b6969",
	$shadow: "#d2d2d2"
});

const BASE_URL = "http://142.93.90.171/flamingoql";
const uploadLink = createUploadLink({ uri: BASE_URL });

const cache = new InMemoryCache();

const middlewareAuth = setContext(async (req, { headers }) => {
	//TODO Change temporaly token that puted to
	//	const token = await getToken();
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmE3OTIwMzhhM2EyMTY3NGI4NjQ5OGMiLCJpYXQiOjE1Mzc3MjQwNjJ9.kNVYHJ2T1eBMHfbaNQ_k-X41R2xP9jVrmaA8uHZ4Lgg";
	return {
		...headers,
		headers: {
			authorization: token ? `Bearer ${token}` : null
		}
	};
});
const httpLinkAuth = middlewareAuth.concat(uploadLink);

const client = new ApolloClient({
	link: httpLinkAuth,
	cache
});

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: true, //TODO change here to false to avoid problems
			fontLoaded: false
		};
	}

	async componentDidMount() {
		await Font.loadAsync({
			"lato-bold": require("./assets/fonts/Lato-Bold.ttf")
		});
		this.setState({ fontLoaded: true });
	}

	handleChange = (authenticated, token) => {
		this.setState({ authenticated });
	};

	renderLoading() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text>Loading...</Text>
			</View>
		);
	}

	renderScreen() {
		const Screen = createRootNavigator(this.state.authenticated);

		return <Screen screenProps={{ changeLogin: this.handleChange }} />;
	}

	render() {
		return (
			<Provider store={store}>
				<ApolloProvider client={client}>
					<AlertProvider>
						{this.state.fontLoaded ? this.renderScreen() : this.renderLoading()}
					</AlertProvider>
				</ApolloProvider>
			</Provider>
		);
	}
}
