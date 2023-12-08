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

export const GET_GIFT_CARD_BY_ID = gql`
  query getGiftCardById($giftCardId: Int!) {
    getGiftCardById(giftCardId: $giftCardId) {
    	id
      amount
      cardNumber
    }
  }
`	

export const GET_GIFT_CARDS = gql`
	query {
	  giftCards  {
	  	id
	    cardNumber
	    amount
	    moneyOwed
      firstName
      lastName
      phoneNumber
	    store {
	    	id
	    	name
	    }    
	  }
	}
	`


export const GET_STORES = gql`
  query {
    stores  {
      id
      name
      giftCardMoneyOwed
    }
  }
  `  

export const GET_GIFT_CARD_CHANGES = gql`
  query getGiftCardChanges($giftCardId: Int!) {
    getGiftCardChanges(giftCardId: $giftCardId) {
    	id
      changeValue
      changeEvent
      paymentMethod
      createdAt
      ticketNumber
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