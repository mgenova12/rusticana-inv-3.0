import React from 'react';
import { useQuery } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import MaterialTable  from 'material-table';
import { GET_INVOICE } from './invoices.query'
import BeatLoader from "react-spinners/BeatLoader"

const MyNewTitle = ({variant = "h6", orderId, saleTotal, store }) => (
  <div>
      <Typography
        variant={variant}
        style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}
      >
      Store: {store}

      </Typography>

      <Typography
        variant={variant}
        style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}
      >
      Invoice #: {orderId}
      </Typography>

    <Typography 
      variant={variant}
      style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}
    >
      Total: ${saleTotal.toFixed(2)}
    </Typography>  
  </div>
);

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
            <MyNewTitle variant="h5" 
              orderId={props.match.params.orderId} 
              saleTotal={invoiceQuery.getOrder.saleTotal}
              store={invoiceQuery.getOrder.store.name}
            />
          }

          options={{
            paging: false,
          }}
      
          columns={[
            { title: 'Product', field: 'storeGood.product.name' },
            
            { title: 'Invoiced Price',  
              render: rowData => (
                (parseFloat(rowData.invoicedProductPrice)).toLocaleString('en-US', {style: 'currency',currency: 'USD'})
              )   
            },            
            { title: 'Case Quantity', field: 'storeGood.product.caseQuantity' },
            { title: 'Quantity Invoiced', field: 'invoicedQuantity' },
            { title: 'Invoiced Total', field: 'invoicedPrice', type: "currency", currencySetting:{ currencyCode:'USD', minimumFractionDigits:2, maximumFractionDigits:2} },
          ]}
          data={JSON.parse(JSON.stringify(invoiceQuery.getOrder.scannedInventories))}
        />      	
        
    </div>
  )
}

export default Invoice
