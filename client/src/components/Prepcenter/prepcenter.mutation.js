import { gql } from '@apollo/client';

export const SCAN_INVENTORY = gql`
  mutation scanInventory($barcode: Float!, $orderId: Int!) {
    scanInventory(input: { barcode: $barcode, orderId: $orderId }) {
			errors 
    }
  }
`;

export const CREATE_PREPCENTER_INVENTORY = gql`
  mutation createPrepcenterInventory($prepcenterId: Int!, $deliveryDay: String!) {
    createPrepcenterInventory(input: {prepcenterId: $prepcenterId, deliveryDay: $deliveryDay }) {
    	errors
    }
  }
`;


