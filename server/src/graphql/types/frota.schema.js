const frotaTypes = `

    type Frota {
        id: ID!
        nrFrota: Int!
        name: String
        ano: Int!
        chassi: String  
    }

    input FrotaInput {
        nrFrota: Int!
        name: String
        ano: Int!
        chassi: String    
    }
`;

const frotaQueries = `
    frota: [Frota]
    frotaById(id: ID!): Frota
    frotaByNumber(nrFrota: Int!): Frota
`;

const frotaMutations = `
    createFrota(input: FrotaInput!): Frota
    updateFrota(id: ID!, input: FrotaInput!): Frota
    deleteFrota(id: ID!): Boolean
`;

export { frotaTypes, frotaQueries, frotaMutations };
