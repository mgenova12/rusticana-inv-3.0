import { gql } from '@apollo/client';

export const CREATE_GIFTCARD = gql`
  mutation createGiftCard( $cardNumber: String!, $amount: Float!, $storeId: Int!, $firstName: String!, $lastName: String!, $phoneNumber: String!, $email: String!, $paymentMethod: String!) {
    createGiftCard(input: { cardNumber: $cardNumber,  amount: $amount, storeId: $storeId, firstName: $firstName, lastName: $lastName, phoneNumber: $phoneNumber, email: $email, paymentMethod: $paymentMethod}) {
			giftCard{
	      id
	    }
      errors
    }
  }
`;

export const CREATE_GIFTCARD_INVOICE = gql`
  mutation createGiftCardInvoice( $storeId: Int!, $amountPaid: Float!) {
    createGiftCardInvoice(input: { storeId: $storeId, amountPaid: $amountPaid}) {
      errors
    }
  }
`;

export const EDIT_GIFT_CARD_VALUE = gql`
  mutation editGiftCardValue( $cardNumber: String!, $value: Float!, $action: String!, $storeId: Int!, $paymentMethod: String, $ticketNumber: String) {
    editGiftCardValue(input: { cardNumber: $cardNumber,  value: $value, action: $action, storeId: $storeId, paymentMethod: $paymentMethod, ticketNumber: $ticketNumber}) {
      giftCard{
        id
        amount
      }
    }
  }
`;