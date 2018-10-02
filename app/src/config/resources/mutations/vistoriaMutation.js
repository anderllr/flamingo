import gql from "graphql-tag";

export const CREATE_VISTORIA = gql`
	mutation createVistoria($vistoriaInput: VistoriaInput!) {
		createVistoria(input: $vistoriaInput) {
			id
		}
	}
`;

export const UPDATE_VISTORIA = gql`
	mutation updateVistoria($id: ID!, $vistoriaInput: VistoriaInput!) {
		createVistoria(id: $id, input: $vistoriaInput) {
			id
		}
	}
`;
