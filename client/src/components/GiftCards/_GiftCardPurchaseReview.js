import React, {useState } from 'react';
import {  useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { EDIT_GIFT_CARD_VALUE } from './giftcard.mutation'

const GiftCardPurchaseReview = ({...props}) => {
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
          value: parseFloat(data.purchaseAmount),
          action: 'subtract',
          storeId: parseInt(props.match.params.storeId),
          paymentMethod: null,
          ticketNumber: data.ticketNumber
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
          Purchase has been made!
        </div>         
      }    
      <Container component="main" maxWidth="sm">
      <h1> Please Review Purchase </h1>
      <hr/>
      <h3>Card Number: {cardInfo?.cardNumber}</h3>
      <h3>Ticket Number: {cardInfo?.ticketNumber}</h3>
      <h3>Current Card Amount: ${cardInfo?.amount}</h3>
      <h3>Payment Amount: ${cardInfo?.purchaseAmount}</h3>
      <h3>New Card Amount: ${(parseFloat(cardInfo?.amount) - parseFloat(cardInfo?.purchaseAmount)).toFixed(2)}</h3>

      { (!buttonToggle) ?
        <div className="d-inline-block">
          <Button
              type='submit'
              variant="contained"
              color="primary"
              size="large"
              className="button mr-2"
              onClick={() => onSubmit()}
            >
              Make Purchase
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
        </div>
      :
       <Button 
          type='submit' 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => props.history.push(`/gift_cards/store/${props.match.params.storeId}/swipe`)} 
        >
          Back Home
       </Button>
      }
      </Container>
    </div>
  )
}

export default GiftCardPurchaseReview
