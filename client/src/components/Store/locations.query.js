import { gql } from '@apollo/client';	

	export const GET_LOCATIONS = gql`
	  query locations($storeId: Int!) {   
	    locations(storeId: $storeId) {
	      id
	      name                     
	    }

	  }
	`