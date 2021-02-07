import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_UNSCANNED_STORE_ORDER } from './prepcenter.query'
import { EDIT_FINAL_INVENTORY_ORDER } from './prepcenter.mutation'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import BeatLoader from "react-spinners/BeatLoader"

const ReasonCodes = ({...props}) => {
  const { register, handleSubmit, errors} = useForm({mode: "onChange"});

  const {data: unscannedStoreOrderInventoriesQuery, loading: unscannedStoreOrderInventoriesLoading} = useQuery(GET_UNSCANNED_STORE_ORDER, {
    variables: {
      orderId: parseInt(props.match.params.orderId)
    }
  })

  const [editFinalInventoryOrder, { loading: editFinalInventoryOrderLoading }] = useMutation(EDIT_FINAL_INVENTORY_ORDER);

  const onSubmit = data => {
    editFinalInventoryOrder({ 
      variables: { 
        orderId: parseInt(props.match.params.orderId),
        storeOrderId: parseInt(props.match.params.storeOrderId),
      }
    }).then(() => props.history.push(`/prepcenter/${props.match.params.prepcenterId}/inventory_success`)); 

  }

  if (unscannedStoreOrderInventoriesLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (editFinalInventoryOrderLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div align="center" className="m-2">
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            type='submit'
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
              {unscannedStoreOrderInventoriesQuery.getOrder.unscannedInventories.map((inventory) => (
                <tr key={inventory.id}> 
                  <td>{inventory.product.id}</td>                
                  <td>{inventory.product.name}</td>
                  <td>
                    <TextField
                      select
                      inputRef={register({required: true})}
                      error={errors[inventory.id] ? true : false}                         
                      label="Reason Code"
                      name={inventory.id}
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
      </form>
    </div>
  )
}

export default ReasonCodes

