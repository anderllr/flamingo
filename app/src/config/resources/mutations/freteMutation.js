import gql from "graphql-tag";

export const CREATE_FRETE = gql`
	mutation createFrete($freteInput: FreteInput!) {
		createFrete(input: $freteInput) {
			id
		}
	}
`;

export const UPDATE_FRETE = gql`
	mutation updateFrete($id: ID!, $freteInput: FreteInput!) {
		updateFrete(id: $id, input: $freteInput) {
			dtFrete
			id
		}
	}
`;
