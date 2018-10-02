import gql from "graphql-tag";

export const GET_CLIENTES = gql`
	query {
		clientes {
			id
			email
			name
			fazenda
			endereco
			telefone
			celular
			estadoId
			cidadeId
			obs
		}
	}
`;

export const GET_CLIENTE_BY_ID = gql`
	query clienteById($id: ID!) {
		clienteById(id: $id) {
			id
			email
			name
			fazenda
			endereco
			telefone
			celular
			cidadeId
			estadoId
			obs
		}
	}
`;

export const GET_CLIENTE_BY_NAME = gql`
	query clienteByName($name: String!) {
		query {
			clienteByName(name: $name) {
				id
				email
				name
				fazenda
				endereco
				telefone
				celular
				cidadeId
				obs
			}
		}
	}
`;
