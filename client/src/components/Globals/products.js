import React, { useState, useCallback, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from './products.query'
import { GET_CATEGORIES } from './category.query'
import { GET_DISTRIBUTORS } from './distributor.query'
import { EDIT_PRODUCT } from './products.mutation'
import { DELETE_PRODUCT } from './products.mutation'
import MaterialTable from 'material-table';
import ProductsDrawer from './productsDrawer.js'

const Products = () => {
  console.log('render')
  const {data: productsQuery, loading: productsQueryLoading } = useQuery(GET_PRODUCTS)
  const {data: categoriesQuery, loading: categoriesQueryLoading} = useQuery(GET_CATEGORIES)
  const {data: distributorsQuery, loading: distributorsQueryLoading} = useQuery(GET_DISTRIBUTORS)
  
  const [ products, setProducts ] = useState(undefined);
  const [ currentProduct, setCurrentProduct ] = useState('');

  useEffect(() => {
    if(!productsQueryLoading && productsQuery){
      setProducts(JSON.parse(JSON.stringify(productsQuery.products)));
    }
  }, [productsQuery, productsQueryLoading])

  const [visible, setVisible] = useState(false);
  const onOpen = useCallback(() => setVisible(true), []);
  const onClose = useCallback(() => setVisible(false), []);

  const handleRowDelete = (oldData, products) => {
    deleteProduct({ 
      variables: { 
        id: parseInt(oldData.id)
      } 
    })

    const dataDelete = [...products];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);
    setProducts([...dataDelete]);
  }
  
  const [editProduct] = useMutation(EDIT_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  if (productsQueryLoading) return 'Loading...'
  if (categoriesQueryLoading) return 'Loading...'
  if (distributorsQueryLoading) return 'Loading...'
 
  let categoriesLookup = categoriesQuery.categories.reduce((obj, item) => (obj[item.id] = item.name, obj) ,{});
  let distributorsLookup = distributorsQuery.distributors.reduce((obj, item) => (obj[item.id] = item.name, obj) ,{});

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

                }, 300);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  handleRowDelete(oldData, products)
                }, 100);
              }), 
            }}
            actions={[
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
            { title: 'Case Quantity', field: 'caseQuantity' },
            { title: 'Mark Up', field: 'markUp'},
            { title: 'Price', field: 'price', type: "currency" },
            { title: 'Final Price', field: 'markedUpPrice', editable: 'never', type: "currency" },

          ]}
          data={products}           
        />
      
        <ProductsDrawer
          categories={categoriesQuery.categories}
          visible={visible} 
          onClose={onClose}
          currentProduct={currentProduct}
        />  

    </div>
  )
}

export default Products
