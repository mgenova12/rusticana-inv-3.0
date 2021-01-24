import React from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable from 'material-table';
import { GET_PREPCENTER_ORDERS } from './prepcenter.query'

const Orders = ({...props}) => {
  const {data: prepcenterOrdersQuery, loading: prepcenterOrdersQueryLoading} = useQuery(GET_PREPCENTER_ORDERS, {
    fetchPolicy: "network-only",
    variables: {
      prepcenterId: parseInt(props.match.params.prepcenterId)
    }
  })

  const handleRowClick = (event, rowData) => {
    if (rowData.status !== 'incomplete') {
      props.history.push(`/store/${props.match.params.prepcenterId}/orders/${rowData.id}`)
    }
  }

  if (prepcenterOrdersQueryLoading) return 'Loading...'

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
            { title: 'Store', field: 'prepcenter.name' },
            { title: 'Delivery Type', field: 'deliveryDay' },
            { title: 'Status', field: 'status' },
          ]}
          data={JSON.parse(JSON.stringify(prepcenterOrdersQuery.prepcenterOrders))}           
        />      	
          
    </div>
  )
}

export default Orders
