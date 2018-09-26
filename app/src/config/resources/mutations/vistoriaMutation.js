import gql from "graphql-tag";

export const CREATE_VISTORIA = gql`
	mutation createVistoria($vistoriaInput: VistoriaInput!) {
		createVistoria(input: $vistoriaInput) {
			id
		}
	}
`;
