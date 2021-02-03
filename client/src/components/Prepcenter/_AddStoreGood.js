import React, {useState, useCallback} from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable from 'material-table';
import NewStoreGoodDrawer from './_NewStoreGoodDrawer.js'
import { GET_PREPCENTER_PRODUCTS } from './prepcenter.query'

const AddStoreGood = ({...props}) => {
  const {data: prepcenterProductsQuery, loading: prepcenterProductsQueryLoading, refetch: prepcenterProductsRefetch} = useQuery(GET_PREPCENTER_PRODUCTS, {
    variables: {
      prepcenterId: parseInt(props.match.params.prepcenterId)
    }
  })
  const [ currentProduct, setCurrentProduct ] = useState('');

  const [visible, setVisible] = useState(false);
  const onOpen = useCallback(() => setVisible(true), []);
  const onClose = useCallback(() => setVisible(false), []);
  
  if (prepcenterProductsQueryLoading) return 'Loading...'

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
          data={JSON.parse(JSON.stringify(prepcenterProductsQuery.prepcenterProducts))}         
        />      	
         <NewStoreGoodDrawer
          visible={visible} 
          onClose={onClose}
          storeProductsRefetch={prepcenterProductsRefetch}
          prepcenterId={props.match.params.prepcenterId}
          currentProduct={currentProduct}
        />    
    </div>
  )
}

export default AddStoreGood

