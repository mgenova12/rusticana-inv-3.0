import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from './products.query'
import { GET_CATEGORIES } from './category.query'
import { GET_DISTRIBUTORS } from './distributor.query'
import { EDIT_PRODUCT } from './products.mutation'
import { DELETE_PRODUCT } from './products.mutation'
import MaterialTable from 'material-table';

const Products = () => {  
  const products = useQuery(GET_PRODUCTS)
  const categories = useQuery(GET_CATEGORIES)
  const distributors = useQuery(GET_DISTRIBUTORS)
  const [editProduct] = useMutation(EDIT_PRODUCT);
  const [deleteProduct, {data} ] = useMutation(DELETE_PRODUCT);

  if (products.loading)  {
    return <h2>loading...</h2>
  }
  if (categories.loading)  {
    return <h2>loading...</h2>
  }
  if (distributors.loading)  {
    return <h2>loading...</h2>
  }  
  let categoriesLookup = categories.data.categories.reduce((obj, item) => (obj[item.id] = item.name, obj) ,{});
  let distributorsLookup = distributors.data.distributors.reduce((obj, item) => (obj[item.id] = item.name, obj) ,{});

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
                    editProduct({ 
                      variables: { 
                        id: parseInt(newData.id), 
                        name: newData.name,
                        distributorId: parseInt(newData.distributor.id),
                        categoryId: parseInt(newData.category.id),
                        caseQuantity: parseInt(newData.caseQuantity),
                        markUp: parseInt(newData.markUp),
                        price: parseFloat(newData.price),
                      }
                    });
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                    deleteProduct({ 
                      variables: { 
                        id: parseInt(oldData.id)
                      } 
                    }).then(() => products.refetch());
                }, 300);
              }), 
            }}
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Name', field: 'name' },
            { 
              title: 'Distributor', 
              field: 'distributor.id',
              lookup: distributorsLookup,
            },
            { 
              title: 'Category', 
              field: 'category.id',
              lookup: categoriesLookup,
            },
            { title: 'Case Quantity', field: 'caseQuantity' },
            { title: 'Mark Up', field: 'markUp'},
            { title: 'Price', field: 'price', type: "currency" },
            { title: 'Final Price', field: 'markedUpPrice', editable: 'never', type: "currency" },

          ]}
          data={JSON.parse(JSON.stringify(products.data)).products}           
        />
    </div>
  )
}

export default Products


