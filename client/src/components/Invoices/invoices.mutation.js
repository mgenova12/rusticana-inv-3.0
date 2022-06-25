import { gql } from '@apollo/client';	

export const MARK_ORDER_PAID = gql`
  mutation markOrderPaid($orderIds: [Int!]!) {
    markOrderPaid(input: {orderIds: $orderIds }) {
      errors   
    }
  }
`;