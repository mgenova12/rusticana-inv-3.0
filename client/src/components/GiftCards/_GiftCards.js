import React from 'react';
import { useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { CREATE_GIFTCARD } from './giftcard.mutation'
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';

const GiftCards = ({...props}) => {
  const { register, handleSubmit, reset } = useForm({mode: "onBlur"});

  const [createGiftCard, {loading: createGiftCardLoading}] = useMutation(CREATE_GIFTCARD, {
    onCompleted(data) {
      console.log(data)
    }
  });

  const onSubmit = data => {
    createGiftCard({
      variables: {
        cardNumber: data.cardNumber.slice(0, 16),
        amount: parseFloat(data.amount)
      }
    })
    reset()
  } 

  return (
    <Container component="main" maxWidth="sm">
    <div>
      <h1> Activate Gift Card </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Swipe the card or enter the card number"
          name="cardNumber"
          inputRef={register({required: true})}
          placeholder="Swipe the card or enter the card number"
          fullWidth
          margin="normal"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Enter Gift Card Amount"
          name="amount"
          inputRef={register({required: true})}
          placeholder="Enter Gift Card Amount"
          fullWidth
          margin="normal"
          type="number"
          variant="outlined"
          inputProps={{
            step: 0.5,
          }}          
          InputLabelProps={{
            shrink: true,
          }}
        />
         <Button type='submit' variant="contained" color="primary" size="large" >
            Activate Gift Card
         </Button>        
      </form>
    </div>
    </Container>
  )
}

export default GiftCards
