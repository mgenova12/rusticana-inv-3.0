import React from "react";
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_STORE_GOOD } from './storeGoods.mutation'
import { GET_LOCATIONS } from './locations.query'
import { GET_COUNT_BIES } from './countBy.query'
import { GET_CONTAINERS } from './container.query'
import { GET_DISTRIBUTORS } from '../Globals/distributor.query'

const NewStoreGoodDrawer = ({ visible, onClose, storeProductsRefetch, storeId, currentProduct }) => {
  const {data: locationsQuery, loading: locationsQueryLoading} = useQuery(GET_LOCATIONS, {
    variables: {
      storeId: parseInt(storeId)
    }
  })
  const {data: distributorsQuery, loading: distributorsQueryLoading} = useQuery(GET_DISTRIBUTORS)
  const {data: countBiesQuery, loading: countBiesQueryLoading} = useQuery(GET_COUNT_BIES)
  const {data: containersQuery, loading: containersQueryLoading} = useQuery(GET_CONTAINERS)

  const [createStoreGood] = useMutation(CREATE_STORE_GOOD);
  
  const { register, handleSubmit, errors, reset } = useForm({mode: "onBlur"});

  const onSubmit = data => {
    createStoreGood({ 
      variables: { 
        storeId: parseInt(storeId),
        productId: parseInt(currentProduct.id),
        maxAmount: parseInt(data.maxAmount),
        locationId: parseInt(data.locationId),
        distributorId: parseInt(data.distributorId),
        deliveryDay: data.deliveryDay,
        countById: parseInt(data.countById),
        replenishBy: data.replenishBy,
        containerId: parseInt(data.containerId),
      }
    }).then(() => storeProductsRefetch());
		reset()
		onClose()
  }

  if (locationsQueryLoading) return 'Loading...'
  if (distributorsQueryLoading) return 'Loading...'
  if (countBiesQueryLoading) return 'Loading...'
  if (containersQueryLoading) return 'Loading...'

  return (
    <div>
			<Drawer 
        open={visible}
        variant="temporary"
        keepMounted={true}
        anchor="right"
        onClose={onClose}
      >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="mr-2 ml-2" align="center">{currentProduct.name}</h3>
        <List >
        
          <ListItem>
            <TextField
                type="number"
                label="Max Amount"
                name="maxAmount"
                inputRef={register({required: true})}
                error={errors.name ? true : false}              
                placeholder="Max Amount"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />            
          </ListItem>

          <ListItem>
            <TextField
                inputRef={register({required: true})}
                error={errors.name ? true : false}              
                select
                label="Location"
                name="locationId"
                placeholder="Select Location"
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
              {
                locationsQuery.locations.map(location => {
                  return <option key={location.id} value={location.id}>{location.name}</option>
                })
              }              
            </TextField>          
          </ListItem>

          <ListItem>
            <TextField
                inputRef={register({required: true})}
                error={errors.name ? true : false}              
                select
                label="Local Distributor"
                name="distributorId"
                placeholder="Select Local Distributor"
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
              {
                distributorsQuery.distributors.map(distributor => {
                  return <option key={distributor.id} value={distributor.id}>{distributor.name}</option>
                })
              }              
            </TextField>          
          </ListItem>

          <ListItem>
            <TextField
                inputRef={register({required: true})}
                error={errors.name ? true : false}             
                select
                label="Delivery Day"
                name="deliveryDay"
                placeholder="Select Delivery Day"
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
              <option key='1' value='Tuesday'>Tuesday</option>
              <option key='2' value='Friday'>Friday</option>
              <option key='3' value='Both'>Both Days</option>

            </TextField>          
          </ListItem>

          <ListItem>
            <TextField
                inputRef={register({required: true})}
                error={errors.name ? true : false}              
                select
                label="Count By"
                name="countById"
                placeholder="Select Count By"
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
              {
                countBiesQuery.countBies.map(countBy => {
                  return <option key={countBy.id} value={countBy.id}>{countBy.name}</option>
                })
              }
            </TextField>           
          </ListItem>

          <ListItem>
            <TextField
                inputRef={register({required: true})}
                error={errors.name ? true : false}              
                select
                label="Replenish By"
                name="replenishBy"
                placeholder="Select Replenish By"
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
              {
                countBiesQuery.countBies.map(countBy => {
                  return <option key={countBy.id} value={countBy.name}>{countBy.name}</option>
                })
              }              
            </TextField>          
          </ListItem>

          <ListItem>
            <TextField
                inputRef={register} 
                select
                label="Container Type"
                name="containerId"
                placeholder="Select Containter"
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
              {
                containersQuery.containers.map(container => {
                  return <option key={container.id} value={container.id}>{container.name}</option>
                })
              } 
            </TextField>          
          </ListItem>

          <ListItem> 
           <Button type='submit' variant="contained" color="primary">
                Save Store Good
           </Button>
          </ListItem>

          </List>
        </form>
      </Drawer> 
    </div>
  );
};

export default NewStoreGoodDrawer
