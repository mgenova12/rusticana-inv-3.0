import { gql } from '@apollo/client';	

	export const GET_CONTAINERS = gql`
		query {
		  containers  {
		  	id
		    name	    
		  }
		}
		`
