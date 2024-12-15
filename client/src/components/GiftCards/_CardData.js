import React from 'react';
import Button from '@material-ui/core/Button';

const CardData = ({...props}) => {
  const handlePurchaseRedirct = () => {
    props.history.push(`/gift_cards/store/${props.storeId}/gift_card/${props.cardData.id}/purchase`)
  }

  const handleAddValueRedirct = () => {
    props.history.push(`/gift_cards/store/${props.storeId}/gift_card/${props.cardData.id}/add_value`)
  }
  
  const { startOver } = props;

  let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });

  return (
    <div>
      <h2>Amount: {USDollar.format(props.cardData.amount)} </h2>
      <h2>Card Number: {props.cardData.cardNumber} </h2>

      <div className="d-inline-block">

      { props.cardData.amount > 0 &&
        <Button
            type='submit'
            variant="contained"
            color="primary"
            size="large"
            className="button mr-2"
            onClick={() => handlePurchaseRedirct()}>
            Make Purchase
        </Button>
      }
       <Button 
          type='submit' 
          variant="contained" 
          color="primary" 
          size="large" 
          className="button m-2" 
          onClick={() => handleAddValueRedirct()}>
          Add Value
       </Button>

       <Button 
          type='submit' 
          variant="contained" 
          color="secondary"
          size="large"
          className="button m-2"
          onClick={() => startOver()}
          >
          Start Over
       </Button>       
      </div>
    </div>
  )
}

export default CardData
