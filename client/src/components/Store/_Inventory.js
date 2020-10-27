import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { GET_LOCATIONS } from './locations.query'
import { GET_INVENTORY} from './inventory.query'
import { EDIT_INVENTORY_QUANTITY} from './inventory.mutation'
import { EDIT_INVENTORY_QUANTITY_NEEDED} from './inventory.mutation'
import { useForm } from "react-hook-form";

const Inventory = ({...props}) => {
  const { register, handleSubmit, errors, getValues } = useForm({mode: "onBlur"});
  const [editInventoryQuantity] = useMutation(EDIT_INVENTORY_QUANTITY);
  const [editInventoryQuantityNeeded] = useMutation(EDIT_INVENTORY_QUANTITY_NEEDED);

  const {data: inventoryQuery, loading: inventoryQueryLoading} = useQuery(GET_INVENTORY, {
    fetchPolicy: "network-only",
    variables: {
      storeId: parseInt(props.match.params.storeId)
    }
  })
  const {data: locationsQuery, loading: locationsQueryLoading} = useQuery(GET_LOCATIONS, {
    fetchPolicy: "network-only",
    variables: {
      storeId: parseInt(props.match.params.storeId)
    }
  })

  const handleSave = (inventoryId) => {
    let quantity = parseInt(getValues(inventoryId))

    if (Number.isInteger(quantity)){
      editInventoryQuantity({
        variables: { 
          inventoryId: parseInt(inventoryId),
          quantity: quantity
        }
      }); 
    }
  }

  const onSubmit = data => {
    editInventoryQuantityNeeded({
      variables: { 
        storeId: parseInt(props.match.params.storeId),
      }
    }).then(() => props.history.push(`/store/${props.match.params.storeId}/inventory_success`)); 
    console.log(data)
  }
  
  if (inventoryQueryLoading) return 'Loading...'
  if (locationsQueryLoading) return 'Loading...'
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Count By</th>
              <th>Quantity</th>
            </tr>
          </thead>
          { locationsQuery.locations.map((location) => (
            <thead className="thead-dark" key={location.id}>
              <tr align='center'> 
                <th colSpan="3">{location.name}</th>
              </tr>
              {inventoryQuery.inventories.map((inventory) => (
                (inventory.storeGood.location.id === location.id &&
                  <tr key={inventory.id}> 
                    <td>{inventory.storeGood.product.name}</td>
                    <td>{inventory.storeGood.countBy.name}</td>                
                    <td>
                      {inventory.storeGood.countBy.name !== '%' ? (
                        <TextField
                          inputRef={register({required: true})}
                          error={errors[inventory.id] ? true : false} 
                          onChange={() => handleSave(inventory.id)}                    
                          pattern="\d*"
                          type="number"
                          label="Quantity"
                          defaultValue={inventory.quantity}
                          name={inventory.id}
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />    

                        ) : (
                        
                        <TextField
                          inputRef={register({required: true})}
                          error={errors[inventory.id] ? true : false}    
                          onChange={() => handleSave(inventory.id)}                          
                          select
                          label="Quantity"
                          name={inventory.id}
                          defaultValue={inventory.quantity}
                          placeholder="Select Quantity"
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
                          <option key='0' value='0'>0%</option>
                          <option key='25' value='25'>25%</option>
                          <option key='50' value='50'>50%</option>
                          <option key='75' value='75'>75%</option>
                          <option key='100' value='100'>100%</option>
                        </TextField>
                      )}                         
                    </td> 
                  </tr>
                )
              ))}
            </thead>
          ))}
        </table> 

        <div align='center'>
          <Button type='submit' variant="contained" color="primary">
            Submit Inventory
          </Button> 
        </div>

      </form>
    </div>
  )
}

export default Inventory





