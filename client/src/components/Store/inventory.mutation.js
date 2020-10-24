import { gql } from '@apollo/client';

export const CREATE_INVENTORY = gql`
  mutation createInventory($storeId: Int!, $deliveryDay: String!) {
    createInventory(input: {storeId: $storeId, deliveryDay: $deliveryDay }) {
    	errors
    }
  }
`;
