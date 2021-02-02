import React, {useState, useCallback} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { GET_CONTAINERS } from '../Globals/globals.query'
import { GET_STORE_ORDER } from './prepcenter.query'
import { SCAN_INVENTORY } from './prepcenter.mutation'
import { useForm } from "react-hook-form";
import BeatLoader from "react-spinners/BeatLoader"

const StoreOrder = ({...props}) => {
  const [scanInventory, { data: mutationData}] = useMutation(SCAN_INVENTORY);

  const {data: storeOrderInventoriesQuery, loading: storeOrderInventoriesLoading, refetch: storeOrderInventoriesRefetch} = useQuery(GET_STORE_ORDER, {
    variables: {
      orderId: parseInt(props.match.params.orderId)
    }
  })

  const {data: containersQuery, loading: containersQueryLoading} = useQuery(GET_CONTAINERS)

  const [activeTab, setActiveTab] = useState('unscanned');
  const selectTab = useCallback((scanned) => setActiveTab(scanned), []);

  const { register, handleSubmit, errors, reset } = useForm({mode: "onBlur"});

  const onSubmit = data => {
    scanInventory({
      variables: {
        barcode: parseInt(data.barcode),
        orderId: parseInt(props.match.params.orderId)
      }
    }).then(() => storeOrderInventoriesRefetch())
    reset()
  }

  if (storeOrderInventoriesLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (containersQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  const results = activeTab === 'unscanned'
    ? storeOrderInventoriesQuery.storeOrderInventories.filter(inventory => inventory.quantityNeeded > 0)
    : storeOrderInventoriesQuery.storeOrderInventories.filter(inventory => inventory.scanned)

  return (
    <div>

    <Container component="main" maxWidth="md">
      <div align="center" className="mt-2">
        <Button 
          onClick={() => props.history.push(`/prepcenter/${props.match.params.prepcenterId}/store_orders/${props.match.params.storeOrderId}/orders/${props.match.params.orderId}/reason_codes`)} 
          variant="contained" 
          color="primary" 
          size="large"
        > Next Step </Button> 
      </div>

      {mutationData && mutationData.scanInventory.errors.length > 0 && <p className="text-danger">Product Does Not Exist</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField        
            label="Search Product by barcode"
            inputRef={register({required: true})}
            name="barcode"
            error={errors.barcode ? true : false}
            placeholder="Search Product by barcode"
            fullWidth
            margin="normal"
            type="number"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>

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
                <th>{activeTab === 'scanned' ? 'Quantity Invoiced' : 'Quantity Needed'}</th>
              </tr>
            </thead>

            { containersQuery.containers.map((container) => (
              <thead className="thead-dark" key={container.id}>
                <tr align='center'>
                  <th colSpan="5">{container.name}</th>
                </tr>

                {results.map((inventory) => (
                  (inventory.storeGoodIncludingDeleted.productIncludingDeleted.container.id === container.id &&
                    <tr key={inventory.id}> 
                      <td> <Checkbox value="checkedA" /> </td>
                      <td>{inventory.storeGoodIncludingDeleted.productIncludingDeleted.barcode}</td>         
                      <td>{inventory.storeGoodIncludingDeleted.productIncludingDeleted.name}</td>
                      <td>{inventory.quantity} {inventory.storeGoodIncludingDeleted.countBy.name}</td> 
                      <td>{activeTab === 'scanned'? inventory.invoicedQuantity : inventory.quantityNeeded}  {inventory.storeGoodIncludingDeleted.replenishBy}</td> 
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

