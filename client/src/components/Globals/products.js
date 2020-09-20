import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from './products.query'
import { EDIT_PRODUCT } from './products.mutation'
import MaterialTable from 'material-table';

const Products = () => {  
  const result = useQuery(GET_PRODUCTS)
  const [editProduct, { data }] = useMutation(EDIT_PRODUCT);

  if (result.loading)  {
    return <h2>loading...</h2>
  }
console.log(JSON.parse(JSON.stringify(result.data)).products)

  return (
    <div >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />     
        <MaterialTable
          title="Global Non-Prepped Products"
          options={{
            paging: false,
            actionsColumnIndex: -1
          }} 
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  editProduct({ variables: { 
                    // id: newData.id, 
                    // name: newData.name,
                    // distributor: newData.distributor,
                    // category: newData.category,
                    // price: newData.price,
                    // markUp: newData.markUp,
                    // caseQuantity: newData.caseQuantity,
                  } });
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();

                }, 600);
              }), 
            }}
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Name', field: 'name' },
            { 
              title: 'Distributor', 
              field: 'distributor.name',
              // lookup: distributors,
            },
            { 
              title: 'Category', 
              field: 'category.name',
              // lookup: categories,
            },
            { title: 'Case Quantity', field: 'caseQuantity' },
            { title: 'Mark Up', field: 'markUp'},
            { title: 'Price', field: 'price', type: "currency" },
            { title: 'Final Price', field: 'markedUpPrice', editable: 'never', type: "currency" },

          ]}
          data={JSON.parse(JSON.stringify(result.data)).products}           
        />
    </div>
  )
}

export default Products


