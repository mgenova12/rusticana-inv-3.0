import React from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable  from 'material-table';
import { GET_INVOICE } from './invoices.query'
import BeatLoader from "react-spinners/BeatLoader"

const Invoice = ({...props}) => {
  const {data: invoiceQuery, loading: invoiceQueryLoading} = useQuery(GET_INVOICE, {
    variables: {
      orderId: parseInt(props.match.params.orderId)
    }    
  })

  if (invoiceQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        /> 
        <MaterialTable
          title={
            `Invoice #${props.match.params.orderId}`
          }
          options={{
            paging: false,
          }}
      
          columns={[
            { title: 'Product', field: 'storeGood.product.name' },
            
            { title: 'Invoiced Price', 
              render: rowData => (
                (parseFloat(rowData.invoicedProductPrice)).toLocaleString('en-US', {style: 'currency',currency: 'USD'}) + `${rowData.storeGood.product.caseQuantity ? "*" : ""}`
              )   
            },            

            { title: 'Quantity Invoiced', field: 'invoicedQuantity' },
            { title: 'Invoiced Total', field: 'invoicedPrice', type: "currency", currencySetting:{ currencyCode:'USD', minimumFractionDigits:2, maximumFractionDigits:2} },
          ]}
          data={JSON.parse(JSON.stringify(invoiceQuery.getOrder.scannedInventories))}
        />      	
        
    </div>
  )
}

export default Invoice
