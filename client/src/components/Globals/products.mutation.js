import { gql } from '@apollo/client';

export const EDIT_PRODUCT = gql`
	mutation editProduct(
	    $id: Int!,
		  $name: String!, 
		  $distributor: String!, 
		  $category: String!, 
		  $price: Float!, 
		  $markUp: Int!, 
		  $caseQuantity: Int, 
		  $prepped: Boolean!,
	    $description: String,
	    $unitSize: String ,
	    $brand: String,
	    $distributorNumber: String,
	    $barcode: Int
	  ) {
	    editProduct(input: { 
	      id: $id,
	    	name: $name, 
	    	distributor: $distributor,
	    	category: $category,
	    	price: $price,
	    	markUp: $markUp,
	    	caseQuantity: $caseQuantity,
	    	prepped: $prepped,
	      description: $description,
	      unitSize: $unitSize,
	      brand: $brand,
	      distributorNumber: $distributorNumber,
	      barcode: $barcode
	    }) {
	      product {
	        id
	        name
	        distributor {
	          id
	          name
	        }
	        category {
	          id
	          name
	        }
	        caseQuantity
	        markUp
	        price
	        markedUpPrice
	      }
	      errors
	    }
	  }
`;