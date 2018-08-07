const personTypes = `

    type Person {
        id: ID!
        name: String!
        title: String!
        address: String
        city: String!
        phone_number: String!
        email: String!        
        description: String!                
        qualifications: [ Qualification! ]!
    }

    input PersonInput {
        name: String!
        title: String!
        address: String
        city: String!
        phone_number: String!
        email: String!        
        description: String!  
    }
`;

const personQueries = `
    person(id: ID!): Person
`;

const personMutations = `
    createPerson(input: PersonInput!): Person
    updatePerson(id: ID!, input: PersonInput!): Person
    deletePerson(id: ID!): Boolean
`;

export { personTypes, personQueries, personMutations };
