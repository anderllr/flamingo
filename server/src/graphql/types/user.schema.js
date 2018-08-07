const userTypes = `

    # User definition type
    type User {
        id: ID!
        name: String!
        userName: String!
        email: String!
    }

    type Token {
        token: String!
    }

    input UserCreateInput {
        name: String!
        userName: String!
        email: String!
        password: String!
    }

    input UserUpdatePasswordInput {
        name: String!
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
