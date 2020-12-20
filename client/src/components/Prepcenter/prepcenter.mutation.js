import { gql } from '@apollo/client';

export const EDIT_FINAL_INVENTORY_ORDER = gql`
  mutation editFinalInventoryOrder($orderId: Int!, $storeOrderId: Int!) {
    editFinalInventoryOrder(input: {orderId: $orderId, storeOrderId: $storeOrderId}) {
      errors   
    }
  }
`;

export const EDIT_PREPCENTER_INVENTORY_QUANTITY_NEEDED = gql`
  mutation editPrepcenterInventoryQuantityNeeded($prepcenterId: Int!) {
    editPrepcenterInventoryQuantityNeeded(input: {prepcenterId: $prepcenterId }) {
      errors   
    }
  }
`;

export const CREATE_PREPCENTER_STORE_GOOD = gql`
  mutation createPrepcenterStoreGood(
    $prepcenterId: Int!,
    $productId: Int!,
    $maxAmount: Int!,
    $locationId: Int!,
    $distributorId: Int!,
    $deliveryDay: String!,
    $countById: Int!,
    $replenishBy: String!,
  ) {
    createPrepcenterStoreGood(input: {
      prepcenterId: $prepcenterId,
      productId: $productId,
      maxAmount: $maxAmount,
      locationId: $locationId,
      distributorId: $distributorId,
      deliveryDay: $deliveryDay,
      countById: $countById,
      replenishBy: $replenishBy,
    }) {
      storeGood{
        id
      }
    }
  }
`;

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

export const CREATE_PREPCENTER_LOCATION = gql`
  mutation createPrepcenterLocation($name: String!, $prepcenterId: Int!) {
    createPrepcenterLocation(input: { name: $name, prepcenterId: $prepcenterId }) {
      location{
        id
        name
      }
    }
  }
`;

