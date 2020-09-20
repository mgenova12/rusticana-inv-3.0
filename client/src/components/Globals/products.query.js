import { gql } from '@apollo/client';	

	export const GET_PRODUCTS = gql`
		query {
		  products  {
		  	id
		    name
		    markUp
		    caseQuantity
		    price
		    markedUpPrice
		    category {
		    	id
		    	name
		    }
		    distributor {
		    	id
		    	name
		    }		    
		  }
		}
		`
