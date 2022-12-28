import React, {useState } from 'react';
import { useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { CREATE_GIFTCARD } from './giftcard.mutation'
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import BeatLoader from "react-spinners/BeatLoader"

const GiftCards = ({...props}) => {
  const { register, handleSubmit, reset } = useForm({mode: "onBlur"});
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState(false)

  const [createGiftCard, {loading: createGiftCardLoading}] = useMutation(CREATE_GIFTCARD, {
    onCompleted(data) {
      setErrors(data.createGiftCard.errors)
      if (data.createGiftCard.errors.length === 0) {
        setSuccess(true)
      }
    }
  });

  const onSubmit = data => {
    setSuccess(false)
    createGiftCard({
      variables: {
        cardNumber: data.cardNumber.slice(0, 16),
        amount: parseFloat(data.amount)
      }
    })
    reset()
  }

  if (createGiftCardLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <div>
    {errors.length > 0 &&
      <div className="alert alert-danger" role="alert">
        {errors[0]}
      </div>   
    }
    { success &&
      <div className="alert alert-success" role="alert">
        Gift Card Activated!
      </div>         
    }
    <Container component="main" maxWidth="sm">
    <div>
      <h1> Activate Gift Card </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Swipe the card or enter the card number"
          name="cardNumber"
          inputRef={register({required: true})}
          placeholder="Swipe the card or enter the card number"
          inputProps={{ maxLength: 16 }}
          fullWidth
          margin="normal"
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
    </div>
  )
}

export default GiftCards
