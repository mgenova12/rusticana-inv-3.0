import React, { useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/client';
import { CREATE_CUSTOMER } from '../Customers/customers.mutation';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CouponEntry = ({...props}) => {
  const { register, handleSubmit, errors, reset } = useForm({mode: "onBlur"});
  const [mutationErrors, setMutationErrors] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleErrorOpen = useCallback(() => setErrorOpen(true), []);
  const handleErrorClose = useCallback(() => setErrorOpen(false), []);

  const [createCustomer] = useMutation(CREATE_CUSTOMER, {
    onCompleted(data) {
      if (data.createCustomer.errors && data.createCustomer.errors.length > 0) {
        setMutationErrors(data.createCustomer.errors);
        handleErrorOpen();
      } else {
        handleOpen();
        reset();
        setPhoneNumber('');
        setMutationErrors([]);
      }
    },
    onError(error) {
      setMutationErrors([error.message]);
      handleErrorOpen();
    }
  });

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

  const onSubmit = data => {
    createCustomer({ 
      variables: { 
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: phoneNumber,
        email: data.email,
        couponCode: data.couponCode || null,
      }
    });
  }

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
          Your code has been activated!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000} 
        onClose={handleErrorClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert onClose={handleErrorClose} severity="error">
          {mutationErrors.length > 0 ? mutationErrors[0] : 'An error occurred'}
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="sm">
        <div>
          <h1>Coupon Entry</h1>
          <hr/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="First Name"
              name="firstName"
              inputRef={register({required: true})}
              error={errors.firstName ? true : false}
              placeholder="First Name"
              fullWidth
              margin="normal"
              type="text"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Last Name"
              name="lastName"
              inputRef={register({required: true})}
              error={errors.lastName ? true : false}
              placeholder="Last Name"
              fullWidth
              margin="normal"
              type="text"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneChange}
              inputRef={register({required: true})}
              error={errors.phoneNumber ? true : false}
              placeholder="Phone Number"
              fullWidth
              margin="normal"
              type="tel"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Email"
              name="email"
              inputRef={register({required: true})}
              error={errors.email ? true : false}
              placeholder="Email"
              fullWidth
              margin="normal"
              type="email"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Coupon Code"
              name="couponCode"
              inputRef={register({
                required: "Coupon code is required",
                validate: value => value.trim() !== "" || "Coupon code cannot be empty"
              })}
              error={errors.couponCode ? true : false}
              helperText={errors.couponCode?.message}
              placeholder="Coupon Code"
              fullWidth
              margin="normal"
              type="text"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button type='submit' variant="contained" color="primary" size="large" fullWidth>
              Submit
            </Button>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default CouponEntry

