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
        modelos: [ Modelo! ]!
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
    frota: [Frota]
    frotaById(id: ID!): Frota
    frotaByNumber(nrFrota: Int!): Frota
    marca: [Marca]
    marcaById(id: ID!): Marca
    modelosByMarca(marcaId: ID!): [Modelo]    
`;

const frotaMutations = `
    createFrota(input: FrotaInput!): Frota
    createMarca(marca: String!): Marca    
    updateFrota(id: ID!, input: FrotaInput!): Frota
    updateMarca(id: ID!, marca: String!): Marca
    deleteFrota(id: ID!): Boolean
    deleteMarca(id: ID!): Boolean
    createModelo(marcaId: ID!, modelo: String!): Modelo     
    updateModelo(marcaId: ID!, id: ID!, modelo: String!): Modelo    
    deleteModelo(marcaId: ID!, id: ID!): Boolean                
`;

export { frotaTypes, frotaQueries, frotaMutations };
