import gql from "graphql-tag";

export const GET_CAMINHOES = gql`
	query {
		caminhoes {
			id
			name
			ano
			placa
			itens {
				item
			}
		}
	}
`;

export const GET_CAMINHAO_BY_ID = gql`
	query caminhaoById($id: ID!) {
		caminhaoById(id: $id) {
			id
			name
			ano
			placa
			itens {
				item
			}
		}
	}
`;
