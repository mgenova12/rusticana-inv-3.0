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

	export const GET_STORE_ORDER = gql`
	  query storeOrderInventories($orderId: Int!) { 
	    storeOrderInventories(orderId: $orderId) {
	      id
	      quantity
	      quantityNeeded
	      storeGood {
	      	container {
	      		id
	      	}
	      	countBy{
	      		name
	      	}
	      }
	      product {
	      	id 
	      	name
	      	barcode
	      }

	    }
	  }
	`;

	export const GET_COMBINED_STORE_ORDERS = gql`
	  query combinedStoreOrders($storeOrderId: Int!) { 
	    combinedStoreOrders(storeOrderId: $storeOrderId) {
	      id
	      name 
	      prepped
	      inventories {
	      	id	      	
	      	quantityNeeded
	      	
	      	storeGood {
	      		amountInStock
	      	}
	      	store {
	      		id
	      		name
	      	}
	      }

	    }
	  }
	`;
