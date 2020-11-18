import { gql } from '@apollo/client';	


	export const GET_PREPCENTER_LOCATIONS = gql`
	  query prepcenterLocations($prepcenterId: Int!) {   
	    prepcenterLocations(prepcenterId: $prepcenterId) {
	      id
	      name                     
	    }

	  }
	`

	export const GET_PREPCENTER_STORE_GOODS = gql`
	  query prepcenterStoreGoods($prepcenterId: Int!) {   
	    prepcenterStoreGoods(prepcenterId: $prepcenterId) {
	    	id
	      product{
					id
	        name
	        barcode
	        prepped
	      }
	      container {
	      	id
	      	name
	      }
	      location {
	        id
	        name
	      }
	      distributor {
	        id
	        name
	      }
	      amountInStock
	      countBy {
	        id
	        name
	      }        
	      maxAmount
	      replenishBy
	      deliveryDay          
	    }

	  }
	`;


	export const GET_PREPCENTER_ORDER_STATUS = gql`
	  query prepcenterOrderStatus($prepcenterId: Int!) { 
	    prepcenterOrderStatus(prepcenterId: $prepcenterId) {
	      id
	      status
	    }
	  }
	`

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