import gql from 'graphql-tag';

export const GET_FRETE = gql`
	query {
		frete {
			id
			caminhaoId
			qtEntrega
			dtFrete
			clienteId1
			clienteId2
			frotaId
			frotaTerceiro
			kmInicial
			kmCliente1
			kmCliente2
			kmFinal
			hrMunckInicial
			hrMunckFinal
			qtPedagio
			vlPedagio1
			vlPedagio2
			vlPedagio3
			vlDespesas
			status
			itens {
				item
				imagem
			}
		}
	}
`;

export const GET_FRETE_BY_ID = gql`
	query freteById($id: ID!) {
		freteById(id: $id) {
			id
			caminhaoId
			qtEntrega
			dtFrete
			clienteId1
			clienteId2
			frotaId
			frotaTerceiro
			kmInicial
			kmCliente1
			kmCliente2
			kmFinal
			hrMunckInicial
			hrMunckFinal
			qtPedagio
			vlPedagio1
			vlPedagio2
			vlPedagio3
			vlDespesas
			status
			itens {
				item
				imagem
			}
		}
	}
`;
