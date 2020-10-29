import React, {useState, useCallback} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import MaterialTable from 'material-table';
import { GET_ORDER } from './orders.query'

const Order = ({...props}) => {
  // const {data: orderQuery, loading: orderQueryLoading, refetch: orderRefetch} = useQuery(GET_ORDER, {
  //   variables: {
  //     storeId: parseInt(props.match.params.storeId)
  //   }
  // })



  // if (orderQueryLoading) return 'Loading...'

  return (
    <div>
 
  	
          
    </div>
  )
}

export default Order






