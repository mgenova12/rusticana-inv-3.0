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

	// export const GET_GIFT_CARD_LOGS = gql`
	//   query getGiftCardLogs($cardNumber: String!) {
	//     getGiftCardLogs(cardNumber: $cardNumber) {
	//     	id
	//       changeValue
	//       changeEvent
	//       store {
	//       	id
	//       	name
	//       }
	//       giftCard {
	//       	id
	//       	cardNumber
	//       	amount
	//       }
	//     }
	//   }
	// `	

export const GET_GIFT_CARDS = gql`
	query {
	  giftCards  {
	  	id
	    cardNumber
	    amount	    
	  }
	}
	`

	export const GET_GIFT_CARD_CHANGES = gql`
	  query getGiftCardChanges($giftCardId: Int!) {
	    getGiftCardChanges(giftCardId: $giftCardId) {
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