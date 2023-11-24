import React, {useState } from 'react';
import {  useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useQuery } from '@apollo/client';
import { EDIT_GIFT_CARD_VALUE } from './giftcard.mutation'
import { GET_GIFT_CARD_BY_ID } from './giftcard.query'
import BeatLoader from "react-spinners/BeatLoader"

const GiftCardPurchase = ({...props}) => {
  const [value, setValue] = useState(0)

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

  const handleAddValue = (action, value) => {
    editGiftCardValue({
      variables: {
        cardNumber: getGiftCardByIdQuery.getGiftCardById.cardNumber.slice(0, 16),
        value: parseFloat(value),
        action: action,
        storeId: parseInt(props.match.params.storeId)
      }
    })
  }

  if (getGiftCardByIdQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <div>
      <Container component="main" maxWidth="sm">
      <h2>Amount: ${getGiftCardByIdQuery.getGiftCardById.amount}</h2>
      <h2>Card Number: {getGiftCardByIdQuery.getGiftCardById.cardNumber}</h2>

      <TextField
          label="Purchase Amount"
          name="cardNumber"
          onChange={e => setValue(e.target.value)}
          placeholder="Purchase Amount"
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
          onClick={() => handleAddValue('subtract', value)}
        >
          Make Purchase
      </Button>
      </Container>
    </div>
  )
}

export default GiftCardPurchase
