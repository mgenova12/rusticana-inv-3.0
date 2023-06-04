import { gql } from '@apollo/client';

export const CREATE_GIFTCARD = gql`
  mutation createGiftCard( $cardNumber: String!, $amount: Float!, $storeId: Int!) {
    createGiftCard(input: { cardNumber: $cardNumber,  amount: $amount, storeId: $storeId}) {
			giftCard{
	      id
	    }
      errors
    }
  }
`;

export const EDIT_GIFT_CARD_VALUE = gql`
  mutation editGiftCardValue( $cardNumber: String!, $value: Float!, $action: String!, $storeId: Int!) {
    editGiftCardValue(input: { cardNumber: $cardNumber,  value: $value, action: $action, storeId: $storeId}) {
      giftCard{
        id
        amount
      }
    }
  }
`;