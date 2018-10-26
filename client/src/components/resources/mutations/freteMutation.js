import gql from "graphql-tag";

export const UPDATE_FRETE = gql`
	mutation updateFrete($id: ID!, $freteInput: FreteInput!) {
		updateFrete(id: $id, input: $freteInput) {
			dtFrete
			id
		}
	}
`;

export const DELETE_FRETE = gql`
	mutation deleteFrete($id: ID!) {
		deleteFrete(id: $id)
	}
`;
