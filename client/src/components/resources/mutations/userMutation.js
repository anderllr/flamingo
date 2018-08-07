import gql from 'graphql-tag';

export const CREATE_USER = gql`
    mutation createUser($userInput: UserCreateInput!) {
        createUser(input: $userInput) {
            email
        }
    }
`;

export const UPDATE_PASSWORD = gql`
    mutation updateUserPassword($id: ID!, $userPasswordInput: UserUpdatePasswordInput!) {
        updateUserPassword(id: $id, input: $userPasswordInput) 
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id) 
    }
`;