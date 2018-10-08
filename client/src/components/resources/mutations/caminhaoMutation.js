import gql from "graphql-tag";

export const CREATE_CAMINHAO = gql`
	mutation createCaminhao($caminhaoInput: CaminhaoInput!) {
		createCaminhao(input: $caminhaoInput) {
			id
		}
	}
`;

export const UPDATE_CAMINHAO = gql`
	mutation updateCaminhao($id: ID!, $caminhaoInput: CaminhaoInput!) {
		updateCaminhao(id: $id, input: $caminhaoInput) {
			name
			id
		}
	}
`;

export const DELETE_CAMINHAO = gql`
	mutation deleteCaminhao($id: ID!) {
		deleteCaminhao(id: $id)
	}
`;
