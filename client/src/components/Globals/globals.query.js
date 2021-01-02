import { gql } from '@apollo/client';	

export const GET_CONTAINERS = gql`
	query {
	  containers  {
	  	id
	    name	    
	  }	
	}
	`
export const GET_DISTRIBUTORS = gql`
	query {
	  distributors  {
	  	id
	    name	    
	  }
	}
	`
export const GET_CATEGORIES = gql`
	query {
	  categories  {
	  	id
	    name	    
	  }
	}
	`
export const GET_PRODUCTS = gql`
	query {
	  products  {
	  	id
	    name
	    markUp
	    caseQuantity
	    price
	    markedUpPrice
	    container {
	    	id
	    	name
	    }
	    category {
	    	id
	    	name
	    }
	    distributor {
	    	id
	    	name
	    }		    
	  }
	}
	`
export const GET_PREPPED_PRODUCTS = gql`
	query {
	  preppedProducts  {
	  	id
	    name
	    markUp
	    caseQuantity
	    price
	    portionSize
	    markedUpPrice
	    container {
	    	id
	    	name
	    }	    
	    category {
	    	id
	    	name
	    }	    
	  }
	}
	`

	
