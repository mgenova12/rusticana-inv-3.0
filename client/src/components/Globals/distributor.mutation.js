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

export const DELETE_DISTRIBUTOR = gql`
  mutation deleteDistributor($id: Int!) {
    deleteDistributor(input: { id: $id }) {
      distributor {
		  	id
		    name	
      }
    	errors
    }
  }
`;

