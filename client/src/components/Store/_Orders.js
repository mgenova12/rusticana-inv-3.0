import React from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable from 'material-table';
import { GET_ORDERS } from './orders.query'

const Orders = ({...props}) => {
  const {data: ordersQuery, loading: ordersQueryLoading} = useQuery(GET_ORDERS, {
    fetchPolicy: "network-only",
    variables: {
      storeId: parseInt(props.match.params.storeId)
    }
  })

  const handleRowClick = (event, rowData) => {
    if (rowData.status !== 'incomplete') {
      props.history.push(`/store/${props.match.params.storeId}/orders/${rowData.id}`)
    }
  }

  if (ordersQueryLoading) return 'Loading...'

  return (
    <div>
 
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title="Orders"
          onRowClick={handleRowClick} 
          options={{
            paging: false,
            actionsColumnIndex: -1,
          }}          
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Time Placed', field: 'createdAt', 
              render: row => <span>{ new Date(row["createdAt"].replace(/-/g, '/')).toLocaleDateString([], {timeZone:'America/New_York', hour: '2-digit', minute:'2-digit'})}</span>
            },
            { title: 'Store', field: 'store.name' },
            { title: 'Delivery Day', field: 'deliveryDay' },
            { title: 'Status', field: 'status' },
          ]}
          data={JSON.parse(JSON.stringify(ordersQuery.orders))}           
        />      	
          
    </div>
  )
}

export default Orders






