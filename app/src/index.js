import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { Provider } from "react-redux";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
//import { HttpLink } from 'apollo-link-http'
import { createUploadLink } from "apollo-upload-client";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
//import { withClientState } from "apollo-link-state";

import Navigator from "./config/routes";
import { AlertProvider } from "./components/Alert";
import store from "./config/store";

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

const BASE_URL = "http://localhost:3002/flamingoql";
const uploadLink = createUploadLink({ uri: BASE_URL });

const cache = new InMemoryCache();

const middlewareAuth = new ApolloLink((operation, forward) => {
	const token = sessionStorage.getItem("access_token");
	const authorization = token ? `Bearer ${token}` : null;
	operation.setContext({
		headers: {
			authorization
		}
	});

	return forward(operation);
});

const httpLinkAuth = middlewareAuth.concat(uploadLink);

const client = new ApolloClient({
	link: httpLinkAuth,
	cache
});

export default () => (
	<Provider store={store}>
		<ApolloProvider client={client}>
			<AlertProvider>
				<Navigator onNavigationStateChange={null} />
			</AlertProvider>
		</ApolloProvider>
	</Provider>
);
