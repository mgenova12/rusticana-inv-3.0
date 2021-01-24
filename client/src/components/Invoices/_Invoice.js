import React from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable  from 'material-table';
import { GET_INVOICE } from './invoices.query'

const Invoice = ({...props}) => {
  const {data: invoiceQuery, loading: invoiceQueryLoading} = useQuery(GET_INVOICE, {
    variables: {
      orderId: parseInt(props.match.params.orderId)
    }    
  })

  if (invoiceQueryLoading) return 'Loading...'

  return (
    <div>

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        /> 
        <MaterialTable
          title={`Invoice #${props.match.params.orderId}`}
          options={{
            paging: false,
          }}
      
          columns={[
            { title: 'Product', field: 'storeGood.product.name' },
            { title: 'Price', field: 'storeGood.product.markedUpPrice' },
            { title: 'Quantity invoiced', field: 'invoicedQuantity' },
            
            { title: 'Total', 
              render: rowData => (
                `$${(parseFloat(rowData.storeGood.product.markedUpPrice)) * (parseFloat(rowData.invoicedQuantity))}`
              )   
            },

          ]}
          data={JSON.parse(JSON.stringify(invoiceQuery.invoice))}
        />      	
        
    </div>
  )
}

export default Invoice

