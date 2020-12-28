import React from "react";
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import { useMutation } from '@apollo/client';
import { CREATE_LOCATION } from './store.mutation'

const NewLocationDrawer = ({ visible, onClose, locationsRefetch, storeId }) => {
  const { register, handleSubmit, errors, reset } = useForm({mode: "onBlur"});

  const [createLocation] = useMutation(CREATE_LOCATION);
  
  const onSubmit = data => {
    createLocation({ 
      variables: { 
        name: data.name,
        storeId: parseInt(storeId),
      }
    }).then(() => locationsRefetch());
		reset()
		onClose()
  }

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
        <h3 className="mr-2 ml-2" align="center">Add New Location</h3>
        <List >
        
        <ListItem>
          <TextField
              label="Location Name"
              name="name"
              inputRef={register({required: true})}
              error={errors.name ? true : false}
              placeholder="Add Location Name"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            /> 
          </ListItem>

          <ListItem> 
           <Button type='submit' variant="contained" color="primary">
                Save Location
           </Button>
          </ListItem>

          </List>
        </form>
      </Drawer> 
    </div>
  );
};

export default NewLocationDrawer
