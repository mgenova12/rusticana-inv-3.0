import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
	    token
	    errors
    }
  }
`;
