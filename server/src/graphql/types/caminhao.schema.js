const caminhaoTypes = `

    type Caminhao {
        id: ID!
        name: String!
        ano: Int!
        placa: String!
        itens: [ItemCaminhao]
    }

    type ItemCaminhao {
        item: String!
    }

    input CaminhaoInput {
        name: String!
        ano: Int!
        placa: String!
        itens: [ItemCaminhaoInput]
    }

    input ItemCaminhaoInput {
        item: String!
    }

`;

const caminhaoQueries = `
    caminhoes: [Caminhao]
    caminhaoById(id: ID!): Caminhao
`;

const caminhaoMutations = `
    createCaminhao(input: CaminhaoInput!): Caminhao
    updateCaminhao(id: ID!, input: CaminhaoInput!): Caminhao
    deleteCaminhao(id: ID!): Boolean
`;

export { caminhaoTypes, caminhaoQueries, caminhaoMutations };
