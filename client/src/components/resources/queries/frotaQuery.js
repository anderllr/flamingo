import gql from "graphql-tag";

export const GET_FROTA = gql`
	query {
		frota {
			id
			nrFrota
			name
			ano
			chassi
			caminhao
			exceptGrupos {
				grupoItemId
				exceptItens {
					itemId
				}
			}
		}
	}
`;

export const GET_FROTA_CONS = gql`
	query {
		frota {
			id
			nrFrota
			name
		}
	}
`;

export const GET_FROTA_BY_ID = gql`
	query frotaById($id: ID!) {
		query {
			frotaById(id: $id) {
				id
				nrFrota
				name
				ano
				chassi
				caminhao
				exceptGrupos {
					grupoItemId
					exceptItens {
						itemId
					}
				}
			}
		}
	}
`;

export const GET_FROTA_BY_NUMBER = gql`
	query frotaByNumber($nrFrota: Int!) {
		query {
			frotaByNumber(nrFrota: $nrFrota) {
				id
				nrFrota
				name
				ano
				chassi
				caminhao
				exceptGrupos {
					grupoItemId
					exceptItens {
						itemId
					}
				}
			}
		}
	}
`;

export const GET_CAMINHAO = gql`
	query {
		frotaCaminhao {
			id
			nrFrota
			name
			ano
			chassi
			caminhao
		}
	}
`;
