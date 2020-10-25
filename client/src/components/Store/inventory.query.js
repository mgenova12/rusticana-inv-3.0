import { gql } from '@apollo/client';	

	export const GET_ORDER_STATUS = gql`
	  query orderStatus($storeId: Int!) { 
	    orderStatus(storeId: $storeId) {
	      id
	      status                     
	    }
	  }
	`

	export const GET_INVENTORY = gql`
	  query inventories($storeId: Int!) { 
	    inventories(storeId: $storeId) {
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
	`;