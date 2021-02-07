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
	  query locations($storeId: Int!) {   
	    locations(storeId: $storeId) {
	      id
	      name                     
	    }

	  }
	`
	export const GET_ORDERS = gql`
	  query orders($storeId: Int!) {   
	    orders(storeId: $storeId) {
	      id
	      createdAt
	      deliveryDay
	      status
	      store {
	      	id
	      	name
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
	  query orderStatus($storeId: Int!) { 
	    orderStatus(storeId: $storeId) {
	      id
	      status
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
	  query storeGoods($storeId: Int!) {   
	    storeGoods(storeId: $storeId) {
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
