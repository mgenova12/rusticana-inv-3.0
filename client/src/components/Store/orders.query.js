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

	export const GET_ORDER = gql`
	  query orderInventories($orderId: Int!) {   
	    orderInventories(orderId: $orderId) {
	      id
	      quantity
	      quantityNeeded
				storeGood {
					distributor {
						id
					}
					countBy {
						name
					}
					product {
						name
						category{
							id
							name
						}
					}
				}                    
	    }
	  }
	`