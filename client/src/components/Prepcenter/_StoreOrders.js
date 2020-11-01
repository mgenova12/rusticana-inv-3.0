import React from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable from 'material-table';
import Avatar from '@material-ui/core/Avatar';
import { GET_STORE_ORDERS } from './storeOrders.query'

const StoreOrders = ({...props}) => {

  const {data: storeOrdersQuery, loading: storeOrdersQueryLoading} = useQuery(GET_STORE_ORDERS)

  if (storeOrdersQueryLoading) return 'Loading...'

  return (
    <div>
 
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title="Store Orders"

          options={{
            paging: false,
            actionsColumnIndex: -1,
          }}          
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            {
              title: 'Stores',
              field: 'url',
              render: rowData => (
                rowData.orders.map((order) => 
                  <span key={order.id}>
                   <Avatar>{order.store.name[0]}</Avatar>
                  </span>
                )
              )
            },            
            { title: 'Delivery Day', field: 'deliveryDate',
              render: row => <span>{ new Date(row["deliveryDate"]).toLocaleDateString([], "en-US", { weekday: 'long'})}</span>
            },
            { title: 'Status', field: 'status' },
            { title: 'Last Updated', field: 'updatedAt',
              render: row => <span>{ new Date(row["updatedAt"]).toLocaleDateString([], {timeZone:'America/New_York', hour: '2-digit', minute:'2-digit'})}</span>
            },
          ]}
          data={JSON.parse(JSON.stringify(storeOrdersQuery.storeOrders))}           
        />      	
          
    </div>
  )
}

export default StoreOrders






