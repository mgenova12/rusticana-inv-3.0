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
      props.history.push({pathname:`/store/${props.match.params.storeId}/review_gift_card`, data: giftCardData })
    } else {
      setErrors(['ERROR'])
    }
  }

  const { cash, credit } = paymentMethod;

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
          </form>
        </div>
      </Container>
    </div>
  )
}

export default ActivateGiftCard
