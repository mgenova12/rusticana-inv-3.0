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

	export const GET_STORE = gql`
	  query getStore($storeId: Int!) {
	    getStore(storeId: $storeId) {
	      id
	      name
	    }
	  }
	`

	export const GET_PREPCENTER = gql`
	  query getPrepcenter($prepcenterId: Int!) {
	    getPrepcenter(prepcenterId: $prepcenterId) {
	      id
	      name
	    }
	  }
	`
