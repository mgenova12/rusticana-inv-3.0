import { gql } from '@apollo/client';

export const CREATE_CUSTOMER = gql`
  mutation createCustomer( $firstName: String!, $lastName: String!, $phoneNumber: String!, $email: String!, $couponCode: String) {
    createCustomer(input: { firstName: $firstName, lastName: $lastName, phoneNumber: $phoneNumber, email: $email, couponCode: $couponCode}) {
			customer{
	      id
	    }
      errors
    }
  }
`;
