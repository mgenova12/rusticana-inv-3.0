import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import { CREATE_INVENTORY } from './inventory.mutation'

const StartInventory = ({...props}) => {
  const { register, handleSubmit, errors, reset } = useForm({mode: "onBlur"});

  const [createInventory] = useMutation(CREATE_INVENTORY);


  const onSubmit = data => {
    createInventory({ 
      variables: { 
        storeId: parseInt(props.match.params.storeId),
        deliveryDay: data.deliveryDay,
      }
    });
    reset()
  }

  return (
    <Container component="main" maxWidth="sm">
      <div className="center">
        <h1> Select Delivery Day </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <TextField
            select
            inputRef={register({required: true})}
            error={errors.deliveryDay ? true : false}            
            label="Delivery Day"
            name="deliveryDay"
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
            <option key='Tuesday' value='Tuesday'>Tuesday</option>
            <option key='Friday' value='Friday'>Friday</option>
          </TextField> 

           <Button type='submit' variant="contained" color="primary" size="large" >
                Start Inventory
           </Button>
        </form>  
      </div>
    </Container>
  )
}

export default StartInventory




