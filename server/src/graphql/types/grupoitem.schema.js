const grupoItemTypes = `

    type GrupoItem {
        id: ID!
        grupoitem: String!
        imagem: String!
        itens: [ Item! ]!
    }

    input GrupoItemInput {
        grupoitem: String!
        imagem: String!
    }
`;

const grupoItemQueries = `
    grupoItem(id: ID!): GrupoItem
`;

const grupoItemMutations = `
    createGrupoItem(input: GrupoItemInput!): GrupoItem
    updateGrupoItem(id: ID!, input: GrupoItemInput!): GrupoItem
    deleteGrupoItem(id: ID!): Boolean
`;

export { grupoItemTypes, grupoItemQueries, grupoItemMutations };
