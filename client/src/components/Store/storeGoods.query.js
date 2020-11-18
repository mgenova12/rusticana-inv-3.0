import { gql } from '@apollo/client';	

	export const GET_STORE_GOODS = gql`
	  query storeGoods($storeId: Int!) {   
	    storeGoods(storeId: $storeId) {
	    	id
	    	prepcenter
	      product{
					id
	        name
	        barcode
	        prepped
	      }
	      container {
	      	id
	      	name
	      }
	      location {
	        id
	        name
	      }
	      distributor {
	        id
	        name
	      }
	      amountInStock
	      countBy {
	        id
	        name
	      }        
	      maxAmount
	      replenishBy
	      deliveryDay          
	    }

	  }
	`;


	export const GET_STORE_PRODUCTS = gql`
	  query storeProducts($storeId: Int!) {   
	    storeProducts(storeId: $storeId) {
	      id
	      name     
	      brand
	      prepped           
	    }

	  }
	`;