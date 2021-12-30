import {gql} from '@apollo/client';

export const GET_USER = gql`
  query {
    user {
      id
      name
      login
      group
    }
  }
`;

export const GET_POSTS = gql`
  query {
    findManyPost(where: {text: {not: {equals: ""}}}) {
      id
      title
      text
      user {
        id
        name
      }
    }
  }
`;