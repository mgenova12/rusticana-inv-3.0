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