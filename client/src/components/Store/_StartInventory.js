import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import { CREATE_INVENTORY } from './inventory.mutation'
import { DELETE_INVENTORY } from './inventory.mutation'
import { GET_ORDER_STATUS } from './inventory.query'

const StartInventory = ({...props}) => {
  const { register, handleSubmit, errors, reset } = useForm({mode: "onBlur"});
  
  const {data: orderStatusQuery, loading: orderStatusQueryLoading, refetch: orderStatusRefetch} = useQuery(GET_ORDER_STATUS, {
    fetchPolicy: "network-only",
    variables: {
      storeId: parseInt(props.match.params.storeId)
    }
  })

  const [createInventory, { loading: createInventoryLoading }] = useMutation(CREATE_INVENTORY);
  const [deleteInventory] = useMutation(DELETE_INVENTORY);

  const handleDeleteInventory = () => {
    if (window.confirm("ARE YOU SURE YOU WANT TO DELETE THIS INVENTORY?")) {
      deleteInventory({ 
        variables: { 
          orderId: parseInt(orderStatusQuery.orderStatus.id)
        }
      }).then(() => orderStatusRefetch());

    }
  }

  const onSubmit = data => {
    createInventory({ 
      variables: { 
        storeId: parseInt(props.match.params.storeId),
        deliveryDay: data.deliveryDay,
      }
    }).then(() => {
      orderStatusRefetch()
      props.history.push(`/store/${props.match.params.storeId}/inventory`)
    });
    reset()
  }

  if (orderStatusQueryLoading) return 'Loading...'
  if (createInventoryLoading) return 'Loading...'

  return (
    <Container component="main" maxWidth="sm">
    {!orderStatusQuery.orderStatus ? (

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

      ) : (

        <div className="center"> 
          <h1> An Inventory Has Already Been Started! </h1>
           <div className="d-inline-block"> 
              <Button className="button mr-2 ml-2" type='submit' variant="contained" color="primary" size="large" onClick={() => props.history.push(`/store/${props.match.params.storeId}/inventory`)} >
                Go To Inventory
              </Button>

              <Button className="button mr-2 ml-2" type='submit' variant="contained" color="secondary" size="large" onClick={handleDeleteInventory} >
                Cancel Inventory
              </Button> 
           </div>
        </div>

      )}

    </Container>
  )
}

export default StartInventory




