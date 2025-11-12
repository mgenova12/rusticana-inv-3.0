import { gql } from '@apollo/client';	

export const GET_CUSTOMERS = gql`
	query {
	  customers  {
	  	id
			firstName
			lastName
			phoneNumber
   		email
   		giftCardCount
			createdAt
			coupon {
				id
				code
			}
	  }
	}
	`
	