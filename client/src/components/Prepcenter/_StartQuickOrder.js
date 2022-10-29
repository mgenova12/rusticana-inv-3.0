import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import { CREATE_QUICK_ORDER } from './prepcenter.mutation'
import { DELETE_INVENTORY } from '../Store/store.mutation'
import { GET_STORES } from '../Home/home.query'
import { GET_QUICK_ORDER_STATUS } from './prepcenter.query'
import BeatLoader from "react-spinners/BeatLoader"

const StartQuickOrder = ({...props}) => {
  const { register, handleSubmit, reset } = useForm({mode: "onBlur"});

  const {data: storesQuery, loading: storesQueryLoading } = useQuery(GET_STORES)

  const {data: quickOrderStatusQuery, loading: quickOrderStatusQueryLoading, refetch: quickOrderStatusRefetch} = useQuery(GET_QUICK_ORDER_STATUS, {
    fetchPolicy: "network-only",
    variables: {
      prepcenterId: parseInt(props.match.params.prepcenterId)
    }
  })

  const [createQuickOrder, { loading: createQuickOrderLoading }] = useMutation(CREATE_QUICK_ORDER, {
    onCompleted(data) {
      props.history.push(`/prepcenter/${props.match.params.prepcenterId}/order/${data.createQuickOrder.order.id}/quick_order`)
      quickOrderStatusRefetch()
    }
  });

  const [deleteInventory, {loading: deleteInventoryLoading}] = useMutation(DELETE_INVENTORY, {
    onCompleted(data) {
      quickOrderStatusRefetch()
    }
  });  

  const handleDeleteQuickOrder = () => {
    if (window.confirm("ARE YOU SURE YOU WANT TO DELETE THIS QUICK ORDER?")) {
      deleteInventory({
        variables: {
          orderId: parseInt(quickOrderStatusQuery.getPrepcenter.quickOrderStatus.id)
        }
      })
    }
  }

  const onSubmit = data => {
    createQuickOrder({
      variables: {
        storeId: parseInt(data.store),
      }
    })
    reset()
  }

  if (quickOrderStatusQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (storesQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (createQuickOrderLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (deleteInventoryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <div>
    <Container component="main" maxWidth="sm">

    {!quickOrderStatusQuery.getPrepcenter.quickOrderStatus ? (

      <div className="center">
        <h1> Select Store </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <TextField
            select
            inputRef={register({required: true})}
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
            {storesQuery.stores.map(store =>
              <option key={store.id} value={store.id}>{store.name}</option>
            )}
          </TextField> 

           <Button type='submit' variant="contained" color="primary" size="large" >
              Start Quick Order
           </Button>
        </form>  
      </div>    
      
      ) : (

        <div className="center"> 
          <h1> An Quick Order Has Already Been Started! </h1>
           <div className="d-inline-block"> 
              <Button 
                className="button m-2" 
                type='submit' 
                variant="contained" 
                color="primary" 
                size="large" 
                onClick={() => props.history.push(`/prepcenter/${props.match.params.prepcenterId}/order/${quickOrderStatusQuery.getPrepcenter.quickOrderStatus.id}/quick_order`)} >
                Go To Quick Order
              </Button>

              <Button 
                className="button m-2"
                type='submit'
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleDeleteQuickOrder}
                >
                Cancel Quick Order
              </Button> 
           </div>
        </div>

      )}

      </Container>
    </div>
  )
}

export default StartQuickOrder

