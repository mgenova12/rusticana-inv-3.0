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
	  query invoice($orderId: Int!) { 
	    invoice(orderId: $orderId) {
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
	`