import React, {useState } from 'react';
import {  useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { EDIT_GIFT_CARD_VALUE } from './giftcard.mutation'

const AddValue = ({ cardData, storeId, success }) => {
  const [value, setValue] = useState(0)
  const [cardAmount, setcardAmount] = useState(cardData.amount)
  
  const [editGiftCardValue] = useMutation(EDIT_GIFT_CARD_VALUE, {
    onCompleted(data) {
      setcardAmount(data.editGiftCardValue.giftCard.amount)
    }
  });

  const handleAddValue = (action, value) => {
    editGiftCardValue({
      variables: {
        cardNumber: cardData.cardNumber.slice(0, 16),
        value: parseFloat(value),
        action: action,
        storeId: storeId
      }
    })
  } 

  return (
    <div>
      <h2>Amount: ${cardAmount} </h2>
      <h2>Card Number: {cardData.cardNumber} </h2>

      <div className="d-inline-block">
        <TextField
          label="Value"
          name="cardNumber"
          onChange={e => setValue(e.target.value)}
          placeholder="Value"
          fullWidth
          margin="normal"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />

      <Button 
          type='submit' 
          variant="contained" 
          color="primary" 
          size="large" 
          className="button mr-2" 
          onClick={() => handleAddValue('subtract', value)}>
          Make Purchase
      </Button>

       <Button 
          type='submit' 
          variant="contained" 
          color="primary" 
          size="large" 
          className="button m-2" 
          onClick={() => handleAddValue('add', value)}>
          Add Value
       </Button>

      </div>
    </div>
  )
}

export default AddValue
