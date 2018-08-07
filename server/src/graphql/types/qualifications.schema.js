const qualificationsTypes = `

    type Qualification {
        id: ID!
        qualification: String!
        description: String!
    }

    input QualificationInput {
        qualification: String!
        description: String!
    }

`;

const qualificationsQueries = `
    qualificationsByPerson(personId: ID!): [ Qualification! ]!
`;

const qualificationsMutations = `
    createQualification(personId: ID!, input: QualificationInput!): Qualification
    updateQualification(personId: ID!, id: ID!, input: QualificationInput!): Qualification
    deleteQualification(personId: ID!, id: ID!): Boolean
`;

export { qualificationsTypes, qualificationsQueries, qualificationsMutations };
