import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from './products.query'
import MaterialTable from 'material-table';



const Products = () => {
  const result = useQuery(GET_PRODUCTS)

  if (result.loading)  {
    return <div>loading...</div>
  }
 
  return (
    <div >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />     
        <MaterialTable
          title="Global Products"
          options={{
            paging: false,
            actionsColumnIndex: -1
          }}           
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Name', field: 'name' },
            { title: 'Case Quantity', field: 'caseQuantity' },
            { title: 'Mark Up', field: 'markUp'},
            { title: 'Price', field: 'price', type: "currency" },

          ]}
          data={JSON.parse(JSON.stringify(result.data)).products}           
        />
    </div>
  )
}

export default Products


