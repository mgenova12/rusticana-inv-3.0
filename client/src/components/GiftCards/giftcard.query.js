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

	export const GET_GIFT_CARD_LOGS = gql`
	  query getGiftCardLogs($cardNumber: String!) {
	    getGiftCardLogs(cardNumber: $cardNumber) {
	    	id
	      changeValue
	      changeEvent
	      store {
	      	id
	      	name
	      }
	      giftCard {
	      	id
	      	cardNumber
	      	amount
	      }
	    }
	  }
	`	