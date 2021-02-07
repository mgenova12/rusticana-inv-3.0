import { gql } from '@apollo/client';	

export const GET_PREPCENTER_LABELS = gql`
  query prepcenterStoreGoods($prepcenterId: Int!) {   
    prepcenterStoreGoods(prepcenterId: $prepcenterId) {
      id
      product{
        id
        name
        barcode
        prepped 
        daysTillExpire
        category {
          id
          name
        }        
      }               
    }

  }
`;

export const GET_PREPCENTER_ORDERS = gql`
  query prepcenterOrders($prepcenterId: Int!) {   
    prepcenterOrders(prepcenterId: $prepcenterId) {
      id
      createdAt
      deliveryDay
      status   
      prepcenter {
        id
        name
      }
    }

  }
`
export const GET_PREPCENTER_INVENTORY = gql`
  query getOrder($orderId: Int!) { 
    getOrder(orderId: $orderId) {
      pendingInventories{
        id
  			quantity
  			storeGood{
          id
          location {
          	id
          }
          product{
            id
            name
            caseQuantity
          }
          countBy{
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_PREPCENTER_PRODUCTS = gql`
  query prepcenterProducts($prepcenterId: Int!) {   
    prepcenterProducts(prepcenterId: $prepcenterId) {
      id
      name     
      brand
      prepped           
    }

  }
`;

export const GET_PREPCENTER_LOCATIONS = gql`
  query prepcenterLocations($prepcenterId: Int!) {   
    prepcenterLocations(prepcenterId: $prepcenterId) {
      id
      name                     
    }

  }
`
export const GET_PREPCENTER_STORE_GOODS = gql`
  query prepcenterStoreGoods($prepcenterId: Int!) {   
    prepcenterStoreGoods(prepcenterId: $prepcenterId) {
    	id
      product{
				id
        name
        barcode
        prepped
        container {
          id
          name
        }        
      }
      location {
        id
        name
      }
      distributor {
        id
        name
      }
      countBy {
        id
        name
      }        
      amountInStock
      maxAmount
      replenishBy
      deliveryDay 
      active         
    }
  }
`;

export const GET_PREPCENTER_ORDER_STATUS = gql`
  query prepcenterOrderStatus($prepcenterId: Int!) { 
    prepcenterOrderStatus(prepcenterId: $prepcenterId) {
      id
      status
    }
  }
`
export const GET_STORE_ORDERS = gql`
	query {
	  storeOrders  {
	  	id
	    deliveryDate
	    status
	    updatedAt
	    orders{
	    	id
	    	status
	    	store {
	    		id
	    		name
	    	}
	    }
	  }
	}
	`

export const GET_ORDER = gql`
  query getOrder($orderId: Int!) { 
    getOrder(orderId: $orderId) {
      store{
        name
      }
      isPrepcenterInventories{
        id
        quantity
        quantityNeeded
        scanned
        invoicedQuantity
        storeGoodIncludingDeleted {
        	replenishBy
        	countBy{
        		name
        	}
          productIncludingDeleted {
            name
            barcode
            container {
              id
            }        
          }        
        }
      }

    }
  }
`;

export const GET_UNSCANNED_STORE_ORDER = gql`
  query getOrder($orderId: Int!) { 
    getOrder(orderId: $orderId) {
      unscannedInventories {
        id
        product {
        	id 
        	name
        }
      }
    }
  }
`;

export const GET_COMBINED_STORE_ORDERS = gql`
  query combinedStoreOrders($storeOrderId: Int!) { 
    combinedStoreOrders {
      id
      name 
      prepped
      storeGoods {
        prepcenterId
        amountInStock
      }

      productInventories(storeOrderId: $storeOrderId) {
      	id	       	
      	quantityNeeded
      	
      	store {
      		id
      		name
      	}
      }

    }
  }
`;
