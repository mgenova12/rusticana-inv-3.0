import { gql } from '@apollo/client';

export const CREATE_LOCATION = gql`
  mutation createLocation($name: String!, $storeId: Int!) {
    createLocation(input: { name: $name, storeId: $storeId }) {
			location{
	      id
	      name
	    }
    }
  }
`;

export const DELETE_LOCATION = gql`
  mutation deleteLocation($id: Int!) {
    deleteLocation(input: { id: $id }) {
      location {
		  	id
		    name	
      }
    	errors
    }
  }
`;

export const CREATE_INVENTORY = gql`
  mutation createInventory($storeId: Int!, $deliveryDay: String!) {
    createInventory(input: {storeId: $storeId, deliveryDay: $deliveryDay }) {
      order{
        id
      }
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

export const CREATE_STORE_GOOD = gql`
  mutation createStoreGood(
    $storeId: Int!,
    $productId: Int!,
    $maxAmount: Int!,
    $locationId: Int!,
    $distributorId: Int!,
    $deliveryDay: String!,
    $countById: Int!,
    $replenishBy: String!,
  ) {
    createStoreGood(input: {
      storeId: $storeId,
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

export const DELETE_STORE_GOOD = gql`
  mutation deleteStoreGood($id: Int!) {
    deleteStoreGood(input: { id: $id }) {
      storeGood {
        id
      }
      errors
    }
  }
`;

export const EDIT_STORE_GOOD = gql`
  mutation editStoreGood(
    $id: Int!,
    $maxAmount: Int!,
    $locationId: Int!,
    $distributorId: Int!,
    $deliveryDay: String!,
    $countById: Int!,
    $replenishBy: String!,
    $amountInStock: Int,
    $active: Boolean
  ) {
    editStoreGood(input: { 
      id: $id,
      maxAmount: $maxAmount,
      locationId: $locationId,
      distributorId: $distributorId,
      deliveryDay: $deliveryDay,
      countById: $countById,
      replenishBy: $replenishBy,
      amountInStock: $amountInStock,
      active: $active
    }) {
      storeGood {
        id
      }
      errors
    }
  }
`;

