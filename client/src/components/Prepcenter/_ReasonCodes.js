import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_UNSCANNED_STORE_ORDER } from './storeOrders.query'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const ReasonCodes = ({...props}) => {

  const {data: unscannedStoreOrderInventoriesQuery, loading: unscannedStoreOrdernventoriesLoading} = useQuery(GET_UNSCANNED_STORE_ORDER, {
    variables: {
      orderId: parseInt(props.match.params.orderId)
    }
  })

  if (unscannedStoreOrdernventoriesLoading) return 'Loading...'
  
  return (
    <div>
      <div align="center" className="m-2">
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
        > Finish Order </Button> 
      </div>

      <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Reason Codes</th>
              </tr>
            </thead>
            <thead>
              {unscannedStoreOrderInventoriesQuery.unscannedStoreOrderInventories.map((inventory) => (
                <tr key={inventory.id}> 
                  <td>{inventory.product.id}</td>                
                  <td>{inventory.product.name}</td>
                  <td>
                    <TextField
                        select
                        label="Reason Code"
                        name="reasonCode"
                        placeholder="Select a Reason Code"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option key='' value=''></option>
                        <option key='reason1' value='Out of Stock'>Out of Stock</option>
                        <option key='reason2' value='Not Ready'>Not Ready</option>
                        <option key='reason3' value='Waiting on Delivery'>Waiting on Delivery</option>

                      </TextField>  

                  </td> 
                </tr> 
              ))}
            </thead>
          </table> 
      </div>
    </div>
  )
}

export default ReasonCodes

