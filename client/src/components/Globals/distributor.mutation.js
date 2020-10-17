import { gql } from '@apollo/client';

export const CREATE_DISTRIBUTOR = gql`
  mutation createDistributor($name: String!) {
    createDistributor(input: { name: $name }) {
			distributor{
	      id
	      name
	    }
    }
  }
`;