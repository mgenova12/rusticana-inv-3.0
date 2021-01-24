import React from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable from 'material-table';
import Avatar from '@material-ui/core/Avatar';
import { GET_STORE_ORDERS } from './prepcenter.query'

const StoreOrders = ({...props}) => {

  const {data: storeOrdersQuery, loading: storeOrdersQueryLoading} = useQuery(GET_STORE_ORDERS, {
    fetchPolicy: "network-only",
  })

  const handleRowClick = (event, rowData) => {
    props.history.push(`/prepcenter/${props.match.params.prepcenterId}/store_orders/${rowData.id}`)
  }

  const handleOrderClick = (event, order, rowData) => {
    event.stopPropagation()

    if(order.status === 'pending'){
      props.history.push(`/prepcenter/${props.match.params.prepcenterId}/store_orders/${rowData.id}/orders/${order.id}`)
    }
  }

  if (storeOrdersQueryLoading) return 'Loading...'

  return (
    <div>
 
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title="Store Orders"
          onRowClick={handleRowClick}
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
                  <span key={order.id} className="d-inline-block m-1">

                   <Avatar 
                      className={(order.status === 'pending') ? ("border border-success") : ((order.status === 'complete' || order.status === 'PAID') ? ("bg-success") : ("bg-warning"))}
                      onClick={(e) => handleOrderClick(e, order, rowData)}>{order.store.name[0]}
                   </Avatar>

                  </span>
                )

              )
            },
            { title: 'Delivery Day', field: 'deliveryDate',
              render: row => <span>{ new Date(row["deliveryDate"].replace(/-/g, '/')).toLocaleDateString([], "en-US", { weekday: 'long'})}</span>
            },
            { title: 'Status', field: 'status' },
            { title: 'Last Updated', field: 'updatedAt',
              render: row => <span>{ new Date(row["updatedAt"].replace(/-/g, '/')).toLocaleDateString([], {timeZone:'America/New_York', hour: '2-digit', minute:'2-digit'})}</span>
            },
          ]}
          data={JSON.parse(JSON.stringify(storeOrdersQuery.storeOrders))}           
        />      	
          
    </div>
  )
}

export default StoreOrders

