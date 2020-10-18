import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import MaterialTable from 'material-table';
import { GET_STORE_GOODS} from './storeGoods.query'
import { DELETE_STORE_GOOD } from './storeGoods.mutation'

const StoreGoods = ({...props}) => {
  const {data: storeGoodsQuery, loading: storeGoodsQueryLoading, refetch: storeGoodsRefetch} = useQuery(GET_STORE_GOODS, {
    variables: {
      storeId: parseInt(props.match.params.storeId)
    }
  })

  const handleRowDelete = (oldData) => {
    deleteStoreGood({ 
      variables: { 
        id: parseInt(oldData.id)
      } 
    }).then(() => storeGoodsRefetch())
  }

  const [deleteStoreGood] = useMutation(DELETE_STORE_GOOD);
  
  if (storeGoodsQueryLoading) return 'Loading...'

  return (
    <div>
 
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title="Store Goods"
          options={{
            paging: false,
            actionsColumnIndex: -1
          }} 
          editable={{
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  handleRowDelete(oldData)
              }, 100);
            }), 
          }}                  
          columns={[
              { title: 'ID', field: 'id', editable: 'never' },
              { title: 'Name', field: 'product', editable: 'never' },
              { title: 'Location', 
                field: 'location.id',
                // lookup: locations 
              },
              { title: 'Local Distributor',
                field: 'distributor.id',
                // lookup: distributors
              },
              { title: 'Amount In Stock', field: 'amountInStock' },
              { title: 'Count By', 
                field: 'countBy.id',
                // lookup: countBies
              },
              { title: 'Max Amount', field: 'maxAmount' },
              { title: 'Replenish By', 
                // field: 'replenishBy',
                // lookup: countBies
              },
              { title: 'Delivery Day', field: 'deliveryDay',
                lookup: {'Tuesday': 'Tuesday', 'Friday': 'Friday', 'Both': 'Both'}
              },
          ]}
          data={JSON.parse(JSON.stringify(storeGoodsQuery.storeGoods))}     
        />      	
          
    </div>
  )
}

export default StoreGoods

