import { gql } from '@apollo/client';

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
    $containerId: Int
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
      containerId: $containerId
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
    $containerId: Int,
    $amountInStock: Int
  ) {
    editStoreGood(input: { 
      id: $id,
      maxAmount: $maxAmount,
      locationId: $locationId,
      distributorId: $distributorId,
      deliveryDay: $deliveryDay,
      countById: $countById,
      replenishBy: $replenishBy,
      containerId: $containerId,
      amountInStock: $amountInStock   
    }) {
      storeGood {
        id
      }
      errors
    }
  }
`;

