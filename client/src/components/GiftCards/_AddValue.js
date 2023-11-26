import React, {useState } from 'react';
import {  useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useQuery } from '@apollo/client';
import { EDIT_GIFT_CARD_VALUE } from './giftcard.mutation'
import { GET_GIFT_CARD_BY_ID } from './giftcard.query'
import BeatLoader from "react-spinners/BeatLoader"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const AddValue = ({...props}) => {
  const [value, setValue] = useState(0)
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

  const [editGiftCardValue] = useMutation(EDIT_GIFT_CARD_VALUE, {
    onCompleted(data) {
      // setcardAmount(data.editGiftCardValue.giftCard.amount)
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

  const handleAddValue = (action, value) => {
    const activePaymentMethod = paymentMethod.cash ? 'cash' : 'credit'

    editGiftCardValue({
      variables: {
        cardNumber: getGiftCardByIdQuery.getGiftCardById.cardNumber.slice(0, 16),
        value: parseFloat(value),
        action: action,
        storeId: parseInt(props.match.params.storeId),
        paymentMethod: activePaymentMethod
      }
    })
  }

  if (getGiftCardByIdQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  const { cash, credit } = paymentMethod;

  return (
    <div>
      <Container component="main" maxWidth="sm">
      <h1> Add Value </h1>
      <hr/>
      <h2>Amount: ${getGiftCardByIdQuery.getGiftCardById.amount}</h2>
      <h2>Card Number: {getGiftCardByIdQuery.getGiftCardById.cardNumber}</h2>

      <TextField
          label="Value Amount"
          name="cardNumber"
          onChange={e => setValue(e.target.value)}
          placeholder="Value Amount"
          fullWidth
          margin="normal"
          type="number"
          variant="outlined"
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
          onClick={() => handleAddValue('add', value)}
        >
          Add Value
      </Button>
      </Container>
    </div>
  )
}

export default AddValue
