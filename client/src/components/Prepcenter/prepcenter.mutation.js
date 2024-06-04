import { gql } from '@apollo/client';

export const EDIT_FINAL_INVENTORY_ORDER = gql`
  mutation editFinalInventoryOrder($orderId: Int!, $storeOrderId: Int!, $reasonCodeInput:[String!]! ) {
    editFinalInventoryOrder(input: {orderId: $orderId, storeOrderId: $storeOrderId, reasonCodeInput: $reasonCodeInput}) {
      errors   
    }
  }
`;

export const EDIT_PREPCENTER_INVENTORY_QUANTITY_NEEDED = gql`
  mutation editPrepcenterInventoryQuantityNeeded($prepcenterId: Int!, $inventoryInput: [String!]!) {
    editPrepcenterInventoryQuantityNeeded(input: {prepcenterId: $prepcenterId, inventoryInput: $inventoryInput }) {
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

export const UNSCAN_INVENTORY = gql`
  mutation unscanInventory($inventoryId: ID!) {
    unscanInventory(input: { inventoryId: $inventoryId }) {
      errors
    }
  }
`;


export const CREATE_PREPCENTER_INVENTORY = gql`
  mutation createPrepcenterInventory($prepcenterId: Int!, $deliveryDay: String!) {
    createPrepcenterInventory(input: {prepcenterId: $prepcenterId, deliveryDay: $deliveryDay }) {
      order {
        id
      }
    	errors
    }
  }
`;

export const CREATE_QUICK_ORDER = gql`
  mutation createQuickOrder($storeId: Int!) {
    createQuickOrder(input: { storeId: $storeId }) {
      order {
        id
      }
      errors
    }
  }
`;

export const CREATE_PENDING_INVENTORY = gql`
  mutation createPendingInventory($storeGoodId: Int!, $orderId: Int!, $quantity: Int!) {
    createPendingInventory(input: { storeGoodId: $storeGoodId, orderId: $orderId, quantity: $quantity }) {
      errors
      pendingInventoryCount
    }
  }
`;

export const DELETE_PENDING_INVENTORY = gql`
  mutation deletePendingInventory($inventoryId: Int!) {
    deletePendingInventory(input: { inventoryId: $inventoryId }) {
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

export const EDIT_FINAL_QUICK_ORDER = gql`
  mutation editFinalQuickOrder($orderId: Int!) {
    editFinalQuickOrder(input: {orderId: $orderId}) {
      errors   
    }
  }
`;

