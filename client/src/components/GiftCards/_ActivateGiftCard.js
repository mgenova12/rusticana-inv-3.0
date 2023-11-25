import React, {useState } from 'react';
import { useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { CREATE_GIFTCARD } from './giftcard.mutation'
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import BeatLoader from "react-spinners/BeatLoader"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ActivateGiftCard = ({...props}) => {
  const { register, handleSubmit, reset } = useForm({mode: "onBlur"});
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState({
    credit: false,
    cash: false,
  });

  const [createGiftCard, {loading: createGiftCardLoading}] = useMutation(CREATE_GIFTCARD, {
    onCompleted(data) {
      setErrors(data.createGiftCard.errors)
      if (data.createGiftCard.errors.length === 0) {
        setSuccess(true)
      }
    }
  });

  const handleChange = (event) => {
    if (event.target.name === "cash") {
      setPaymentMethod({
        ...paymentMethod,
        cash: true,
        credit: false
      });
    } else {
      setPaymentMethod({
        ...paymentMethod,
        cash: false,
        credit: true
      });
    }
  };

  const onSubmit = data => {
    setSuccess(false)
    const activePaymentMethod = paymentMethod.cash ? 'cash' : 'credit'

    if (props.location.data) {
      createGiftCard({
        variables: {
          cardNumber: props.location.data.currentCardNumber,
          amount: parseFloat(data.amount),
          storeId: parseInt(props.match.params.storeId),
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          paymentMethod: activePaymentMethod
        }
      })
      reset()
    }
      else {
      setErrors(['ERROR'])
    }
  }
  if (createGiftCardLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  const { cash, credit } = paymentMethod;

  return (
    <div>
      {errors.length > 0 &&
        <div className="alert alert-danger" role="alert">
          {errors[0]}
        </div>   
      }
      { success &&
        <div className="alert alert-success" role="alert">
          Gift Card Activated!
        </div>         
      }
      <Container component="main" maxWidth="sm">
        <div>
          <h1> Activate Gift Card </h1>
          <h2>Card Number: {props.location.data?.currentCardNumber} </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="First Name"
              name="firstName"
              inputRef={register({required: true})}
              placeholder="First Name"
              fullWidth
              margin="normal"
              type="text"
              variant="outlined"
              inputProps={{
                step: 0.5,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Last Name"
              name="lastName"
              inputRef={register({required: true})}
              placeholder="Last Name"
              fullWidth
              margin="normal"
              type="text"
              variant="outlined"
              inputProps={{
                step: 0.5,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              inputRef={register({required: true})}
              placeholder="Phone Number"
              fullWidth
              margin="normal"
              type="tel"
              variant="outlined"
              inputProps={{
                step: 0.5,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />                        
            <TextField
              label="Enter Gift Card Amount"
              name="amount"
              inputRef={register({required: true})}
              placeholder="Starting Amount"
              fullWidth
              margin="normal"
              type="number"
              variant="outlined"
              inputProps={{
                step: 0.5,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={cash} 
                    onChange={handleChange} 
                    name="cash"
                  />
                }
                label="Cash"
              />

              <FormControlLabel
                control={
                  <Checkbox 
                    checked={credit} 
                    onChange={handleChange} 
                    name="credit"
                  />
                }
                label="Credit"
              />                         

             <Button type='submit' variant="contained" color="primary" size="large" >
                Activate Gift Card
             </Button>        
          </form>
        </div>
      </Container>
    </div>
  )
}

export default ActivateGiftCard
