import { gql } from '@apollo/client';	

	export const GET_COUNT_BIES = gql`
		query {
		  countBies  {
		  	id
		    name	    
		  }
		}
		`
