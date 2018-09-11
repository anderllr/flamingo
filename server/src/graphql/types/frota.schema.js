const frotaTypes = `

    type Frota {
        id: ID!
        nrFrota: Int!
        name: String
        ano: Int!
        chassi: String,
        caminhao: Boolean
    }

    input FrotaInput {
        nrFrota: Int!
        name: String
        ano: Int!
        chassi: String,
        caminhao: Boolean    
    }
`;

const frotaQueries = `
    frota: [Frota]
    frotaById(id: ID!): Frota
    frotaByNumber(nrFrota: Int!): Frota
    frotaCaminhao: [Frota]
`;

const frotaMutations = `
    createFrota(input: FrotaInput!): Frota
    updateFrota(id: ID!, input: FrotaInput!): Frota
    deleteFrota(id: ID!): Boolean
`;

export { frotaTypes, frotaQueries, frotaMutations };
