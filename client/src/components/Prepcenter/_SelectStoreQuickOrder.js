import React, {useState } from 'react';
import { useQuery } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";

const SelectStoreQuickOrder = ({...props}) => {
  const { register, handleSubmit, errors, reset } = useForm({mode: "onBlur"});

  const onSubmit = data => {
    // createPrepcenterInventory({ 
    //   variables: { 
    //     prepcenterId: parseInt(props.match.params.prepcenterId),
    //     deliveryDay: data.deliveryDay,
    //   }
    // })
    // reset()
  }

  return (
    <div>
    <Container component="main" maxWidth="sm">
      <div className="center">
        <h1> Select Store </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <TextField
            select
            inputRef={register({required: true})}
            // error={errors.deliveryDay ? true : false}
            label="Store"
            name="store"
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
            <option key='Dover Road' value='Dover Road'>Dover Road</option>
            <option key='Cambridge' value='Cambridge'>Cambridge</option>
          </TextField> 

           <Button type='submit' variant="contained" color="primary" size="large" >
              Start Quick Order
           </Button>
        </form>  
      </div>    
      </Container>
    </div>
  )
}

export default SelectStoreQuickOrder

