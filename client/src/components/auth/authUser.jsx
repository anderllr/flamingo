import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { AUTH_USER } from '../resources/queries/userQuery';
import { matchPath } from 'react-router';

export default (WrappedComponent) => {
    class AuthUser extends Component {
        componentWillUpdate(nextProps) {
            if (!nextProps.data.loading && !nextProps.data.authUser) {
                console.log('Teria que ir para o login');
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return graphql(AUTH_USER)(AuthUser);
};
