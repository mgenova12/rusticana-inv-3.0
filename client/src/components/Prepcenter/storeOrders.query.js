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

	export const GET_COMBINED_STORE_ORDERS = gql`
	  query combinedStoreOrders($storeOrderId: Int!) { 
	    combinedStoreOrders(storeOrderId: $storeOrderId) {
	      id
	      name 
	      prepped
	      inventories {
	      	storeGood {
	      		amountInStock
	      	}
	      	quantityNeeded
	      	id
	      	store {
	      		id
	      		name
	      	}
	      }

	    }
	  }
	`;
