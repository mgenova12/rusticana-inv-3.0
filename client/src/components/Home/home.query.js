import { gql } from '@apollo/client';	

	export const GET_PREPCENTERS = gql`
		query {
		  prepcenters  {
		  	id
		    name
		  }
		}
		`

	export const GET_STORES = gql`
		query {
		  stores  {
		  	id
		    name
		  }
		}
		`
