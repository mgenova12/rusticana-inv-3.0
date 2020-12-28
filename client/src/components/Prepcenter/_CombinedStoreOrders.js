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
              title: 'Easton Bypass',
              render: rowData => (
                rowData.productInventories.map(inventory => inventory.store.name === 'Easton Bypass' ? inventory.quantityNeeded : 'X')
              )
            },
            {
              title: 'Cambridge',
              render: rowData => (
                rowData.productInventories.map(inventory => inventory.store.name === 'Cambridge' ? inventory.quantityNeeded : 'X')
              )
            },    
            {
              title: 'Dover Road',
              render: rowData => (
                rowData.productInventories.map(inventory => inventory.store.name === 'Dover Road' ? inventory.quantityNeeded : 'X')
              )
            },  
            {
              title: 'Total',
              render: rowData => (
                rowData.productInventories.map(item => item.quantityNeeded).reduce((prev, curr) => prev + curr, 0)
              )
            },    
            { 
              title: 'On Hand', field: 'onHand',
              render: rowData => (
                rowData.storeGoods.map(storeGood => storeGood.prepcenterId ? storeGood.amountInStock : '' )
              )            

            },
            { 
              title: 'Need', field: 'need',
              render: rowData => (
                (parseInt(rowData.storeGoods.map(storeGood => storeGood.prepcenterId ? storeGood.amountInStock : '' )[1])) - (parseInt(rowData.productInventories.map(item => item.quantityNeeded).reduce((prev, curr) => prev + curr, 0)))
              )               
            },
          ]}
          data={JSON.parse(JSON.stringify(results))}
        />      	
          
    </div>
  )
}

export default CombinedStoreOrders






