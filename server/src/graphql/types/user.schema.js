const userTypes = `

    # User definition type
    type User {
        id: ID!
        email: String!
    }

    type Token {
        token: String!
    }

    input UserCreateInput {
        email: String!
        password: String!
    }

    input UserUpdatePasswordInput {
        password: String!
    }

`;

const userQueries = `
    users: [ User ]
    user(id: ID!): User!
    authUser: User
    login(email: String!, password: String!): Token
`;

const userMutations = `
    createUser(input: UserCreateInput!): User
    updateUserPassword(id: ID!, input: UserUpdatePasswordInput!): Boolean
    deleteUser(id: ID!): Boolean
`;

export { userTypes, userQueries, userMutations };
