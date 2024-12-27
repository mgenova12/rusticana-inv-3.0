import React, { useCallback, useState } from "react";
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { useForm } from "react-hook-form";
import { useMutation } from '@apollo/client';
import { CREATE_CUSTOMER } from './customers.mutation'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NewProductDrawer = ({ visible, onClose, customersRetch }) => {
  const [createCustomer] = useMutation(CREATE_CUSTOMER);

  const { register, handleSubmit, errors, reset } = useForm({mode: "onBlur"});

  const [isOpen, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const onSubmit = data => {
    createCustomer({ 
      variables: { 
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
      }
    });
    handleOpen()
    customersRetch()
		reset()
		onClose()
  }

  const [phoneNumber, setPhoneNumber] = useState('');

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, '');

    // Format as (XXX) XXX-XXXX
    if (numericValue.length <= 3) {
      return `(${numericValue}`;
    } else if (numericValue.length <= 6) {
      return `(${numericValue.slice(0, 3)}) ${numericValue.slice(3)}`;
    } else {
      return `(${numericValue.slice(0, 3)}) ${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedNumber);
  };

  return (
    <div>
      <Snackbar
        open={isOpen}
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert onClose={handleClose} severity="success">
          Customer has been saved!
        </Alert>
      </Snackbar>

			<Drawer
        open={visible}
        variant="temporary"
        keepMounted={true}
        anchor="right"
        onClose={onClose}
      >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 align="center">Add New Customer</h3>
        <List >

        <ListItem>
          <TextField
              label="First Name"
              name="firstName"
              inputRef={register({required: true})}
              error={errors.name ? true : false}
              placeholder="Add First Name"
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
              label="Last Name"
              name="lastName"
              inputRef={register({required: true})}
              error={errors.name ? true : false}
              placeholder="Add Last Name"
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
              label="Phone Number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneChange}
              inputRef={register({required: true})}
              type="tel"
              error={errors.name ? true : false}
              placeholder="Add Phone Number"
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
              label="Email"
              name="email"
              inputRef={register({required: true})}
              error={errors.name ? true : false}
              placeholder="Add Email"
              type="email"
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
                Save Customer
           </Button>
          </ListItem>

          </List>
        </form>
      </Drawer> 
    </div>
  );
};

export default NewProductDrawer
