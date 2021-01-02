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
