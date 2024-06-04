import { gql } from '@apollo/client';	

	export const GET_INVOICES = gql`
	  query {
	    invoices {
	      id
	      createdAt
	      status
	      saleTotal
	      isQuickOrder
	      storeOrder {
	      	id
	      	deliveryDate
	      }
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
		      reasonCode
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