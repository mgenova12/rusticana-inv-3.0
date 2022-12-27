import { gql } from '@apollo/client';

export const CREATE_GIFTCARD = gql`
  mutation createGiftCard( $cardNumber: String!, $amount: Float!) {
    createGiftCard(input: { cardNumber: $cardNumber,  amount: $amount}) {
			giftCard{
	      id
	    }
    }
  }
`;

export const EDIT_GIFT_CARD_VALUE = gql`
  mutation editGiftCardValue( $cardNumber: String!, $value: Float!, $action: String!) {
    editGiftCardValue(input: { cardNumber: $cardNumber,  value: $value, action: $action}) {
      giftCard{
        id
        amount
      }
    }
  }
`;