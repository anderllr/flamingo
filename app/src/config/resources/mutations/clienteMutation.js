import gql from "graphql-tag";

export const CREATE_CLIENTE = gql`
	mutation createCliente($clienteInput: ClienteInput!) {
		createCliente(input: $clienteInput) {
			id
		}
	}
`;

export const UPDATE_CLIENTE = gql`
	mutation updateCliente($id: ID!, $clienteInput: ClienteInput!) {
		updateCliente(id: $id, input: $clienteInput) {
			id
		}
	}
`;

export const DELETE_CLIENTE = gql`
	mutation deleteCliente($id: ID!) {
		deleteCliente(id: $id)
	}
`;
