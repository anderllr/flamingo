import gql from "graphql-tag";

export const GET_ITEM = gql`
	query item($grupoItemId: ID!, $id: ID!) {
		item(grupoItemId: $grupoItemId, id: $id) {
			id
			item
			informaQtde
		}
	}
`;

export const GET_ITENS_BY_GRUPO = gql`
	query itensByGrupo($grupoItemId: ID!) {
		itensByGrupo(grupoItemId: $grupoItemId) {
			id
			item
			informaQtde
		}
	}
`;

export const GET_GRUPO = gql`
	query grupoItem($id: ID!) {
		grupoItem(id: $id) {
			id
			grupoItem
			imagem
		}
	}
`;

export const GET_GRUPOS = gql`
	query {
		grupos {
			id
			grupoItem
			imagem
			itens {
				id
				item
			}
		}
	}
`;
