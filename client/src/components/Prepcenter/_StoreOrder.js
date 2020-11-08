import React, {useState, useCallback} from 'react';
import { useQuery } from '@apollo/client';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { GET_CONTAINERS } from '../Store/container.query'
import { GET_STORE_ORDER } from './storeOrders.query'

const StoreOrder = ({...props}) => {

  const {data: storeOrderInventoriesQuery, loading: storeOrderInventoriesLoading} = useQuery(GET_STORE_ORDER, {
    variables: {
      orderId: parseInt(props.match.params.orderId)
    }
  })

  const {data: containersQuery, loading: containersQueryLoading} = useQuery(GET_CONTAINERS)

  const [activeTab, setActiveTab] = useState('unscanned');
  const selectTab = useCallback((scanned) => setActiveTab(scanned), []);

  if (storeOrderInventoriesLoading) return 'Loading...'
  if (containersQueryLoading) return 'Loading...'

  const results = activeTab === 'unscanned'
    ? storeOrderInventoriesQuery.storeOrderInventories.filter(inventory => !inventory.scanned)
    : storeOrderInventoriesQuery.storeOrderInventories.filter(inventory => inventory.scanned)    

  return (
    <div>

    <Container component="main" maxWidth="md">
      <div align="center" className="mt-2">
        <Button variant="contained" color="primary" size="large"> Next Step</Button> 
      </div>
      
      <TextField
          label="Search Product by barcode"
          required
          name="barcode"
          placeholder="Search Product by barcode"
          fullWidth
          margin="normal"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        
      </Container>

       <AppBar position="static" color="default">
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          value={activeTab}
        >

          <Tab
            label='unscanned'
            style={{outlineStyle:'none'}}
            value={'unscanned'}
            onClick={() => selectTab('unscanned')}
          />

          <Tab
            label='scanned'
            style={{outlineStyle:'none'}}
            onClick={() => selectTab('scanned')}
            value={'scanned'}
          />

        </Tabs>
      </AppBar>

      <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Checked</th>
                <th>Barcode</th>
                <th>Product</th>
                <th>Store Quantity</th>
                <th>Quantity Needed</th>
              </tr>
            </thead>

            { containersQuery.containers.map((container) => (
              <thead className="thead-dark" key={container.id}>
                <tr align='center'> 
                  <th colSpan="5">{container.name}</th>
                </tr>

                {results.map((inventory) => (
                  (inventory.storeGood.container.id === container.id &&
                    <tr key={inventory.id}> 
                      <td> <Checkbox value="checkedA" /> </td>
                      <td>{inventory.product.barcode}</td>                
                      <td>{inventory.product.name}</td>
                      <td>{inventory.quantity} {inventory.storeGood.countBy.name}</td> 
                      <td>{inventory.quantityNeeded} {inventory.storeGood.replenishBy}</td> 
                    </tr> 
                  )
                ))}
              </thead>
            ))}
          </table> 
      </div>
    </div>
  )
}

export default StoreOrder






