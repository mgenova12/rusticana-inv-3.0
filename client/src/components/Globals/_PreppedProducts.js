import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import MaterialTable from 'material-table';
import { GET_PREPPED_PRODUCTS } from './globals.query'
import { GET_CATEGORIES } from './globals.query'
import { DELETE_PRODUCT } from './globals.mutation'
import { GET_CONTAINERS } from './globals.query'
import { EDIT_PREPPED_PRODUCT } from './globals.mutation'

const PreppedProducts = () => {
  const {data: preppedProductsQuery, loading: preppedProductsQueryLoading, refetch: preppedProductsRefetch} = useQuery(GET_PREPPED_PRODUCTS)
  const {data: categoriesQuery, loading: categoriesQueryLoading} = useQuery(GET_CATEGORIES)
  const {data: containersQuery, loading: containersQueryLoading} = useQuery(GET_CONTAINERS)

  const handleRowDelete = (oldData) => {
    deleteProduct({ 
      variables: { 
        id: parseInt(oldData.id)
      } 
    }).then(() => preppedProductsRefetch())
  }  

  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [editPreppedProduct] = useMutation(EDIT_PREPPED_PRODUCT);

  if (preppedProductsQueryLoading) return 'Loading...'
  if (categoriesQueryLoading) return 'Loading...'
  if (containersQueryLoading) return 'Loading...'

  let categoriesLookup = categoriesQuery.categories.reduce((obj, item) => ((obj[item.id] = item.name, obj)) ,{});
  let containerLookup = containersQuery.containers.reduce((obj, item) => ((obj[item.id] = item.name, obj)) ,{});

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
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                    
                    editPreppedProduct({ 
                      variables: { 
                        id: parseInt(newData.id), 
                        name: newData.name,
                        categoryId: parseInt(newData.category.id),
                        containerId: parseInt(newData.container.id)
                      }
                    }).then(() => preppedProductsRefetch());

                }, 300);
              }),            
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
            { 
              title: 'Container', 
              field: 'container.id',
              lookup: containerLookup
            },             
            { title: 'Portion Size', field: 'portionSize', editable: 'never' },
            { title: 'Case Quantity', field: 'caseQuantity', editable: 'never' },
            { title: 'Mark Up', field: 'markUp', type: 'string', editable: 'never'},
            { title: 'Final Price', field: 'markedUpPrice', editable: 'never', type: "currency" },
          ]}
          data={JSON.parse(JSON.stringify(preppedProductsQuery.preppedProducts))}           
        />      	         
    </div>
  )
}

export default PreppedProducts



