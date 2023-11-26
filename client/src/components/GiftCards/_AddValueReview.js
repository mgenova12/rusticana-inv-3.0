import React, {useState } from 'react';
import {  useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { EDIT_GIFT_CARD_VALUE } from './giftcard.mutation'

const AddValueReview = ({...props}) => {
  const [success, setSuccess] = useState(false)
  const [buttonToggle, setbuttonToggle] = useState(false)

  const [editGiftCardValue] = useMutation(EDIT_GIFT_CARD_VALUE, {
    onCompleted(data) {
      setSuccess(true)
    }
  });

  const onSubmit = () => {
    const data = props.location.data
    console.log(data)
    if (data) {
      editGiftCardValue({
        variables: {
          cardNumber: data.cardNumber,
          value: parseFloat(data.valueAmount),
          action: 'add',
          storeId: parseInt(props.match.params.storeId),
          paymentMethod: data.paymentMethod,
          ticketNumber: null
        }
      })
      setbuttonToggle(true)
    }
  }

  const cardInfo = props.location?.data;

  return (
    <div>
      { success &&
        <div className="alert alert-success" role="alert">
          Value has been added!
        </div>         
      }    
      <Container component="main" maxWidth="sm">
      <h1> Please Review Adding Value </h1>
      <hr/>
      <h3>Card Number: {cardInfo?.cardNumber}</h3>
      <h3>Payment Method: {cardInfo?.paymentMethod}</h3>
      <h3>Current Card Amount: ${cardInfo?.amount}</h3>
      <h3>Payment Amount: ${cardInfo?.valueAmount}</h3>
      <h3>New Card Amount: ${(parseFloat(cardInfo?.amount) + parseFloat(cardInfo?.valueAmount)).toFixed(2)}</h3>

      { (!buttonToggle) ?
        <Button
            type='submit'
            variant="contained" 
            color="primary" 
            size="large"
            className="button mr-2"
            onClick={() => onSubmit()}
          >
            Add Value
        </Button>
      :
       <Button 
          type='submit' 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => props.history.push(`/store/${props.match.params.storeId}/swipe_gift_cards`)} 
        >
          Back Home
       </Button> 
      }
      </Container>
    </div>
  )
}

export default AddValueReview
