import { gql } from '@apollo/client';	

	export const GET_INVOICES = gql`
	  query {
	    invoices {
	      id
	      createdAt
	      deliveryDay
	      status
	      saleTotal
	      isQuickOrder
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
	    	isQuickOrder
	      saleTotal
	      store {
	      	name
	      }
	      inventories {
		      id
		      invoicedPrice
		      invoicedQuantity
		      invoicedProductPrice
		      storeGoodIncludingDeleted {
		      	id
		      	isPrepcenter
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