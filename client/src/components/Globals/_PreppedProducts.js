import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import MaterialTable from 'material-table';
import { GET_PREPPED_PRODUCTS } from './preppedProducts.query'
import { GET_CATEGORIES } from './category.query'
import { DELETE_PRODUCT } from './products.mutation'

const PreppedProducts = () => {
  const {data: preppedProductsQuery, loading: preppedProductsQueryLoading, refetch: preppedProductsRefetch} = useQuery(GET_PREPPED_PRODUCTS)
  const {data: categoriesQuery, loading: categoriesQueryLoading} = useQuery(GET_CATEGORIES)

  const handleRowDelete = (oldData) => {
    deleteProduct({ 
      variables: { 
        id: parseInt(oldData.id)
      } 
    }).then(() => preppedProductsRefetch())
  }  

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  if (preppedProductsQueryLoading) return 'Loading...'
  if (categoriesQueryLoading) return 'Loading...'

  let categoriesLookup = categoriesQuery.categories.reduce((obj, item) => ((obj[item.id] = item.name, obj)) ,{});

  return (  
    <div>
 
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />         
        <MaterialTable
          title="Prepped Products"
          options={{
            paging: false,
            actionsColumnIndex: -1
          }}
          editable={{
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  handleRowDelete(oldData)
              }, 100);
            }), 
          }}          

          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Name', field: 'name' },
            { 
              title: 'Category', 
              field: 'category.id',
              lookup: categoriesLookup,
            },
            { title: 'Portion Size', field: 'portionSize' },
            { title: 'Case Quantity', field: 'caseQuantity' },
            { title: 'Mark Up', field: 'markUp', type: 'string'},
            { title: 'Final Price', field: 'markedUpPrice', editable: 'never', type: "currency" },
          ]}
          data={JSON.parse(JSON.stringify(preppedProductsQuery.preppedProducts))}           
        />      	         
    </div>
  )
}

export default PreppedProducts



