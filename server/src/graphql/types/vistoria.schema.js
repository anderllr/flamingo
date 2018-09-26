const vistoriaTypes = `

    type Vistoria {
        id: ID!
        frotaId: ID!
        clienteId: ID!        
        dtSaida: String!
        dtPrevisao: String!
        hrSaida: String!        
        horimetroSaida: Int!
        combustivelSaida: Int!        
        dtChegada: String
        hrChegada: String
        horimetroChegada: Int
        combustivelChegada: Int
        status: String!
        signSaida: [SignSaida]
        signChegada: [SignChegada]
        grupos: [VistoriaGrupo]
    }

    type VistoriaGrupo {
        grupoItemId: ID!
        grupoItem: String!
        itens: [VistoriaItem]
    }

    type VistoriaItem {
        itemId: ID!
        conforme: String!
        descNaoConforme: String
        informaQtde: Boolean
        qtItem: Int
        fileName: String!
        conformeFim: String
        descNaoConformeFim: String
        informaQtdeFim: Boolean
        qtItemFim: Int
        fileNameFim: String
    }

    type SignSaida {
        vistoriador: String!
        checker: String!
        signer: String!
        signerRg: String!
        signerCpf: String!
        imgSignVistoriador: String!
        imgSignChecker: String!
        imgSignCliente: String!
    }

    type SignChegada {
        vistoriador: String!
        checker: String!
        signer: String!
        signerRg: String!
        signerCpf: String!
        imgSignVistoriador: String!
        imgSignChecker: String!
        imgSignCliente: String!
    }    

    input VistoriaInput {
        frotaId: ID!
        clienteId: ID!        
        dtSaida: String!
        dtPrevisao: String!
        hrSaida: String!        
        horimetroSaida: Int!
        combustivelSaida: Int!        
        dtChegada: String
        hrChegada: String
        horimetroChegada: Int
        combustivelChegada: Int
        status: String!
        signSaida: [SignSaidaInput]
        signChegada: [SignChegadaInput]
        grupos: [VistoriaGrupoInput]
    }

    input VistoriaGrupoInput {
        grupoItemId: ID!
        grupoItem: String!
        itens: [VistoriaItemInput]
    }

    input VistoriaItemInput {
        itemId: ID!
        conforme: String!
        descNaoConforme: String
        informaQtde: Boolean
        qtItem: Int
        fileName: String!
        conformeFim: String
        descNaoConformeFim: String
        informaQtdeFim: Boolean
        qtItemFim: Int
        fileNameFim: String
    }

    input SignSaidaInput {
        vistoriador: String!
        checker: String!
        signer: String!
        signerRg: String!
        signerCpf: String!
        imgSignVistoriador: String!
        imgSignChecker: String!
        imgSignCliente: String!
    }

    input SignChegadaInput {
        vistoriador: String!
        checker: String!
        signer: String!
        signerRg: String!
        signerCpf: String!
        imgSignVistoriador: String!
        imgSignChecker: String!
        imgSignCliente: String!
    }    
`;

const vistoriaQueries = `
    vistoria: [Vistoria]
    vistoriaById(id: ID!): Vistoria
`;

const vistoriaMutations = `
    createVistoria(input: VistoriaInput!): Vistoria
    updateVistoria(id: ID!, input: VistoriaInput!): Vistoria
    deleteVistoria(id: ID!): Boolean
`;

export { vistoriaTypes, vistoriaQueries, vistoriaMutations };
