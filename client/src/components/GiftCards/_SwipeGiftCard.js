import React, {useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { GET_GIFT_CARD } from './giftcard.query'
import BeatLoader from "react-spinners/BeatLoader"

import AddValue from './_AddValue.js'

const SwipeGiftCard = ({...props}) => {
  const { register, handleSubmit } = useForm({mode: "onBlur"});
  const [searchTerm, setSearchTerm] = useState('')
  const [success, setSuccess] = useState(false)

  const [cardData, setCardData] = useState(null)
  
  const [getGiftCard, {loading: getGiftCardLoading}] = useLazyQuery(GET_GIFT_CARD, {
    variables: {
      cardNumber: searchTerm.slice(0, 16)
    },
    onCompleted(data) {
      setCardData(data.getGiftCard)
    }
  })

  const onSubmit = data => {
    getGiftCard()
  }

  if (getGiftCardLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  
  return (
    <div>
      <Container component="main" maxWidth="sm">
        <div>
          <h1> Swipe Gift Card </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Swipe the card or enter the card number"
              name="cardNumber"
              inputRef={register({required: true})}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Swipe the card or enter the card number"
              fullWidth
              margin="normal"
              variant="outlined"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
             <Button type='submit' variant="contained" color="primary" size="large" >
                Search Gift Card
             </Button>        
          </form>

          {cardData &&
            <AddValue
              cardData={cardData}
              storeId={parseInt(props.match.params.storeId)}
            />
          }

        </div>
      </Container>
    </div>
  )
}

export default SwipeGiftCard
