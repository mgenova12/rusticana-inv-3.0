import React, {useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useQuery } from '@apollo/client';
import { GET_GIFT_CARD_BY_ID } from './giftcard.query'
import BeatLoader from "react-spinners/BeatLoader"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useForm } from "react-hook-form";

const AddValue = ({...props}) => {
  const { register, handleSubmit } = useForm({mode: "onBlur"});

  const [paymentMethod, setPaymentMethod] = useState({
    credit: false,
    cash: false,
  });  

  const {data: getGiftCardByIdQuery, loading: getGiftCardByIdQueryLoading} = useQuery(GET_GIFT_CARD_BY_ID, {
    fetchPolicy: "network-only",
    variables: {
      giftCardId: parseInt(props.match.params.giftCardId)
    }
  })

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
    giftCardData.cardNumber = getGiftCardByIdQuery.getGiftCardById.cardNumber
    giftCardData.amount = getGiftCardByIdQuery.getGiftCardById.amount
    giftCardData.paymentMethod = activePaymentMethod

    if (giftCardData) {
      props.history.push({pathname:`/gift_cards/store/${props.match.params.storeId}/add_value_review`, data: giftCardData })
    }
  }

  if (getGiftCardByIdQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  
  const { cash, credit } = paymentMethod;

  let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });

  return (
    <div>
      <Container component="main" maxWidth="sm">
      <h1> Add Value </h1>
      <hr/>
      <h2>Amount: {USDollar.format(getGiftCardByIdQuery.getGiftCardById.amount)}</h2>
      <h2>Card Number: {getGiftCardByIdQuery.getGiftCardById.cardNumber}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
            label="Value Amount"
            name="valueAmount"
            placeholder="Value Amount"
            fullWidth
            margin="normal"
            type="number"
            variant="outlined"
            inputProps={{
              step: 'any',
            }}            
            inputRef={register({required: true})}
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
        <Button 
            type='submit' 
            variant="contained" 
            color="primary" 
            size="large" 
            className="button mr-2" 
          >
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
      </Container>
    </div>
  )
}

export default AddValue
