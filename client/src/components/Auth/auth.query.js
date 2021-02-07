import { gql } from '@apollo/client';	

	export const GET_CURRENT_USER = gql`
		query {
		  currentUser  {
		  	id
		    firstName
		    lastName
		  }
		}
		`

	export const GET_CURRENT_STORE = gql`
	  query currentStore($id: Int!, $storeName: String!) { 
	    currentStore(id: $id, storeName: $storeName) {
	      id
	      name
	    }
	  }
	`