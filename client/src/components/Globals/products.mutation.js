import { gql } from '@apollo/client';

export const EDIT_PRODUCT = gql`
	mutation editProduct(
	    $id: Int!,
		  $name: String!,
		  $distributorId: Int!,
		  $categoryId: Int!,
		  $caseQuantity: Int,
		  $markUp: Int!, 
		  $price: Float!, 
	  ) {
	    editProduct(input: { 
	      id: $id,
	    	name: $name, 
	    	distributorId: $distributorId,
	    	categoryId: $categoryId,
	    	caseQuantity: $caseQuantity,
	    	markUp: $markUp,
	    	price: $price,
	    	
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
	  $price: Float!
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
    	price: $price
    }) {
      product {
		  	id
		    name
      }
    	errors
    }
  }
`;






