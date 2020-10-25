import { gql } from '@apollo/client';

export const CREATE_INVENTORY = gql`
  mutation createInventory($storeId: Int!, $deliveryDay: String!) {
    createInventory(input: {storeId: $storeId, deliveryDay: $deliveryDay }) {
    	errors
    }
  }
`;


export const DELETE_INVENTORY = gql`
  mutation deleteInventory($orderId: Int!) {
    deleteInventory(input: { orderId: $orderId }) {
    	errors
    }
  }
`;

export const EDIT_INVENTORY_QUANTITY = gql`
  mutation editInventoryQuantity($inventoryId: Int!, $quantity: Int!) {
    editInventoryQuantity(input: {inventoryId: $inventoryId, quantity: $quantity }) {
      errors   
    }
  }
`;


export const EDIT_INVENTORY_QUANTITY_NEEDED = gql`
  mutation editInventoryQuantityNeeded($storeId: Int!) {
    editInventoryQuantityNeeded(input: {storeId: $storeId }) {
      errors   
    }
  }
`;