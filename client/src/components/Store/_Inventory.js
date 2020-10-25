import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { GET_LOCATIONS } from './locations.query'
import { GET_INVENTORY} from './inventory.query'
import { useForm } from "react-hook-form";

const Inventory = ({...props}) => {
  const { register, handleSubmit, errors, getValues } = useForm({mode: "onBlur"});

  const {data: inventoryQuery, loading: inventoryQueryLoading, refetch: inventoryRefetch} = useQuery(GET_INVENTORY, {
    variables: {
      storeId: parseInt(props.match.params.storeId)
    }
  })
  const {data: locationsQuery, loading: locationsQueryLoading, refetch: locationsRefetch} = useQuery(GET_LOCATIONS, {
    variables: {
      storeId: parseInt(props.match.params.storeId)
    }
  })

  const handleSave = (inventoryId) => {
    let quantity = getValues(inventoryId)
    console.log(quantity)
  }

  const onSubmit = data => {
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






