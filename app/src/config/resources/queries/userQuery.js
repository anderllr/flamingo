import gql from "graphql-tag";

export const GET_USERS = gql`
	query {
		users {
			id
			email
			userName
			app
			web
			name
		}
	}
`;

export const AUTH_USER = gql`
	query {
		authUser {
			id
			email
		}
	}
`;

export const AUTH_LOGIN = gql`
	query loginapp($userName: String!, $password: String!) {
		loginapp(userName: $userName, password: $password) {
			token
		}
	}
`;
