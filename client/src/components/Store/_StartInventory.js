import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import { CREATE_INVENTORY } from './store.mutation'
import { DELETE_INVENTORY } from './store.mutation'
import { GET_ORDER_STATUS } from './store.query'
import BeatLoader from "react-spinners/BeatLoader"

const StartInventory = ({...props}) => {
  const { register, handleSubmit, errors, reset } = useForm({mode: "onBlur"});
  
  const {data: orderStatusQuery, loading: orderStatusQueryLoading, refetch: orderStatusRefetch} = useQuery(GET_ORDER_STATUS, {
    fetchPolicy: "network-only",
    variables: {
      storeId: parseInt(props.match.params.storeId)
    }
  })

  const [createInventory, {loading: createInventoryLoading}] = useMutation(CREATE_INVENTORY,{
    onCompleted(data) {
      props.history.push(`/store/${props.match.params.storeId}/order/${data.createInventory.order.id}/inventory`)
      orderStatusRefetch()
    }
  });

  const [deleteInventory, {loading: deleteInventoryLoading}] = useMutation(DELETE_INVENTORY, {
    onCompleted(data) {
      orderStatusRefetch()
    }
  });

  const handleDeleteInventory = () => {
    if (window.confirm("ARE YOU SURE YOU WANT TO DELETE THIS INVENTORY?")) {
      deleteInventory({ 
        variables: { 
          orderId: parseInt(orderStatusQuery.getStore.orderStatus.id)
        }
      })
    }
  }

  const onSubmit = data => {
    createInventory({ 
      variables: { 
        storeId: parseInt(props.match.params.storeId),
        deliveryDay: data.deliveryDay,
      }
    })
    reset()
  }
 
  if (orderStatusQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (createInventoryLoading) return  <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (deleteInventoryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <Container component="main" maxWidth="sm">
    {!orderStatusQuery.getStore.orderStatus ? 
        
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

      : ( orderStatusQuery.getStore.orderStatus.status === "incomplete" ?
        
        <div className="center"> 
          <h1> An Inventory Has Already Been Started! </h1>
           <div className="d-inline-block"> 
              <Button 
                className="button m-2" 
                type='submit' 
                variant="contained" 
                color="primary" 
                size="large" 
                onClick={() => props.history.push(`/store/${props.match.params.storeId}/order/${orderStatusQuery.getStore.orderStatus.id}/inventory`)} >
                Go To Inventory
              </Button>

              <Button 
                className="button m-2" 
                type='submit' 
                variant="contained" 
                color="secondary" 
                size="large" 
                onClick={handleDeleteInventory} >
                Cancel Inventory
              </Button> 
           </div>
        </div>
      :
        <div className="center"> 
          <h1> An Inventory Has Already Been Created For This Delivery Day! </h1>
        </div>
      )}

    </Container>
  )
}

export default StartInventory
