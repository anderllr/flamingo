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
		status: String!
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
`;

const freteMutations = `
    createFrete(input: FreteInput!): Frete
    updateFrete(id: ID!, input: FreteInput!): Frete
	deleteFrete(id: ID!): Boolean
	deleteFreteAll: Boolean
`;

export { freteTypes, freteQueries, freteMutations };
