import { gql } from '@apollo/client';	

	export const GET_STORES = gql`
		query {
		  stores  {
		  	id
		    name
		  }
		}
		`
