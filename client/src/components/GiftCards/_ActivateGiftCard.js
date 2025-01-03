import React, {useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ActivateGiftCard = ({...props}) => {
  const { register, handleSubmit } = useForm({mode: "onBlur"});
  const [errors, setErrors] = useState([])

  const [paymentMethod, setPaymentMethod] = useState({
    credit: false,
    cash: false,
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
    const giftCardData = data
    const activePaymentMethod = paymentMethod.cash ? 'cash' : 'credit'
    giftCardData.paymentMethod = activePaymentMethod
    giftCardData.cardNumber = props.location.data?.currentCardNumber.slice(0, 16)

    if (giftCardData.cardNumber) {
      props.history.push({pathname:`/gift_cards/store/${props.match.params.storeId}/review_gift_card`, data: giftCardData })
    } else {
      setErrors(['ERROR'])
    }
  }

  const { cash, credit } = paymentMethod;

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
      {errors.length > 0 &&
        <div className="alert alert-danger" role="alert">
          {errors[0]}
        </div>   
      }
      <Container component="main" maxWidth="sm">
        <div>
          <h1> Activate Gift Card </h1>
          <hr/>
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
              label="Enter Gift Card Amount"
              name="amount"
              inputRef={register({required: true})}
              placeholder="Starting Amount"
              fullWidth
              margin="normal"
              type="number"
              variant="outlined"
              inputProps={{
                step: 'any',
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
                Next
             </Button>
             <Button 
                type='submit' 
                variant="contained"
                color="secondary" 
                size="large" 
                className="button m-2" 
                onClick={() => props.history.push(`/gift_cards/store/${props.match.params.storeId}/swipe`)}
                >
                Start Over
             </Button>      
          </form>
        </div>
      </Container>
    </div>
  )
}

export default ActivateGiftCard
