import { gql } from '@apollo/client';

export const CREATE_LOCATION = gql`
  mutation createLocation($name: String!, $storeId: Int!) {
    createLocation(input: { name: $name, storeId: $storeId }) {
			location{
	      id
	      name
	    }
    }
  }
`;


export const DELETE_LOCATION = gql`
  mutation deleteLocation($id: Int!) {
    deleteLocation(input: { id: $id }) {
      location {
		  	id
		    name	
      }
    	errors
    }
  }
`;

