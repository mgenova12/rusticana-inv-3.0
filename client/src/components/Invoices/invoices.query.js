import { gql } from '@apollo/client';	

	export const GET_INVOICES = gql`
	  query {
	    invoices {
	      id
	      createdAt
	      deliveryDay
	      status
	      saleTotal
	      store {
	      	id
	      	name
	      }                     
	  	}
	  }
	`
	export const GET_INVOICE = gql`
	  query getOrder($orderId: Int!) { 
	    getOrder(orderId: $orderId) {
	      
	      scannedInventories {
		      id
		      invoicedQuantity
		      storeGood {
		      	id
		      	product {
		      		id
		      		name
		      		markedUpPrice
		      	}
		      }
	    	}
	    }
	  }
	`