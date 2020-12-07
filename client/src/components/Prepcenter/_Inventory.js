import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { GET_PREPCENTER_LOCATIONS } from './prepcenter.query'
import { GET_PREPCENTER_INVENTORY} from './prepcenter.query'
import { EDIT_INVENTORY_QUANTITY} from '../Store/inventory.mutation'
import { EDIT_PREPCENTER_INVENTORY_QUANTITY_NEEDED} from './prepcenter.mutation'
import { useForm } from "react-hook-form";

const Inventory = ({...props}) => {
  const { register, handleSubmit, errors, getValues } = useForm({mode: "onChange"});
  const [editInventoryQuantity] = useMutation(EDIT_INVENTORY_QUANTITY);
  const [editPrepcenterInventoryQuantityNeeded, { loading: prepcenterInventoryQuantityNeededLoading }] = useMutation(EDIT_PREPCENTER_INVENTORY_QUANTITY_NEEDED);

  const {data: prepcenterInventoryQuery, loading: prepcenterInventoryQueryLoading} = useQuery(GET_PREPCENTER_INVENTORY, {
    fetchPolicy: "network-only",
    variables: {
      prepcenterId: parseInt(props.match.params.prepcenterId)
    }
  })

  const {data: prepcenterLocationsQuery, loading: prepcenterLocationsQueryLoading} = useQuery(GET_PREPCENTER_LOCATIONS, {
    variables: {
      prepcenterId: parseInt(props.match.params.prepcenterId)
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

  const handleEnter = (event) =>  {
    if (event.keyCode === 13) {
      var form = event.target.form;
      var index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 2].focus();
      event.preventDefault();
    }
  }

  const onSubmit = data => {
    editPrepcenterInventoryQuantityNeeded({
      variables: { 
        prepcenterId: parseInt(props.match.params.prepcenterId),
      }
    }).then(() => props.history.push(`/prepcenter/${props.match.params.prepcenterId}/inventory_success`)); 
  }
  
  if (prepcenterInventoryQueryLoading) return 'Loading...'
  if (prepcenterLocationsQueryLoading) return 'Loading...'
  if (prepcenterInventoryQuantityNeededLoading) return 'Loading...'
  
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
          { prepcenterLocationsQuery.prepcenterLocations.map((location) => (
            <thead className="thead-dark" key={location.id}>
              <tr align='center'> 
                <th colSpan="3">{location.name}</th>
              </tr>
              {prepcenterInventoryQuery.prepcenterInventories.map((inventory) => (
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
                          onKeyDown={handleEnter}
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
                          onKeyDown={handleEnter}                          
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
