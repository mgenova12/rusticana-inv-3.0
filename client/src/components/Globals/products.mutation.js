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
