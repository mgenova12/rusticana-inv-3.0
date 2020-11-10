import { gql } from '@apollo/client';

export const SCAN_INVENTORY = gql`
  mutation scanInventory($barcode: Float!, $orderId: Int!) {
    scanInventory(input: { barcode: $barcode, orderId: $orderId }) {
			errors
    }
  }
`;
