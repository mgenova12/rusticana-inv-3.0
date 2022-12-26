import { gql } from '@apollo/client';	

	export const GET_GIFT_CARD = gql`
	  query getGiftCard($cardNumber: String!) {
	    getGiftCard(cardNumber: $cardNumber) {
	    	id
	      amount
	      cardNumber
	    }
	  }
	`