import gql from "graphql-tag";

export const CREATE_ITEM = gql`
	mutation createItem($grupoItemId: ID!, $itemInput: ItemInput!) {
		createItem(grupoItemId: $grupoItemId, input: $itemInput) {
			id
		}
	}
`;

export const UPDATE_ITEM = gql`
	mutation updateItem($grupoItemId: ID!, $id: ID!, $itemInput: ItemInput!) {
		updateItem(grupoItemId: $grupoItemId, id: $id, input: $itemInput) {
			id
		}
	}
`;

export const DELETE_ITEM = gql`
	mutation deleteItem($grupoItemId: ID!, $id: ID!) {
		deleteItem(grupoItemId: $grupoItemId, id: $id)
	}
`;

export const CREATE_GRUPOITEM = gql`
	mutation createGrupoItem($grupoItemInput: GrupoItemInput!) {
		createGrupoItem(input: $grupoItemInput) {
			id
		}
	}
`;

export const UPDATE_GRUPOITEM = gql`
	mutation updateGrupoItem($id: ID!, $grupoItemInput: GrupoItemInput!) {
		updateGrupoItem(id: $id, input: $grupoItemInput) {
			id
		}
	}
`;

export const DELETE_GRUPOITEM = gql`
	mutation deleteGrupoItem($id: ID!) {
		deleteGrupoItem(id: $id)
	}
`;
