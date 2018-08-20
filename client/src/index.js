import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './main/App';

const BASE_URL = '/flamingoql';

const httpLink = new HttpLink({
    uri: BASE_URL
});

const cache = new InMemoryCache();

const middlewareAuth = new ApolloLink((operation, forward) => {
    const token = sessionStorage.getItem('access_token');
    console.log('Pegou o token: ', token);
    const authorization = token ? `Bearer ${token}` : null;
    operation.setContext({
        headers: {
            authorization
        }
    });

    return forward(operation);
});

const httpLinkAuth = middlewareAuth.concat(httpLink);

const client = new ApolloClient({
    link: httpLinkAuth,
    cache
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, document.getElementById('root'));
