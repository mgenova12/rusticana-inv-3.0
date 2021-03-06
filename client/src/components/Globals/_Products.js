import React, { useState, useCallback } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from './globals.query'
import { GET_CATEGORIES } from './globals.query'
import { GET_DISTRIBUTORS } from './globals.query'
import { EDIT_PRODUCT } from './globals.mutation'
import { DELETE_PRODUCT } from './globals.mutation'
import { GET_CONTAINERS } from './globals.query'
import MaterialTable from 'material-table';
import ProductsDrawer from './_ProductsDrawer.js'
import NewProductDrawer from './_NewProductDrawer.js'
import BeatLoader from "react-spinners/BeatLoader"

const Products = () => {
  const {data: productsQuery, loading: productsQueryLoading, refetch: productsRetch } = useQuery(GET_PRODUCTS)
  const {data: categoriesQuery, loading: categoriesQueryLoading} = useQuery(GET_CATEGORIES)
  const {data: distributorsQuery, loading: distributorsQueryLoading} = useQuery(GET_DISTRIBUTORS)
  const {data: containersQuery, loading: containersQueryLoading} = useQuery(GET_CONTAINERS)
  
  const [ currentProduct, setCurrentProduct ] = useState('');

  const [visible, setVisible] = useState(false);
  const onOpen = useCallback(() => setVisible(true), []);
  const onClose = useCallback(() => setVisible(false), []);

  const [visibleNewProductDrawer, setVisibleNewProductDrawer] = useState(false);
  const openNewProductDrawer = useCallback(() => setVisibleNewProductDrawer(true), []);
  const closeNewProductDrawer = useCallback(() => setVisibleNewProductDrawer(false), []);  

  const handleRowDelete = (oldData) => {
    deleteProduct({ 
      variables: { 
        id: parseInt(oldData.id)
      } 
    }).then(() => productsRetch())
  }
  
  const [editProduct] = useMutation(EDIT_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  if (productsQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (categoriesQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (distributorsQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (containersQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
 
  let categoriesLookup = categoriesQuery.categories.reduce((obj, item) => ((obj[item.id] = item.name, obj)) ,{});
  let distributorsLookup = distributorsQuery.distributors.reduce((obj, item) => ((obj[item.id] = item.name, obj)) ,{});
  let containerLookup = containersQuery.containers.reduce((obj, item) => ((obj[item.id] = item.name, obj)) ,{});

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
                        containerId: parseInt(newData.container.id)
                      }
                    }).then(() => productsRetch());

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
            actions={[
              {
                icon: "add_box",
                tooltip: "add product",
                position: "toolbar",
                onClick: () => {openNewProductDrawer()}
              },              
              {
                icon: 'add',
                tooltip: 'Add',
                onClick: (event, rowData) => {
                  // event.stopPropagation()
                  onOpen()
                  setCurrentProduct(rowData)
                }
              },
            ]}
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
            { 
              title: 'Container', 
              field: 'container.id',
              lookup: containerLookup
            },             
            { title: 'Case Quantity', field: 'caseQuantity' },
            { title: 'Mark Up', field: 'markUp'},
            { title: 'Price', field: 'price', type: "currency" },
            { title: 'Final Price', field: 'markedUpPrice', editable: 'never', type: "currency" },

          ]}
          data={JSON.parse(JSON.stringify(productsQuery.products))}           
        />
      
        <ProductsDrawer
          categories={categoriesQuery.categories}
          visible={visible} 
          onClose={onClose}
          currentProduct={currentProduct}
          containers={containersQuery.containers}
        />  
        <NewProductDrawer
          visible={visibleNewProductDrawer} 
          onClose={closeNewProductDrawer}
          distributors={distributorsQuery.distributors}
          categories={categoriesQuery.categories}
          productsRetch={productsRetch}
          containers={containersQuery.containers}
        />  
    </div>
  )
}

export default Products
