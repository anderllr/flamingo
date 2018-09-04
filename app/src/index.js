import React, { Component } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { Provider } from "react-redux";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
//import { HttpLink } from 'apollo-link-http'
import { createUploadLink } from "apollo-upload-client";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
//import { withClientState } from "apollo-link-state";

import { createRootNavigator } from "./config/routes";
import { AlertProvider } from "./components/Alert";
import store from "./config/store";
import { getToken, signIn, signOut } from "./utils";

EStyleSheet.build({
	$primaryGreen: "#00665a",
	$darkGreen: "#005147",
	$primaryButton: "#c39f6b",
	$intenalButton: "#2c968a",
	$primaryFont: "#364846",
	$backgroundColor: "#f2f2f2",
	$white: "#fff",
	$border: "#ddd",
	$titleText: "#858585",
	$inputText: "#4b5661",
	$darkText: "#364846",
	$listText: "#60614b",
	$lightGray: "#ddd"
});

const BASE_URL = "http://192.168.1.109:3002/flamingoql";
const uploadLink = createUploadLink({ uri: BASE_URL });

const cache = new InMemoryCache();

const middlewareAuth = setContext(async (req, { headers }) => {
	const token = await getToken();
	console.log("Token auth: ", token);
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
			authenticated: false
		};
	}

	handleChange = (authenticated, token) => {
		this.setState({ authenticated });
		signIn(token);
	};

	render() {
		const Screen = createRootNavigator(this.state.authenticated);

		return (
			<Provider store={store}>
				<ApolloProvider client={client}>
					<AlertProvider>
						<Screen screenProps={{ changeLogin: this.handleChange }} />
					</AlertProvider>
				</ApolloProvider>
			</Provider>
		);
	}
}
