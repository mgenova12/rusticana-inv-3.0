import { gql } from '@apollo/client';	

	export const GET_PREPCENTERS = gql`
		query {
		  prepcenters  {
		  	id
		    name
		  }
		}
		`
