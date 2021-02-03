import React, {useState, useCallback} from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable from 'material-table';
import NewStoreGoodDrawer from './_NewStoreGoodDrawer.js'
import { GET_STORE_PRODUCTS } from './store.query'
import BeatLoader from "react-spinners/BeatLoader"

const AddStoreGood = ({...props}) => {
  const {data: storeProductsQuery, loading: storeProductsQueryLoading, refetch: storeProductsRefetch} = useQuery(GET_STORE_PRODUCTS, {
    variables: {
      storeId: parseInt(props.match.params.storeId)
    }
  })
  const [ currentProduct, setCurrentProduct ] = useState('');

  const [visible, setVisible] = useState(false);
  const onOpen = useCallback(() => setVisible(true), []);
  const onClose = useCallback(() => setVisible(false), []);
  
  if (storeProductsQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  return (
    <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />         
        <MaterialTable
          title="Add Store Goods"
          options={{
            paging: false,
            actionsColumnIndex: -1
          }}          
          actions={[
            {
              icon: 'add',
              tooltip: 'Add',
              onClick: (event, rowData) => {
                onOpen()
                setCurrentProduct(rowData)
              }
            },
          ]}          
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Name', field: 'name' },
            { title: 'Brand', field: 'brand' },
            { title: 'Prepped', field: 'prepped', type: 'boolean' },            
          ]}
          data={JSON.parse(JSON.stringify(storeProductsQuery.storeProducts))}         
        />      	
        <NewStoreGoodDrawer
          visible={visible} 
          onClose={onClose}
          storeProductsRefetch={storeProductsRefetch}
          storeId={props.match.params.storeId}
          currentProduct={currentProduct}
        />          
    </div>
  )
}

export default AddStoreGood


