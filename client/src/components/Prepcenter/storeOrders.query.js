import { gql } from '@apollo/client';	

	export const GET_STORE_ORDERS = gql`
		query {
		  storeOrders  {
		  	id
		    deliveryDate
		    status
		    updatedAt
		    orders{
		    	id
		    	store {
		    		id
		    		name
		    	}
		    }
		  }
		}
		`
