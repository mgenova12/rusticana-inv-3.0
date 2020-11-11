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
		    	status
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
	      scanned
	      invoicedQuantity
	      storeGood {
	      	replenishBy
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

	export const GET_UNSCANNED_STORE_ORDER = gql`
	  query unscannedStoreOrderInventories($orderId: Int!) { 
	    unscannedStoreOrderInventories(orderId: $orderId) {
	      id
	      product {
	      	id 
	      	name
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
