import React from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable from 'material-table';
import { GET_ORDERS } from './store.query'
import BeatLoader from "react-spinners/BeatLoader"

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

  if (ordersQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title={ordersQuery.getStore.name + ' Orders'}
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
            { title: 'Delivery Day', field: 'deliveryDay' },
            { title: 'Status', field: 'status' },
          ]}
          data={JSON.parse(JSON.stringify(ordersQuery.getStore.orders))}           
        />      	
          
    </div>
  )
}

export default Orders
