  import { gql } from '@apollo/client';

export const CREATE_STORE_GOOD = gql`
  mutation createStoreGood($storeId: Int!) {
    createStoreGood(input: {storeId: $storeId }) {
			location{
	      id
	      name
	    }
    }
  }
`;


export const DELETE_STORE_GOOD = gql`
  mutation deleteStoreGood($id: Int!) {
    deleteStoreGood(input: { id: $id }) {
      location {
		  	id
		    name	
      }
    	errors
    }
  }
`;
