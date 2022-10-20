import React, {useState } from 'react';
import { useQuery } from '@apollo/client';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';


const QuickOrder = ({...props}) => {
  
  const { register, handleSubmit, errors, reset } = useForm({mode: "onBlur"});
  const onSubmit = data => {
    console.log('submit')
  }
  return (
    <div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Search Product by barcode"
          inputRef={register({required: true})}
          name="barcode"
          // error={errors.barcode ? true : false}
          placeholder="Search Product Name"
          fullWidth
          margin="normal"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    </div>
  )
}

export default QuickOrder

