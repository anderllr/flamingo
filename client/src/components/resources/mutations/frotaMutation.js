import gql from "graphql-tag";

export const CREATE_FROTA = gql`
	mutation createFrota($frotaInput: FrotaInput!) {
		createFrota(input: $frotaInput) {
			id
			nrFrota
		}
	}
`;

export const UPDATE_FROTA = gql`
	mutation updateFrota($id: ID!, $frotaInput: FrotaInput!) {
		updateFrota(id: $id, input: $frotaInput) {
			id
		}
	}
`;

export const DELETE_FROTA = gql`
	mutation deleteFrota($id: ID!) {
		deleteFrota(id: $id)
	}
`;
