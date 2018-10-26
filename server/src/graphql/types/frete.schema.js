const freteTypes = `

    type Frete {
		id: ID!
		caminhaoId: ID!
        dtFrete: String!
        qtEntrega: Int!
		clienteId1: ID!
		clienteId2: ID
		frotaId: ID
		frotaTerceiro: String
		kmInicial: Int!
		kmCliente1: Int
		kmCliente2: Int
		kmFinal: Int
		hrMunckInicial: Int
		hrMunckFinal: Int
		qtPedagio: Int
		vlDespesas: Float
		status: String!
		itens: [ItemFrete]
    }

    type ItemFrete {
        item: String!
        imagem: String
	}
	
	type FreteConsulta {
		id: ID
		dtFrete: String
		descCliente1: String
		descCliente2: String
		descFrota: String
		frotaTerceiro: String
		status: String
	}

	type FreteDetalhe {
		id: ID
		dtFrete : String
        caminhaoId: ID
        descCaminhao: String,
        placa: String
        qtEntrega: Int
        descCliente1: String
        descCliente2: String
        nrFrota: String
        descFrota: String
        frotaTerceiro: String
        status : String
        frotaId: ID
        clienteId1: ID
        kmInicial: Int
        kmCliente1: Int
        kmCliente2: Int
    	kmFinal: Int
        hrMunckInicial: Int
        hrMunckFinal: Int
        qtPedagio: Int
		vlDespesas: Float
		vlKm: Float
		vlHoraMunck: Float
		qtKmCliente1: Int
		vlFreteCliente1: Float
		qtKmCliente2: Int
		vlFreteCliente2: Float
		vlFreteTotal: Float
		qtHoraMunck: Int
		vlMunckTotal: Float
        itens: [ItemFrete]
	}	

    input FreteInput {
		caminhaoId: ID!
		qtEntrega: Int!
		dtFrete: String!
		clienteId1: ID!
		clienteId2: ID
		frotaId: ID
		frotaTerceiro: String
		kmInicial: Int!
		kmCliente1: Int
		kmCliente2: Int
		kmFinal: Int
		hrMunckInicial: Int
		hrMunckFinal: Int
		qtPedagio: Int
		vlDespesas: Float
		status: String!
		vlKm: Float
		vlHoraMunck: Float
		qtKmCliente1: Int
		vlFreteCliente1: Float
		qtKmCliente2: Int
		vlFreteCliente2: Float
		vlFreteTotal: Float
		qtHoraMunck: Int
		vlMunckTotal: Float
		itens: [ItemFreteInput]
    }

    input ItemFreteInput {
        item: String!
        imagem: String
    }
`;

const freteQueries = `
    frete: [Frete]
	freteById(id: ID!): Frete
	freteConsulta(dtFreteIni: String, dtFreteFim: String, clienteId: ID, frotaId: ID): [FreteConsulta]
	freteDetalhe(id: ID!): FreteDetalhe
`;

const freteMutations = `
    createFrete(input: FreteInput!): Frete
    updateFrete(id: ID!, input: FreteInput!): Frete
	deleteFrete(id: ID!): Boolean
	deleteFreteAll: Boolean
`;

export { freteTypes, freteQueries, freteMutations };
