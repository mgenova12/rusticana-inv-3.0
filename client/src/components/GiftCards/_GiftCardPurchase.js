import React, {useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useQuery } from '@apollo/client';
import { GET_GIFT_CARD_BY_ID } from './giftcard.query'
import BeatLoader from "react-spinners/BeatLoader"
import { useForm } from "react-hook-form";

const GiftCardPurchase = ({...props}) => {
  const { register, handleSubmit } = useForm({mode: "onBlur"});
  const [errors, setErrors] = useState([])

  const {data: getGiftCardByIdQuery, loading: getGiftCardByIdQueryLoading} = useQuery(GET_GIFT_CARD_BY_ID, {
    fetchPolicy: "network-only",
    variables: {
      giftCardId: parseInt(props.match.params.giftCardId)
    }
  })

  const onSubmit = data => {
    const giftCardData = data
    giftCardData.cardNumber = getGiftCardByIdQuery.getGiftCardById.cardNumber
    giftCardData.amount = getGiftCardByIdQuery.getGiftCardById.amount

    if (giftCardData && (data.purchaseAmount <= getGiftCardByIdQuery.getGiftCardById.amount)) {
      props.history.push({pathname:`/gift_cards/store/${props.match.params.storeId}/purchase_review`, data: giftCardData })
    } else {
      setErrors(['Cannot make purchase higher then card amount'])
    }
  }

  if (getGiftCardByIdQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });

  return (
    <div>
      {errors.length > 0 &&
        <div className="alert alert-danger" role="alert">
          {errors[0]}
        </div>
      }
      <Container component="main" maxWidth="sm">
      <h1> Make Purchase </h1>
      <hr/>
      <h2>Amount on Card: {USDollar.format(getGiftCardByIdQuery.getGiftCardById.amount)}</h2>
      <h2>Card Number: {getGiftCardByIdQuery.getGiftCardById.cardNumber}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
            label="Purchase Amount"
            name="purchaseAmount"
            placeholder="Purchase Amount"
            fullWidth
            inputRef={register({required: true})}
            margin="normal"
            type="number"
            inputProps={{
              step: 'any',
            }}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

        <TextField
            label="Ticket Number"
            name="ticketNumber"
            inputRef={register({required: false})}
            placeholder="Ticket Number"
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

export default GiftCardPurchase
