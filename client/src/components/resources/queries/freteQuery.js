import gql from "graphql-tag";

export const GET_FRETE_CONSULTA = gql`
	query freteConsulta(
		$dtFreteIni: String
		$dtFreteFim: String
		$clienteId: ID
		$frotaId: ID
	) {
		freteConsulta(
			dtFreteIni: $dtFreteIni
			dtFreteFim: $dtFreteFim
			clienteId: $clienteId
			frotaId: $frotaId
		) {
			id
			dtFrete
			descCliente1
			descCliente2
			descFrota
			frotaTerceiro
			status
		}
	}
`;

export const GET_FRETE_DETALHE = gql`
	query freteDetalhe($id: ID!) {
		freteDetalhe(id: $id) {
			id
			dtFrete
			caminhaoId
			descCaminhao
			placa
			qtEntrega
			descCliente1
			descCliente2
			nrFrota
			descFrota
			frotaTerceiro
			status
			frotaId
			clienteId1
			kmInicial
			kmCliente1
			kmCliente2
			kmFinal
			hrMunckInicial
			hrMunckFinal
			qtPedagio
			vlDespesas
			vlKm
			vlHoraMunck
			qtKmCliente1
			vlFreteCliente1
			qtKmCliente2
			vlFreteCliente2
			vlFreteTotal
			qtHoraMunck
			vlMunckTotal
			itens {
				item
				imagem
			}
		}
	}
`;
