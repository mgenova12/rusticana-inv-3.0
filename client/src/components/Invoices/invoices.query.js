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
	      saleTotal
	      store {
	      	name
	      }   	      
	      scannedInventories {
		      id
		      invoicedPrice
		      invoicedQuantity
		      invoicedProductPrice
		      storeGoodIncludingDeleted {
		      	id
		      	replenishBy
		      	product {
		      		id
		      		caseQuantity
		      		name
		      	}
		      }
	    	}
	    }
	  }
	`