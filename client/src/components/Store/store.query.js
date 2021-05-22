import { gql } from '@apollo/client';	

	export const GET_COUNT_BIES = gql`
		query {
		  countBies  {
		  	id
		    name	    
		  }
		}
		`
	export const GET_LOCATIONS = gql`
	  query getStore($storeId: Int!) {   
	    getStore(storeId: $storeId) {
	      locations {
		      id
		      name      
		    }
	    }

	  }
	`
	export const GET_ORDERS = gql`
	  query getStore($storeId: Int!) {   
	    getStore(storeId: $storeId) {
	    	id
	    	name
	    	orders{
		      id
		      createdAt
		      deliveryDay
		      status  
		   	} 

	    }

	  }
	`
	export const GET_ORDER = gql`
	  query getOrder($orderId: Int!) {   
	    getOrder(orderId: $orderId) {
	    	inventories { 
		      id
		      quantity
		      quantityNeeded
		      invoicedQuantity
					storeGoodIncludingDeleted {
						distributor {
							id
						}
						countBy {
							name
						}
						productIncludingDeleted {
							name
							category{
								id
								name
							}
						}
					} 
				}
	    }
	  }
	`
	export const GET_ORDER_STATUS = gql`
	  query getStore($storeId: Int!) { 
	    getStore(storeId: $storeId) {
	    	
	    	orderStatus {
		      id
		      status
	    	}

	    }
	  }
	`

	export const GET_INVENTORY = gql`
	  query getOrder($orderId: Int!) { 
	    getOrder(orderId: $orderId) {
	    	pendingInventories{
		      id
					quantity
					storeGood{
		        id
		        location {
		        	id
		        }
		        product{
		          id
		          name
		          caseQuantity
		        }
		        countBy{
		          id
		          name
		        }
		      }
		    }
	    }
	  }
	`;

		export const GET_STORE_GOODS = gql`
	  query getStore($storeId: Int!) {   
	    getStore(storeId: $storeId) {
	    	storeGoods {
		    	id
		      product{
						id
		        name
		        barcode
		        prepped
		      }
		      location {
		        id
		        name
		      }
		      distributor {
		        id
		        name
		      }
		      countBy {
		        id
		        name
		      }        
		      amountInStock
		      maxAmount
		      replenishBy
		      deliveryDay 
		      active
		   	}      
	    }
	  }
	`;

	export const GET_STORE_PRODUCTS = gql`
	  query storeProducts($storeId: Int!) {   
	    storeProducts(storeId: $storeId) {
	      id
	      name     
	      brand
	      prepped           
	    }
	  }
	`;
