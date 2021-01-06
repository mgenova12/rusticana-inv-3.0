import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable, { MTableToolbar } from 'material-table';
import { GET_INVOICES } from './invoices.query'

const Invoices = () => {
  
  const {data: invoicesQuery, loading: invoicesQueryLoading} = useQuery(GET_INVOICES)
  
  const [components] = useState({
    Toolbar: props => (
      <div >
        {props.selectedRows.length > 0  &&  
          <div
          style={{
            backgroundColor: 'rgb(255, 226, 236)', 
            fontSize: '20px', 
            color: '#f50057',
            height: '70px'
          }}>
            <p className="text-center">
              {props.selectedRows.length} Item(s) Selected <br/>
              Total: $ {props.selectedRows.reduce((a, b) => +a + +b.saleTotal, 0)}
            </p>
          </div>
        }

        <MTableToolbar {...props} />
      </div>
    ),
  });


  if (invoicesQueryLoading) return 'Loading...'

  return (
    <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        /> 
        <MaterialTable
          components={components}
          title="Invoices"    
          options={{
            paging: false,
            selection: true,
            showTextRowsSelected: false,
          }}
      
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Time Placed', field: 'createdAt', 
              render: row => <span>{ new Date(row["createdAt"].replace(/-/g, '/')).toLocaleDateString([], {timeZone:'America/New_York', hour: '2-digit', minute:'2-digit'})}</span>
            },
            { title: 'Store', field: 'store.name' },
            { title: 'Status', field: 'status' },
            { title: 'Total', field: 'saleTotal', type: "currency" },
          ]}
          data={JSON.parse(JSON.stringify(invoicesQuery.invoices))}           
        />      	
        
    </div>
  )
}

export default Invoices

