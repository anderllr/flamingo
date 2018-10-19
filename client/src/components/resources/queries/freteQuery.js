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
