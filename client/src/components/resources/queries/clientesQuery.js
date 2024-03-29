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
			maplink
			obs
		}
	}
`;

export const GET_CLIENTES_CONS = gql`
	query {
		clientes {
			id
			name
		}
	}
`;

export const GET_CLIENTE_BY_ID = gql`
	query cliente($id: ID!) {
		query {
			cliente(id: $id) {
				id
				email
				name
				fazenda
				endereco
				telefone
				celular
				cidadeId
				estadoId
				maplink
				obs
			}
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
				estadoId
				cidadeId
				maplink
				obs
			}
		}
	}
`;
