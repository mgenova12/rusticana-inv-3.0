import { gql } from '@apollo/client';	

	export const GET_PREPPED_PRODUCTS = gql`
		query {
		  preppedProducts  {
		  	id
		    name
		    markUp
		    caseQuantity
		    price
		    portionSize
		    markedUpPrice
		    category {
		    	id
		    	name
		    }	    
		  }
		}
		`
