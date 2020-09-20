import { gql } from '@apollo/client';	

	export const GET_DISTRIBUTORS = gql`
		query {
		  distributors  {
		  	id
		    name	    
		  }
		}
		`
