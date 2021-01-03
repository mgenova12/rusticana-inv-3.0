import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import { CREATE_PREPCENTER_INVENTORY } from './prepcenter.mutation'
import { DELETE_INVENTORY } from '../Store/store.mutation'
import { GET_PREPCENTER_ORDER_STATUS } from './prepcenter.query'

const StartInventory = ({...props}) => {
  const { register, handleSubmit, errors, reset } = useForm({mode: "onBlur"});
  
  const {data: prepcenterOrderStatusQuery, loading: prepcenterOrderStatusQueryLoading, refetch: prepcenterOrderStatusRefetch} = useQuery(GET_PREPCENTER_ORDER_STATUS, {
    fetchPolicy: "network-only",
    variables: {
      prepcenterId: parseInt(props.match.params.prepcenterId)
    }
  })

  const [createPrepcenterInventory, { loading: createInventoryLoading }] = useMutation(CREATE_PREPCENTER_INVENTORY);
  const [deleteInventory] = useMutation(DELETE_INVENTORY);

  const handleDeleteInventory = () => {
    if (window.confirm("ARE YOU SURE YOU WANT TO DELETE THIS INVENTORY?")) {
      deleteInventory({ 
        variables: {
          orderId: parseInt(prepcenterOrderStatusQuery.prepcenterOrderStatus.id)
        }
      }).then(() => prepcenterOrderStatusRefetch());

    }
  }

  const onSubmit = data => {
    createPrepcenterInventory({ 
      variables: { 
        prepcenterId: parseInt(props.match.params.prepcenterId),
        deliveryDay: data.deliveryDay,
      }
    }).then(() => {
      prepcenterOrderStatusRefetch()
      props.history.push(`/prepcenter/${props.match.params.prepcenterId}/inventory`)
    });
    reset()
  }

  if (prepcenterOrderStatusQueryLoading) return 'Loading...'
  if (createInventoryLoading) return 'Loading...'

  return (
    <Container component="main" maxWidth="sm">
    {!prepcenterOrderStatusQuery.prepcenterOrderStatus ? (

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
            <option key='Prepped' value='Prepped'>Prepped Inventory</option>
            <option key='Distributor' value='Distributor'>Distributor Inventory</option>
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
              <Button className="button m-2" type='submit' variant="contained" color="primary" size="large" onClick={() => props.history.push(`/prepcenter/${props.match.params.prepcenterId}/inventory`)} >
                Go To Inventory
              </Button>

              <Button className="button m-2" type='submit' variant="contained" color="secondary" size="large" onClick={handleDeleteInventory} >
                Cancel Inventory
              </Button> 
           </div>
        </div>

      )}

    </Container>
  )
}

export default StartInventory




