const frotaTypes = `

    type Frota {
        id: ID!
        nrFrota: Int!
        name: String
        ano: Int!
        chassi: String
        modeloId: String!
        marcaId: String!        
    }

    type Marca {
        id: ID!
        marca: String
    }    

    type Modelo {
        id: ID!
        modelo: String
    }    

    input FrotaInput {
        nrFrota: Int!
        name: String
        ano: Int!
        chassi: String
        modeloId: String!
        marcaId: String!        
    }

`;

const frotaQueries = `
    frota(id: ID!): Frota
    frotaByNumber(nrFrota: Int!): Frota
    marca(id: ID!): Marca
    modelo(id: ID!): Modelo
`;

const frotaMutations = `
    createFrota(input: FrotaInput!): Frota
    createMarca(marca: String!): Marca
    createModelo(modelo: String!): Modelo      
    updateFrota(id: ID!, input: FrotaInput!): Frota
    updateMarca(id: ID!, marca: String!): Marca
    updateModelo(id: ID!, modelo: String!): Modelo
    deleteFrota(id: ID!): Boolean
    deleteMarca(id: ID!): Boolean
    deleteModelo(id: ID!): Boolean                
`;

export { frotaTypes, frotaQueries, frotaMutations };
