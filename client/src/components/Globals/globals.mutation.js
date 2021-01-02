import { gql } from '@apollo/client';

export const CREATE_DISTRIBUTOR = gql`
  mutation createDistributor($name: String!) {
    createDistributor(input: { name: $name }) {
			distributor{
	      id
	      name
	    }
    }
  }
`;

export const DELETE_DISTRIBUTOR = gql`
  mutation deleteDistributor($id: Int!) {
    deleteDistributor(input: { id: $id }) {
      distributor {
		  	id
		    name	
      }
    	errors
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation editProduct(
      $id: Int!,
      $name: String!,
      $distributorId: Int!,
      $categoryId: Int!,
      $caseQuantity: Int,
      $markUp: Int!, 
      $price: Float!, 
      $containerId: Int!
    ) {
      editProduct(input: { 
        id: $id,
        name: $name, 
        distributorId: $distributorId,
        categoryId: $categoryId,
        caseQuantity: $caseQuantity,
        markUp: $markUp,
        price: $price,
        containerId: $containerId
      }) {
        product {
          id
          name
          markUp
          caseQuantity
          price
          markedUpPrice
          category {
            id
            name
          }
          distributor {
            id
            name
          } 
        }
        errors
      }
    }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: Int!) {
    deleteProduct(input: { id: $id }) {
      product {
        id
        name  
      }
      errors
    }
  }
`;


export const CREATE_PREPPED_PRODUCT = gql`
  mutation createPreppedProduct(
    $name: String!,
    $categoryId: Int!,
    $caseQuantity: Int,
    $portionSize: Int!,
    $barcode: Int,
    $markUp: Int!, 
    $daysTillExpire: Int,
    $description: String,
    $pId: Int!,
    $price: Float!,
    $containerId: Int
  ) {
    createPreppedProduct(input: { 
      name: $name, 
      categoryId: $categoryId,
      caseQuantity: $caseQuantity,
      portionSize: $portionSize,
      barcode: $barcode,
      markUp: $markUp,
      daysTillExpire: $daysTillExpire,
      description: $description,
      pId: $pId,
      price: $price,
      containerId: $containerId
    }) {
      product {
        id
        name
      }
      errors
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $name: String!,
    $distributorId: Int!,
    $categoryId: Int!,
    $caseQuantity: Int,
    $markUp: Int!, 
    $price: Float!, 
    $brand: String, 
    $unitSize: String, 
    $distributorNumber: String, 
    $barcode: Int,
    $aisleNumber: Int,
    $description: String,
    $containerId: Int
  ) {
    createProduct(input: { 
      name: $name, 
      distributorId: $distributorId,
      categoryId: $categoryId,
      caseQuantity: $caseQuantity,
      markUp: $markUp,
      price: $price,
      brand: $brand,
      unitSize: $unitSize,
      distributorNumber: $distributorNumber,
      barcode: $barcode,
      aisleNumber: $aisleNumber,
      description: $description,
      containerId: $containerId
    }) {
      product {
        id
        name
      }
      errors
    }
  }
`;




