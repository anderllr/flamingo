import gql from "graphql-tag";

export const GET_VISTORIA_BY_ID = gql`
	query vistoriaById($id: ID!) {
		vistoriaById(id: $id) {
			id
			frotaId
			clienteId
			dtSaida
			dtPrevisao
			hrSaida
			horimetroSaida
			combustivelSaida
			dtChegada
			hrChegada
			horimetroChegada
			combustivelChegada
			status
			signSaida {
				vistoriador
				checker
				signer
				signerRg
				signerCpf
				imgSignVistoriador
				imgSignChecker
				imgSignCliente
			}
			signChegada {
				vistoriador
				checker
				signer
				signerRg
				signerCpf
				imgSignVistoriador
				imgSignChecker
				imgSignCliente
			}
			grupos {
				grupoItemId
				grupoItem
				imagem
				itens {
					itemId
					item
					conforme
					descNaoConforme
					informaQtde
					qtItem
					fileName
					conformeFim
					descNaoConformeFim
					informaQtdeFim
					qtItemFim
					fileNameFim
				}
			}
		}
	}
`;

export const GET_VISTORIA_DEVOLUCAO = gql`
	query vistoriaDevolucao($frotaId: ID, $clienteId: ID) {
		vistoriaDevolucao(frotaId: $frotaId, clienteId: $clienteId) {
			id
			dtSaida
			dtPrevisao
			frotaId
			nrFrota
			nameFrota
			clienteId
			nameCliente
			fazenda
		}
	}
`;
