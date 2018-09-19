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

export const GET_FROTA_GRUPOS = gql`
	query frotaGrupoItem($id: ID!) {
		frotaGrupoItem(id: $id) {
			id
			grupoItem
			imagem
		}
	}
`;

export const GET_FROTA_ITENS_BY_GRUPO = gql`
	query frotaItensByGrupo($id: ID!, $grupoItemId: ID!) {
		frotaItensByGrupo(id: $id, grupoItemId: $grupoItemId) {
			id
			item
			informaQtde
		}
	}
`;
