import gql from 'graphql-tag';

export const GET_USERS = gql`
  query {
    users {
      id
      email
    }
  }
`;

export const AUTH_USER = gql`
  query {
    authUser {
      id
      email
    }
  }
`;

export const AUTH_LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
