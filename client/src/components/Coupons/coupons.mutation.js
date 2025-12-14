import { gql } from '@apollo/client';

export const REDEEM_COUPON = gql`
  mutation redeemCoupon($couponId: ID!) {
    redeemCoupon(input: { couponId: $couponId }) {
      coupon {
        id
        code
        redeemedOn
        customer {
          id
          firstName
          lastName
          phoneNumber
          email
        }
      }
      errors
    }
  }
`;

