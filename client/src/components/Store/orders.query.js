import { gql } from '@apollo/client';	

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