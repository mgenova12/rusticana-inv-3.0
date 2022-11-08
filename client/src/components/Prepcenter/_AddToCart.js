import React from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CREATE_PENDING_INVENTORY} from './prepcenter.mutation'

const AddToCart = ({ storeGoodId, orderId, handleCounter }) => {
  const { register, handleSubmit, reset } = useForm({mode: "onChange"});
  const [createPendingInventory] = useMutation(CREATE_PENDING_INVENTORY, {
    onCompleted(data) {
      handleCounter(data.createPendingInventory.pendingInventoryCount)
    } 
  });

  const onSubmit = data => {
    createPendingInventory({
      variables: { 
        storeGoodId: parseInt(storeGoodId),
        orderId: parseInt(orderId),
        quantity: parseInt(data[storeGoodId])
      }
    })
    reset()
  }

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            inputRef={register}
            pattern="\d*"
            type="number"
            label="Quantity"
            name={storeGoodId}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Add to Cart
          </Button>
        </form>

    </div>
  )
}

export default AddToCart
