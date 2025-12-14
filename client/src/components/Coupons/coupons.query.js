import { gql } from '@apollo/client';	

export const GET_COUPONS = gql`
	query {
	  coupons  {
	  	id
		code
		activatedOn
		redeemedOn
		customer {
		  id
		  firstName
		  lastName
		  email
		}
	  }
	}
	`

export const GET_COUPON = gql`
  query getCoupon($code: String!) {
    getCoupon(code: $code) {
    	id
      code
      customer {
        id
        firstName
        lastName
        phoneNumber
        email
      }
    }
  }
`

