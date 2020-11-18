import React, {useState, useCallback} from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable from 'material-table';
import { GET_COMBINED_STORE_ORDERS} from './prepcenter.query'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const CombinedStoreOrders = ({...props}) => {

  const {data: combinedStoreOrdersQuery, loading: combinedStoreOrdersQueryLoading} = useQuery(GET_COMBINED_STORE_ORDERS, {
    variables: {
      storeOrderId: parseInt(props.match.params.storeOrderId)
    }
  })

  const [activeTab, setActiveTab] = useState('nonPrepped');
  const selectTab = useCallback((prepped) => setActiveTab(prepped), []);

  if (combinedStoreOrdersQueryLoading) return 'Loading...'
  
  const results = activeTab === 'nonPrepped'
    ? combinedStoreOrdersQuery.combinedStoreOrders.filter(product => product.prepped === false)
    : combinedStoreOrdersQuery.combinedStoreOrders.filter(product => product.prepped === true)


  return (
    <div>
       <AppBar position="static" color="default">
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          value={activeTab}
        >

          <Tab
            label='Non-prepped'
            style={{outlineStyle:'none'}}
            value={'nonPrepped'}
            onClick={() => selectTab('nonPrepped')}
          />

          <Tab
            label='Prepped'
            style={{outlineStyle:'none'}}
            onClick={() => selectTab('prepped')}
            value={'prepped'}
          />

        </Tabs>
      </AppBar>


        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title="Store Order"
          options={{
            paging: false,
            actionsColumnIndex: -1,
          }}          
          columns={[
            { title: 'Product', field: 'name' },
            {
              title: 'Bypass',
              render: rowData => (
                (rowData.inventories.find(inventory => inventory.store.name === 'Bypass') !== undefined) && rowData.inventories.find(inventory => inventory.store.name === 'Bypass').quantityNeeded
              )
            },            
            {
              title: 'Cambridge',
              render: rowData => (
                (rowData.inventories.find(inventory => inventory.store.name === 'Cambridge') !== undefined) && rowData.inventories.find(inventory => inventory.store.name === 'Cambridge').quantityNeeded
              )
            },    
            {
              title: 'Dover Road',
              render: rowData => (
                (rowData.inventories.find(inventory => inventory.store.name === 'Dover Road') !== undefined) && rowData.inventories.find(inventory => inventory.store.name === 'Dover Road').quantityNeeded
              )
            },  
            {
              title: 'Total',
              render: rowData => (
                rowData.inventories.map(item => item.quantityNeeded).reduce((prev, curr) => prev + curr, 0)
              )
            },    
            { title: 'On Hand', field: 'onHand',
              // render: rowData => (
              //   rowData.inventories[0].store.prepcenter
              // )            

            },
            { title: 'Need', field: 'need' },
          ]}
          data={JSON.parse(JSON.stringify(results))}           
        />      	
          
    </div>
  )
}

export default CombinedStoreOrders






